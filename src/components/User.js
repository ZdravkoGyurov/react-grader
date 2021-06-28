import { Divider, IconButton, ListItem, ListItemSecondaryAction, ListItemText, Tooltip, Typography } from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import GitHubIcon from '@material-ui/icons/GitHub';
import InfoIcon from '@material-ui/icons/Info';
import React, { useState } from "react";
import ConfirmationDialog from "./ConfirmationDialog";
import EditUserDialog from "./EditUserDialog";
import { isAuthorized } from '../userIdentity';

const User = ({user, editUser, deleteUser}) => {
    const [open, setOpen] = useState(false);
    const [confirmationOpen, setConfirmationOpen] = useState(false);

    const canEditUser = isAuthorized('UPDATE_USER')
    const canDeleteUser = isAuthorized('DELETE_USER')

    const handleEditUser = () => {
        setOpen(true)
    }

    const handleDeleteUser = () => {
        setConfirmationOpen(true)
    }
    
    const handleSubmitDelete = () => {
        deleteUser(user.id)
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
                                {user.fullname + " (" + user.username + ")"}
                                <Tooltip title={user.permissions.join(' | ') + ' | ' + user.courseIds.join(' | ')}><InfoIcon></InfoIcon></Tooltip>
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
                                <GitHubIcon/>{user.githubUsername}
                            </Typography>
                        </React.Fragment>
                    }
                />
                <ListItemSecondaryAction>
                    { canEditUser ?
                        <IconButton onClick={handleEditUser}>
                            <EditIcon></EditIcon>
                        </IconButton>
                    : null }
                    { canDeleteUser ?
                        <IconButton onClick={handleDeleteUser}>
                            <DeleteIcon></DeleteIcon>
                        </IconButton>
                    : null }
                </ListItemSecondaryAction>
            </ListItem>
            <EditUserDialog open={open} setOpen={setOpen} editUser={editUser} user={user}/>
            <ConfirmationDialog 
                open={confirmationOpen}
                setOpen={setConfirmationOpen}
                submit={handleSubmitDelete}
                title="Delete user"
                message={"Are you sure you want to permanently delete user with username " + user.username + "?"}></ConfirmationDialog>
            <Divider/>
        </div>
    )
}

export default User;