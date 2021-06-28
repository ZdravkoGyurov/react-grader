import { Divider, ListItem, ListItemText } from "@material-ui/core";
import React from "react";

const AssignmentSubmission = ({assignmentSubmission}) => {
    return (
        <div>
           <ListItem alignItems="flex-start">
                <ListItemText primary={assignmentSubmission.status} />
                <ListItemText primary={assignmentSubmission.results} />
            </ListItem>
            <Divider/>
        </div>
    )
}

export default AssignmentSubmission;