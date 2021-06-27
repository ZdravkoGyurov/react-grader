import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React, { useState } from 'react';
import { isAuthorized } from '../userIdentity';
import { IconButton } from '@material-ui/core';
import { useHistory } from "react-router-dom";

const useStyles = makeStyles({
    root: {
      minWidth: 250,
    },
    media: {
      height: 140,
    },
});

export default function Course({ loggedInUser, course }) {
    const [open, setOpen] = useState(false);
    const [confirmationOpen, setConfirmationOpen] = useState(false);
    let history = useHistory();

    const classes = useStyles();

    // return <AssignmentList loggedInUser={loggedInUser} courseId={course.id} ></AssignmentList>
    
    return (
        <div>
            <Card className={classes.root}>
                <CardActionArea onClick={() => history.push(`/courses/${course.id}`)}>
                    <CardMedia
                        className={classes.media}
                        image="course_background.jpg"
                        title="Course Image"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" align='left'>
                            {course.name}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            {course.description}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </div>
    );
}