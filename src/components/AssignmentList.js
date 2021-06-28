import { List, Typography } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useHistory, useLocation, useParams } from "react-router-dom";
import send from "../api/api";
import { getAccessToken, isAuthorized } from '../userIdentity';
import Assignment from "./Assignment";

export default function AssignmentList({ loggedInUser }) {
    const [isLoaded, setIsLoaded] = useState(false);
    const [assignments, setAssignments] = useState([]);
    const [error, setError] = useState(null);
    const [isMounted, setIsMounted] = useState(false);
    let location = useLocation()
    let history = useHistory()
    const {courseId} = useParams();

    useEffect(() => {
        setIsMounted(true);
        if (!loggedInUser || !isAuthorized('READ_ASSIGNMENTS')) {
            history.push('/sign-in');
        }

        getAssignments(isMounted, setIsLoaded, courseId, setAssignments, setError);
        return () => { setIsMounted(false); }
    }, [isMounted, history, loggedInUser, courseId]);

    const handleEditAssignment = (id, assignment, handleCloseDialog) => {
        editAssignment(isMounted, assignments, setAssignments, id, assignment, handleCloseDialog);
    }

    const handleDeleteAssignment = (id) => {
        deleteAssignment(isMounted, assignments, setAssignments, id);
    }

    if (!isLoaded) {
        return <div>Loading...</div>
    }
    if (error) {
        return <div>{ error }</div>
    }
    return (
        <div>
            <Typography variant="h4" component="h2">{location.state.course.name}</Typography>
            <Typography variant="h5" component="h2">{location.state.course.description}</Typography>
            <Typography>
                Assignments
            </Typography>
            <List>{assignments.map(a => <Assignment key={a.id} assignment={a} 
                editAssignment={handleEditAssignment} deleteAssignment={handleDeleteAssignment}/>)}</List>
        </div>
    )
}

function getAssignments(isMounted, setIsLoaded, courseId, setAssignments, setError) {
    send({
        url: 'http://localhost:8080/api/assignments',
        method: 'GET',
        headers: new Headers({
            'Authorization': `Bearer ${getAccessToken()}`
        }),
        data: null,
        expectedStatusCode: 200
    }, (result) => {
        if (isMounted) {
            const courseAssignments = result.filter(a => a.courseId === courseId);
            setAssignments(courseAssignments);
            setIsLoaded(true);
        }
    }, (error) => {
        if (isMounted) {
            setError(error);
            setIsLoaded(true);
        }
    })
}

function editAssignment(isMounted, assignments, setAssignments, id, assignment, handleCloseDialog) {
    send({
        url: `http://localhost:8080/api/assignments/${id}`,
        method: 'PATCH',
        headers: new Headers({
            'Authorization': `Bearer ${getAccessToken()}`,
            'Content-Type': 'application/json'
        }),
        data: assignment,
        expectedStatusCode: 200
    }, (result) => {
        if (isMounted) {
            const newAssignments = [...assignments];
            setAssignments(newAssignments.map(a => a.id === id ? result : a));
            handleCloseDialog();
        }
    }, (error) => {
        alert(error);
    })
}

function deleteAssignment(isMounted, assignments, setAssignments, id) {
    send({
        url: `http://localhost:8080/api/assignments/${id}`,
        method: 'DELETE',
        headers: new Headers({
            'Authorization': `Bearer ${getAccessToken()}`
        }),
        data: null,
        expectedStatusCode: 204
    }, (result) => {
        if (isMounted) {
            const newAssignments = [...assignments];
            setAssignments(newAssignments.filter(a => a.id !== id));
        }
    }, (error) => {
        alert(error);
    })
}