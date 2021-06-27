import React, { useState } from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { Button, CardActions, Grid, makeStyles } from '@material-ui/core';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import { isAuthorized } from '../userIdentity';
import { IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import ConfirmationDialog from "./ConfirmationDialog";
import EditCourseDialog from "./EditCourseDialog";

const useStyles = makeStyles({
    root: {
      minWidth: 250,
    },
    media: {
      height: 140,
    },
});

export default function BrowseCourse({course, createRequest, editCourse, deleteCourse}) {
    const [open, setOpen] = useState(false);
    const [confirmationOpen, setConfirmationOpen] = useState(false);
    const classes = useStyles();
    const canRequestJoin = isAuthorized('CREATE_COURSESREQUEST')

    const canEditCourse = isAuthorized('UPDATE_COURSE');
    const canDeleteCourse = isAuthorized('DELETE_COURSE');

    const handleRequestJoin = () => {
        createRequest(course.id)
    }

    const handleEditCourse = () => {
        setOpen(true);
    }

    const handleDeleteCourse = () => {
        setConfirmationOpen(true);
    }

    const handleSubmitDelete = () => {
        deleteCourse(course.id);
    }

    return (
        <Grid item>
            <Card className={classes.root}>
                <CardActionArea>
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
                    {canRequestJoin ? (
                        <Button
                            onClick={handleRequestJoin}
                            startIcon={<PersonAddIcon />}
                        >
                            Join
                        </Button>
                    ) : null}
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
        </Grid>
    );
}