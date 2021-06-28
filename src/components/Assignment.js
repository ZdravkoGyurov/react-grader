
import { IconButton } from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { makeStyles } from '@material-ui/core/styles';
import React, { useState } from 'react';
import { isAuthorized } from '../userIdentity';
import ConfirmationDialog from "./ConfirmationDialog";
import EditAssignmentDialog from "./EditAssignmentDialog";
import { TableRow } from "@material-ui/core";
import TableCell from '@material-ui/core/TableCell';
import { useHistory, useLocation } from "react-router-dom";

const useStyles = makeStyles({
    root: {
      maxWidth: 345,
    },
    media: {
      height: 140,
    },
});

export default function Assignment({ assignment, editAssignment, deleteAssignment }) {
    const [open, setOpen] = useState(false);
    const [confirmationOpen, setConfirmationOpen] = useState(false);

    const classes = useStyles();
    const canEditAssignment = isAuthorized('UPDATE_ASSIGNMENT');
    const canDeleteAssignment = isAuthorized('DELETE_ASSIGNMENT');
    let location = useLocation()
    let history = useHistory()

    const handleEditAssignment = () => {
        setOpen(true);
    }

    const handleDeleteAssignment = () => {
        setConfirmationOpen(true);
    }

    const handleSubmitDelete = () => {
        deleteAssignment(assignment.id);
    }

    const routeToAssignment = (a) => { 
        history.push(`/courses/${location.state.course.id}/${a.id}`, { course: location.state.course, assignment: a}) // , { course: location.state.course, assignment: a}
    }
    
    return (
        <TableRow key={assignment.id}>
            <TableCell><div onClick={() => {routeToAssignment(assignment)}}>{assignment.name}</div></TableCell>
            <TableCell>{assignment.description}</TableCell>
            <TableCell>{assignment.dueDate}</TableCell>
            <TableCell>
                {canEditAssignment ? 
                <IconButton onClick={handleEditAssignment}>
                    <EditIcon></EditIcon>
                </IconButton>
                : null }
            </TableCell>
            <TableCell>
                {canDeleteAssignment ?
                <IconButton onClick={handleDeleteAssignment}>
                    <DeleteIcon></DeleteIcon>
                </IconButton>
                : null}
            </TableCell>
            <EditAssignmentDialog open={open} setOpen={setOpen} editAssignment={editAssignment} assignment={assignment}/>
            <ConfirmationDialog 
                open={confirmationOpen}
                setOpen={setConfirmationOpen}
                submit={handleSubmitDelete}
                title="Delete assignment"
                message={"Are you sure you want to permanently delete assignment with name " + assignment.name + "?"}>
            </ConfirmationDialog>
        </TableRow>
    );
}