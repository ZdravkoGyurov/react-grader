import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import * as yup from 'yup';
import { Link as RouteLink, useHistory } from "react-router-dom";
import send from '../api/api';
import { useFormik } from 'formik';

const validationSchema = yup.object({
  fullName: yup
    .string('Enter full name')
    .required('Full name is required'),
  username: yup
    .string('Enter your username')
    .required('Username is required'),
  githubUsername: yup
    .string('Enter your GitHub username')
    .required('GitHub username is required'),
  password: yup
    .string('Enter your password')
    .required('Password is required')
});

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp({loggedInUser}) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [error, setError] = useState(null)
  const [isMounted, setIsMounted] = useState(false)
  const classes = useStyles();
  let history = useHistory()

  const formik = useFormik({
    initialValues: {
        fullName: '',
        username: '',
        githubUsername: '',
        password: ''
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      alert(1)
      console.log(values)
      // send({
      //   url: `http://localhost:8080/api/users`,
      //   method: 'POST',
      //   headers: new Headers({
      //       'Content-Type': 'application/json'
      //   }),
      //   data: values,
      //   expectedStatusCode: 200
      // }, (result) => {
      //   if (isMounted) {
      //     history.push('/sign-in')
      //   }
      // }, (error) => {
      //     alert(error)
      // })
    },
  });

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} onSubmit={formik.handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="fullName"
                label="Full name"
                name="fullName"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="githubUsername"
                label="GitHub username"
                name="githubUsername"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
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
            Sign Up
          </Button>
          <Grid container justify="center">
            <Grid item>
              <Link component={RouteLink} to={'/sign-in'} variant="body2">
                {"Already have an account? Sign in"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}