import React from 'react';
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
import { Link as RouteLink } from "react-router-dom";
import * as yup from 'yup';
import { useFormik } from 'formik';
import { useHistory } from "react-router-dom";
import { authenticate } from '../userIdentity';

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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const validationSchema = yup.object({
  username: yup
    .string('Enter your username')
    .required('Username is required'),
  password: yup
    .string('Enter your password')
    .required('Password is required')
});

export default function SignIn({ handleSignIn }) {
  const classes = useStyles();
  const history = useHistory();

  const formik = useFormik({
    initialValues: {
        username: '',
        password: ''
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
        const token = btoa(`${values.username}:${values.password}`);

        fetch('http://localhost:8080/api/login', {
            method: 'GET',
            headers: new Headers({
                'Authorization': `Basic ${token}`
            }),
          })
          .then(res => res.json())
          .then(
            (result) => {
              authenticate(result);
                handleSignIn();
                history.push("/courses");
            },
            (error) => {
                console.log(error);
            }
          );
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
          Sign in
        </Typography>
        <form className={classes.form} onSubmit={formik.handleSubmit}>

        <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                id="username"
                label="Username"
                name="username"
                value={formik.values.username}
                onChange={formik.handleChange}
                error={formik.touched.username && Boolean(formik.errors.username)}
                helperText={formik.touched.username && formik.errors.username}
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                type="password"
                id="password"
                label="Password"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                error={formik.touched.password && Boolean(formik.errors.password)}
                helperText={formik.touched.password && formik.errors.password}
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
            Sign In
          </Button>
          <Link component={RouteLink} to={'/sign-up'} variant="body2">
            {"Don't have an account? Sign Up"}
          </Link>
        </form>
      </div>
    </Container>
  );
}