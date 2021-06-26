import { Button, Card, CardActions, CardContent, CardHeader, CardMedia,
  Collapse, Dialog, DialogActions, DialogContent, DialogTitle, Divider,
  Grid, IconButton, TextField, Typography } from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import React, { useState } from "react";
import { red } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core/styles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import clsx from 'clsx';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { isAuthorized } from '../userIdentity';

const useStyles = makeStyles((theme) => ({
    root: {
      maxWidth: 345,
    },
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
    },
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
    avatar: {
      backgroundColor: red[500],
    },
}));

const validationSchema = yup.object({
  name: yup
    .string('Enter a name for the course')
    .required('Name is required')
    .max(80, 'Name should be of maximum 100 characters'),
  description: yup
    .string('Enter a description for the course')
    .required('Description is required')
    .min(50, 'Description should be of minimum 50 characters'),
  githubRepoName: yup
    .string('Enter a GitHub repository name for the course')
    .required('GitHub repository name is required')
});

const CourseForm = ({ loggedInUser, course, onEditCourse, onDeleteCourse }) => {
    const classes = useStyles();
    const canEditCourse = isAuthorized('UPDATE_COURSE');
    const canDeleteCourse = isAuthorized('DELETE_COURSE');
    const [expanded, setExpanded] = useState(false);
    const [open, setOpen] = useState(false);

    const formik = useFormik({
        initialValues: {
          name: course.name,
          description: course.description,
          githubRepoName: course.githubRepoName
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            const course = {
              name: values.name,
              description: values.description,
              githubRepoName: values.githubRepoName
            };

            // onEditCourse(course.id, course);
            setOpen(false);
        },
      });

    const handleEditCourse = () => {
        setOpen(true)
    }

    const handleCloseDialog = () => {
        formik.setFieldValue('name', course.name);
        formik.setFieldValue('description', course.description);
        formik.setFieldValue('githubRepoName', course.githubRepoName);
        setOpen(false);
    };

    const handleDeleteCourse = () => {
        // onDeleteCourse(course.id);
    }

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const handleSubmitEditForm = (event) => {
        event.preventDefault();
        formik.handleSubmit();
    }

    return (
        <Grid item>
            <Card className={classes.root}>
                <CardHeader
                    title={course.name}
                />
                <CardContent>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {course.description}
                    </Typography>
                </CardContent>
                <CardActions disableSpacing>
                    {(loggedInUser && canEditCourse) ? // loggedInUser.id === course.userId
                          <IconButton onClick={handleEditCourse}>
                              <EditIcon></EditIcon>
                          </IconButton>
                     : null}
                    {(loggedInUser && canDeleteCourse) ? // loggedInUser.id === course.userId
                        <IconButton onClick={handleDeleteCourse}>
                            <DeleteIcon></DeleteIcon>
                        </IconButton>
                    : null}
                    <IconButton
                        className={clsx(classes.expand, {[classes.expandOpen]: expanded})}
                        onClick={handleExpandClick}
                        aria-expanded="false"
                        aria-label="show more"
                    >
                        <ExpandMoreIcon />
                    </IconButton>
                </CardActions>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <CardContent>
                        <Typography paragraph>
                            {course.githubRepoName}
                        </Typography>
                    </CardContent>
                </Collapse>
            </Card>
            <Dialog open={open} onClose={handleCloseDialog} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Edit course</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        name="name"
                        label="Name"
                        type="text"
                        fullWidth
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        error={formik.touched.name && Boolean(formik.errors.name)}
                        helperText={formik.touched.name && formik.errors.name}
                    />
                    <TextField
                        margin="dense"
                        id="description"
                        name="description"
                        label="Description"
                        type="text"
                        fullWidth
                        value={formik.values.description}
                        onChange={formik.handleChange}
                        error={formik.touched.description && Boolean(formik.errors.description)}
                        helperText={formik.touched.description && formik.errors.description}
                    />
                    <TextField
                        margin="dense"
                        id="githubRepoName"
                        name="githubRepoName"
                        label="GitHub repo name"
                        type="number"
                        fullWidth
                        value={formik.values.githubRepoName}
                        onChange={formik.handleChange}
                        error={formik.touched.githubRepoName && Boolean(formik.errors.githubRepoName)}
                        helperText={formik.touched.githubRepoName && formik.errors.githubRepoName}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="secondary" variant="contained">Cancel</Button>
                    <Button type="button" onClick={handleSubmitEditForm} color="primary" variant="contained">Save</Button>
                </DialogActions>
            </Dialog>
            <Divider/>
        </Grid>
    )
}

export default CourseForm;