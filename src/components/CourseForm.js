import React, { useEffect } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { useHistory } from "react-router-dom";
import { getAccessToken } from '../userIdentity';

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3)
    },
    submit: {
        margin: theme.spacing(3, 0, 2)
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

export default function CourseForm({ loggedInUser }) {
  const classes = useStyles();
  const history = useHistory();

  useEffect(() => {
    if (!loggedInUser) {
      history.push('/sign-in')
    }
  });

  const formik = useFormik({
    initialValues: {
        name: '',
        description: '',
        githubRepoName: ''
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
        const course = {
            userId: loggedInUser,
            name: values.name,
            description: values.description,
            githubRepoName: values.githubRepoName
        };

        fetch('http://localhost:8080/api/courses', {
            method: 'POST',
            body: JSON.stringify(course),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getAccessToken()}`
            }),
          })
          .then(res => res.json())
          .then(
            (result) => {
              history.push("/courses");
            },
            (error) => {
                console.log(error)
            }
        );
    },
  });

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
            Create new course
        </Typography>
        <form className={classes.form} onSubmit={formik.handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                id="name"
                label="Course Name"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                id="description"
                label="Description"
                name="description"
                value={formik.values.description}
                onChange={formik.handleChange}
                error={formik.touched.description && Boolean(formik.errors.description)}
                helperText={formik.touched.description && formik.errors.description}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                id="githubRepoName"
                label="GitHub repository name"
                name="githubRepoName"
                value={formik.values.githubRepoName}
                onChange={formik.handleChange}
                error={formik.touched.githubRepoName && Boolean(formik.errors.githubRepoName)}
                helperText={formik.touched.githubRepoName && formik.errors.githubRepoName}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Submit
          </Button>
        </form>
      </div>
    </Container>
  );
}