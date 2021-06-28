
import { Divider, IconButton, ListItem, ListItemSecondaryAction, ListItemText } from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { makeStyles } from '@material-ui/core/styles';
import React, { useState } from 'react';
import { isAuthorized } from '../userIdentity';
import ConfirmationDialog from "./ConfirmationDialog";
import EditAssignmentDialog from "./EditAssignmentDialog";

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

    const handleEditAssignment = () => {
        setOpen(true);
    }

    const handleDeleteAssignment = () => {
        setConfirmationOpen(true);
    }

    const handleSubmitDelete = () => {
        deleteAssignment(assignment.id);
    }
    
    return (
        <div>
           <ListItem alignItems="flex-start">
                <ListItemText primary={assignment.name} />
                <ListItemText primary={assignment.description} />
                <ListItemText primary={assignment.dueDate} />
                <ListItemSecondaryAction>
                    { canEditAssignment ? 
                        <IconButton onClick={handleEditAssignment}>
                            <EditIcon></EditIcon>
                        </IconButton>
                     : null }
                    { canDeleteAssignment ?
                        <IconButton onClick={handleDeleteAssignment}>
                            <DeleteIcon></DeleteIcon>
                        </IconButton>
                     : null}
                </ListItemSecondaryAction>
            </ListItem>
            <EditAssignmentDialog open={open} setOpen={setOpen} editAssignment={editAssignment} assignment={assignment}/>
            <ConfirmationDialog 
                open={confirmationOpen}
                setOpen={setConfirmationOpen}
                submit={handleSubmitDelete}
                title="Delete assignment"
                message={"Are you sure you want to permanently delete assignment with name " + assignment.name + "?"}></ConfirmationDialog>
            <Divider/>
        </div>
    );
}