import { List, Typography } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import send from "../api/api";
import { getAccessToken, isAuthorized } from '../userIdentity';
import AssignmentSubmission from "./AssignmentSubmission";

const AssignmentSubmissionList = ({loggedInUser}) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [assignmentSubmissions, setAssignmentSubmissions] = useState([]);
    const [error, setError] = useState(null);
    const [isMounted, setIsMounted] = useState(false);
    let history = useHistory();
    let location = useLocation()
    const course = location.state.course
    const assignment = location.state.assignment
    
    useEffect(() => {
        setIsMounted(true);
        if (!loggedInUser || !isAuthorized('READ_SUBMISSIONS')) {
            history.push('/sign-in');
        }

        getAssignmentSubmissions(isMounted, setIsLoaded, assignment.id, setAssignmentSubmissions, setError);
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
        <Typography variant="h4" component="h2">{course.name}</Typography>
        <Typography variant="h5" component="h2">{course.description}</Typography>
        <Typography variant="h4" component="h2">{assignment.name}</Typography>
        <Typography variant="h5" component="h2">{assignment.description}</Typography>
        <Typography variant="h4" component="h2">Submissions</Typography>
        <List>{assignmentSubmissions.map(s => <AssignmentSubmission key={s.id} assignmentSubmission={s} />)}</List>
        </div>
    )
}

function getAssignmentSubmissions(isMounted, setIsLoaded, assignmentId, setAssignmentSubmissions, setError) {
    send({
        url: `http://localhost:8080/api/submissions?assignmentId=${encodeURIComponent(assignmentId)}`,
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