import { Divider, IconButton, ListItem, ListItemSecondaryAction, ListItemText } from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import React, { useState } from "react";
import ConfirmationDialog from "./ConfirmationDialog";
import { isAuthorized } from '../userIdentity';

const Submission = ({submission, deleteSubmission}) => {
    const [open, setOpen] = useState(false);
    const [confirmationOpen, setConfirmationOpen] = useState(false);

    const canDeleteSubmission = isAuthorized('DELETE_SUBMISSION');

    const handleDeleteSubmission = () => {
        setConfirmationOpen(true);
    }
    
    const handleSubmitDelete = () => {
        deleteSubmission(submission.id);
    }

    return (
        <div>
           <ListItem alignItems="flex-start">
                <ListItemText primary={submission.status} />
                <ListItemText primary={submission.results} />
                <ListItemText primary={submission.userId} />
                <ListItemSecondaryAction>
                    {canDeleteSubmission ?
                        <IconButton onClick={handleDeleteSubmission}>
                            <DeleteIcon></DeleteIcon>
                        </IconButton>
                     : null}
                </ListItemSecondaryAction>
            </ListItem>
            <ConfirmationDialog 
                open={confirmationOpen}
                setOpen={setConfirmationOpen}
                submit={handleSubmitDelete}
                title="Delete submission"
                message={"Are you sure you want to permanently delete the submission?"}></ConfirmationDialog>
            <Divider/>
        </div>
    )
}

export default Submission;