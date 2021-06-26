import { Divider, IconButton, ListItem, ListItemSecondaryAction, ListItemText, Typography } from "@material-ui/core";
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import React from "react";

const ApprovePermissionsRequest = ({request, editRequest}) => {
    const handleApproveRequest = () => {
        editRequest(request.id, {status: 'APPROVED'})
    }

    const handleDeclineRequest = () => {
        editRequest(request.id, {status: 'DECLINED'})
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
                                User ID {request.userId}
                            </Typography>
                            <Typography
                                component="div"
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
                {request.status === 'PENDING' ? 
                <ListItemSecondaryAction>
                    <IconButton onClick={handleApproveRequest}>
                        <CheckIcon/>
                    </IconButton>
                    <IconButton onClick={handleDeclineRequest}>
                        <CloseIcon/>
                    </IconButton>
                </ListItemSecondaryAction> : null}
            </ListItem>
            <Divider/>
        </div>
    )
}

export default ApprovePermissionsRequest;