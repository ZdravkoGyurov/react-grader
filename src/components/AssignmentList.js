import { useEffect, useState } from "react";
import { useHistory, useLocation, useParams } from "react-router-dom";
import send from "../api/api";
import { getAccessToken, isAuthorized } from '../userIdentity';
import Assignment from "./Assignment";
import { TableContainer } from "@material-ui/core";
import { TableHead } from "@material-ui/core";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import { TableRow } from "@material-ui/core";
import TableCell from '@material-ui/core/TableCell';
import Typography from '@material-ui/core/Typography';
import CreateAssignmentDialog from "./CreateAssignmentDialog";
import { Button } from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';

export default function AssignmentList({ loggedInUser }) {
    const [isLoaded, setIsLoaded] = useState(false);
    const [assignments, setAssignments] = useState([]);
    const [error, setError] = useState(null);
    const [isMounted, setIsMounted] = useState(false);
    const [createOpen, setCreateOpen] = useState(false);
    let location = useLocation()
    let history = useHistory()
    const {courseId} = useParams();
    const course = location.state.course
    const canCreateAssignment = isAuthorized('CREATE_ASSIGNMENT');

    useEffect(() => {
        setIsMounted(true);
        if (!loggedInUser || !isAuthorized('READ_ASSIGNMENTS')) {
            history.push('/sign-in');
        }

        getAssignments(isMounted, setIsLoaded, courseId, setAssignments, setError);
        return () => { setIsMounted(false); }
    }, [isMounted, history, loggedInUser, courseId]);

    const handleCreateAssignment = (assignment, handleCloseDialog) => {
        createAssignment(isMounted, assignments, setAssignments, assignment, handleCloseDialog);
    }

    const handleOpenCreateDialog = () => {
        setCreateOpen(true);
    }

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
            { canCreateAssignment ? 
                <Button
                    sx={{ pt: 3 }}
                    variant="contained"
                    color="primary"
                    startIcon={<AddIcon />}
                    onClick={handleOpenCreateDialog}
                >
                    Create Assignment
                </Button> : null }
            <CreateAssignmentDialog open={createOpen} setOpen={setCreateOpen} createAssignment={handleCreateAssignment} courseId={courseId}/>
            <TableContainer>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell>Due Date</TableCell>
                            <TableCell>Edit</TableCell>
                            <TableCell>Delete</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {assignments.map(a => <Assignment key={a.id} course={course} assignment={a} editAssignment={handleEditAssignment} deleteAssignment={handleDeleteAssignment}/>)}
                    </TableBody>
                </Table>
            </TableContainer>
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

function createAssignment(isMounted, assignments, setAssignments, assignment, handleCloseDialog) {
    send({
        url: `http://localhost:8080/api/assignments`,
        method: 'POST',
        headers: new Headers({
            'Authorization': `Bearer ${getAccessToken()}`,
            'Content-Type': 'application/json'
        }),
        data: assignment,
        expectedStatusCode: 200
    }, (result) => {
        if (isMounted) {
            const newAssignments = [...assignments];
            newAssignments.push(result);
            setAssignments(newAssignments);
            handleCloseDialog();
        }
    }, (error) => {
        alert(error);
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