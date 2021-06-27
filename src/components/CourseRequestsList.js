import { Button, List, Typography } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import send from "../api/api";
import { getAccessToken } from '../userIdentity';
import CourseRequest from "./CourseRequest";
import AddIcon from '@material-ui/icons/Add';
import CreateCourseRequestDialog from "./CreateCourseRequestDialog";

const CourseRequestsList = ({loggedInUser}) => {
    const [isLoaded, setIsLoaded] = useState(false)
    const [requests, setRequests] = useState([])
    const [error, setError] = useState(null)
    const [isMounted, setIsMounted] = useState(false)
    const [createOpen, setCreateOpen] = useState(false)
    let history = useHistory()

    const [courses, setCourses] = useState([])

    useEffect(() => {
        setIsMounted(true)
        if (!loggedInUser || (loggedInUser.permissions && loggedInUser.permissions.includes('READ_COURSESREQUESTS'))) {
            history.push('/sign-in')
        }

        getCourseRequests(isMounted, setIsLoaded, setRequests, setError)
        return () => { setIsMounted(false) }
    }, [isMounted, history, loggedInUser])

    const handleOpenCreateDialog = () => {
        getCourses(isMounted, setCourses, setCreateOpen)
    }
    const handleCreateRequest = (request, handleCloseDialog) => {
        createRequest(isMounted, requests, setRequests, request, handleCloseDialog)
    }

    const handleDeleteRequest = (id) => {
        deleteCourseRequest(isMounted, requests, setRequests, id)
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
            <Button
                sx={{ pt: 3 }}
                variant="contained"
                color="primary"
                startIcon={<AddIcon />}
                onClick={handleOpenCreateDialog}
            >
                Create
            </Button>
            <List>{requests.map(r => <CourseRequest key={r.id} request={r} deleteRequest={handleDeleteRequest}/>)}</List>
            <CreateCourseRequestDialog open={createOpen} setOpen={setCreateOpen} courses={courses} createRequest={handleCreateRequest}/>
        </div>
    )
}


function getCourses(isMounted, setCourses, setCreateOpen) {
    send({
        url: 'http://localhost:8080/api/courses',
        method: 'GET',
        headers: new Headers({
            'Authorization': `Bearer ${getAccessToken()}`
        }),
        data: null,
        expectedStatusCode: 200
    }, (result) => {
        if (isMounted) {
            setCourses(result)
            setCreateOpen(true)
        }
    }, (error) => {
        if (isMounted) {
            alert(error)
        }
    })
}

function createRequest(isMounted, requests, setRequests, request, handleCloseDialog) {
    send({
        url: `http://localhost:8080/api/coursesRequests`,
        method: 'POST',
        headers: new Headers({
            'Authorization': `Bearer ${getAccessToken()}`,
            'Content-Type': 'application/json'
        }),
        data: request,
        expectedStatusCode: 200
    }, (result) => {
        if (isMounted) {
            const newRequests = [...requests]
            newRequests.push(result)
            setRequests(newRequests)
            handleCloseDialog()
        }
    }, (error) => {
        alert(error)
    })
}

function getCourseRequests(isMounted, setIsLoaded, setRequests, setError) {
    send({
        url: 'http://localhost:8080/api/coursesRequests',
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

function deleteCourseRequest(isMounted, requests, setRequests, id) {
    send({
        url: `http://localhost:8080/api/coursesRequests/${id}`,
        method: 'DELETE',
        headers: new Headers({
            'Authorization': `Bearer ${getAccessToken()}`
        }),
        data: null,
        expectedStatusCode: 204
    }, (result) => {
        if (isMounted) {
            const newRequests = [...requests]
            setRequests(newRequests.filter(r => r.id !== id))
        }
    }, (error) => {
        alert(error)
    })
}

export default CourseRequestsList