import { List } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import send from "../api/api";
import { getAccessToken, isAuthorized } from '../userIdentity';
import Submission from "./Submission";

const SubmissionList = ({loggedInUser}) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [submissions, setSubmissions] = useState([]);
    const [error, setError] = useState(null);
    const [isMounted, setIsMounted] = useState(false);
    let history = useHistory();
    
    useEffect(() => {
        setIsMounted(true);
        if (!loggedInUser || !isAuthorized('READ_ALL_SUBMISSIONS')) {
            history.push('/sign-in');
        }

        getSubmissions(isMounted, setIsLoaded, setSubmissions, setError)
        return () => { setIsMounted(false); }
    }, [isMounted, history, loggedInUser]);

    const handleDeleteSubmission = (id) => {
        deleteSubmission(isMounted, submissions, setSubmissions, id);
    }

    if (!isLoaded) {
        return <div>Loading...</div>
    }
    if (error) {
        return <div>{ error }</div>
    }
    return (
        <List>{submissions.map(s => <Submission key={s.id} submission={s} deleteSubmission={handleDeleteSubmission}/>)}</List>
    )
}

function getSubmissions(isMounted, setIsLoaded, setSubmissions, setError) {
    send({
        url: 'http://localhost:8080/api/submissions/all',
        method: 'GET',
        headers: new Headers({
            'Authorization': `Bearer ${getAccessToken()}`
        }),
        data: null,
        expectedStatusCode: 200
    }, (result) => {
        if (isMounted) {
            setSubmissions(result);
            setIsLoaded(true);
        }
    }, (error) => {
        if (isMounted) {
            setError(error);
            setIsLoaded(true);
        }
    })
}

function deleteSubmission(isMounted, submissions, setSubmissions, id) {
    send({
        url: `http://localhost:8080/api/submissions/${id}`,
        method: 'DELETE',
        headers: new Headers({
            'Authorization': `Bearer ${getAccessToken()}`
        }),
        data: null,
        expectedStatusCode: 204
    }, (result) => {
        if (isMounted) {
            const newSubmissions = [...submissions];
            setSubmissions(newSubmissions.filter(s => s.id !== id));
        }
    }, (error) => {
        alert(error);
    })
}

export default SubmissionList;