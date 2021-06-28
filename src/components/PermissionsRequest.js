import { Divider, IconButton, ListItem, ListItemSecondaryAction, ListItemText, Typography } from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import React, { useState } from "react";
import { isAuthorized } from "../userIdentity";
import ConfirmationDialog from "./ConfirmationDialog";

const PermissionsRequest = ({request, deleteRequest}) => {
    const [confirmationOpen, setConfirmationOpen] = useState(false);

    const canDeleteRequest = isAuthorized('DELETE_PERMISSIONSREQUEST')

    const handleDeleteRequest = () => {
        setConfirmationOpen(true)
    }
    
    const handleSubmitDelete = () => {
        deleteRequest(request.id)
    }

    return (
        <div>
            <ListItem alignItems="flex-start">
                <ListItemText
                    primary={
                        <React.Fragment>
                            <Typography
                                component="span"
                                variant="body1"
                                color="textPrimary"
                                >
                                Permissions {request.permissions.join(', ')}
                            </Typography>
                        </React.Fragment>
                    }
                    secondary={
                        <React.Fragment>
                            <Typography
                                component="span"
                                variant="body2"
                                color="textPrimary"
                            >
                                Status: {request.status}
                            </Typography>
                        </React.Fragment>
                    }
                />
                <ListItemSecondaryAction>
                    { canDeleteRequest ?
                        <IconButton onClick={handleDeleteRequest}>
                            <DeleteIcon></DeleteIcon>
                        </IconButton>
                    : null }
                </ListItemSecondaryAction>
            </ListItem>
            <ConfirmationDialog 
                open={confirmationOpen}
                setOpen={setConfirmationOpen}
                submit={handleSubmitDelete}
                title="Delete permissions request"
                message={"Are you sure you want to permanently delete request for permissions: " + request.permissions.join(', ') + "?"}></ConfirmationDialog>
            <Divider/>
        </div>
    )
}

export default PermissionsRequest;