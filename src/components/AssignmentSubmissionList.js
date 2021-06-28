import { List, Typography } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import send from "../api/api";
import { getAccessToken, isAuthorized } from '../userIdentity';
import AssignmentSubmission from "./AssignmentSubmission";

const AssignmentSubmissionList = ({loggedInUser, assignmentId}) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [assignmentSubmissions, setAssignmentSubmissions] = useState([]);
    const [error, setError] = useState(null);
    const [isMounted, setIsMounted] = useState(false);
    let history = useHistory();
    
    useEffect(() => {
        setIsMounted(true);
        if (!loggedInUser || !isAuthorized('READ_SUBMISSIONS')) {
            history.push('/sign-in');
        }

        getAssignmentSubmissions(isMounted, setIsLoaded, assignmentId, setAssignmentSubmissions, setError);
        return () => { setIsMounted(false); }
    }, [isMounted, history, loggedInUser]);

    if (!isLoaded) {
        return <div>Loading...</div>
    }
    if (error) {
        return <div>{ error }</div>
    }
    return (
        <div>
        <Typography variant="h4" component="h2">
        Submissions
        </Typography>
        <List>{submissions.map(s => <AssignmentSubmission key={s.id} submission={s} />)}</List>
        </div>
    )
}

function getAssignmentSubmissions(isMounted, setIsLoaded, assignmentId, setAssignmentSubmissions, setError) {
    send({
        url: `http://localhost:8080/api/submissions/${assignmentId}`,
        method: 'GET',
        headers: new Headers({
            'Authorization': `Bearer ${getAccessToken()}`
        }),
        data: null,
        expectedStatusCode: 200
    }, (result) => {
        if (isMounted) {
            setAssignmentSubmissions(result);
            setIsLoaded(true);
        }
    }, (error) => {
        if (isMounted) {
            setError(error);
            setIsLoaded(true);
        }
    })
}

export default AssignmentSubmissionList;