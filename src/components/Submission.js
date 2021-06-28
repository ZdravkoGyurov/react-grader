import { Divider, IconButton, ListItem, ListItemSecondaryAction, ListItemText } from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import React, { useState } from "react";
import ConfirmationDialog from "./ConfirmationDialog";
import { isAuthorized } from '../userIdentity';
import { TableRow } from "@material-ui/core";
import TableCell from '@material-ui/core/TableCell';

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
        <TableRow key={submission.id}>
            <TableCell>{submission.userId}</TableCell>
            <TableCell>{submission.status}</TableCell>
            <TableCell>{submission.results}</TableCell>
            <TableCell>
                {canDeleteSubmission ?
                    <IconButton onClick={handleDeleteSubmission}>
                        <DeleteIcon></DeleteIcon>
                    </IconButton>
                    : null}
            </TableCell>
            <ConfirmationDialog 
                open={confirmationOpen}
                setOpen={setConfirmationOpen}
                submit={handleSubmitDelete}
                title="Delete submission"
                message={"Are you sure you want to permanently delete the submission?"}>
            </ConfirmationDialog>
        </TableRow>
    )
}

export default Submission;