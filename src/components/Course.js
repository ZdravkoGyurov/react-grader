import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
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
import ConfirmationDialog from "./ConfirmationDialog";
import EditCourseDialog from "./EditCourseDialog";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles({
    root: {
      maxWidth: 345,
    },
    media: {
      height: 140,
    },
});

export default function Course({ loggedInUser, course, editCourse, deleteCourse }) {
    const [open, setOpen] = useState(false);
    const [confirmationOpen, setConfirmationOpen] = useState(false);
    let history = useHistory();

    const classes = useStyles();
    const canEditCourse = isAuthorized('UPDATE_COURSE');
    const canDeleteCourse = isAuthorized('DELETE_COURSE');

    const handleEditCourse = () => {
        setOpen(true);
    }

    const handleDeleteCourse = () => {
        setConfirmationOpen(true);
    }

    const handleSubmitDelete = () => {
        deleteCourse(course.id);
    }

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

                <CardActions>
                    {canEditCourse ? (
                        <IconButton onClick={handleEditCourse}>
                            <EditIcon></EditIcon>
                        </IconButton>) : null
                    }
                    
                    {canDeleteCourse ? (
                        <IconButton onClick={handleDeleteCourse}>
                            <DeleteIcon></DeleteIcon>
                        </IconButton>
                    ) : null}
                </CardActions>
            </Card>
            <EditCourseDialog open={open} setOpen={setOpen} editCourse={editCourse} course={course}/>
            <ConfirmationDialog 
                open={confirmationOpen}
                setOpen={setConfirmationOpen}
                submit={handleSubmitDelete}
                title="Delete course"
                message={"Are you sure you want to permanently delete course with name " + course.name + "?"}>
            </ConfirmationDialog>
        </div>
    );
}