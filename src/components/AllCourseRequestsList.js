import { List, Typography } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import send from "../api/api";
import { getAccessToken, isAuthorized } from '../userIdentity';
import ApproveCourseRequest from "./ApproveCourseRequest";

const AllCourseRequestsList = ({loggedInUser}) => {
    const [isLoaded, setIsLoaded] = useState(false)
    const [requests, setRequests] = useState([])
    const [error, setError] = useState(null)
    const [isMounted, setIsMounted] = useState(false)
    let history = useHistory()

    useEffect(() => {
        setIsMounted(true)
        if (!loggedInUser || !isAuthorized('READ_COURSESREQUESTS')) {
            history.push('/sign-in')
        }

        getCourseRequests(isMounted, setIsLoaded, setRequests, setError)
        return () => { setIsMounted(false) }
    }, [isMounted, history, loggedInUser])

    const handleEditRequest = (id, request) => {
        editCourseRequest(isMounted, requests, setRequests, id, request)
    }

    if (!isLoaded) {
        return <div>Loading...</div>
    }
    if (error) {
        return <div>{ error }</div>
    }
    return (
        <div>
            <Typography variant="h4">
                Requests to join a course
            </Typography>
            <List>{requests.map(r => <ApproveCourseRequest key={r.id} request={r} editRequest={handleEditRequest}/>)}</List>
        </div>
    )
}

function editCourseRequest(isMounted, requests, setRequests, id, request) {
    send({
        url: `http://localhost:8080/api/coursesRequests/${id}`,
        method: 'PATCH',
        headers: new Headers({
            'Authorization': `Bearer ${getAccessToken()}`,
            'Content-Type': 'application/json'
        }),
        data: request,
        expectedStatusCode: 200
    }, (result) => {
        if (isMounted) {
            const newRequests = [...requests]
            setRequests(newRequests.map(r => r.id === id ? result : r))
        }
    }, (error) => {
        alert(error)
    })
}

function getCourseRequests(isMounted, setIsLoaded, setRequests, setError) {
    send({
        url: 'http://localhost:8080/api/coursesRequests/all',
        method: 'GET',
        headers: new Headers({
            'Authorization': `Bearer ${getAccessToken()}`
        }),
        data: null,
        expectedStatusCode: 200
    }, (result) => {
        if (isMounted) {
            setRequests(result)
            setIsLoaded(true)
        }
    }, (error) => {
        if (isMounted) {
            setError(error)
            setIsLoaded(true)
        }
    })
}

export default AllCourseRequestsList