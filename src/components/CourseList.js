import React from 'react';
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import send from "../api/api";
import '../styles/CourseList.css';
import Course from './Course';
import { getAccessToken, isAuthorized } from '../userIdentity';
import { Grid, Typography } from "@material-ui/core";

export default function CourseList({ loggedInUser }) {
    const [isLoaded, setIsLoaded] = useState(false);
    const [courses, setCourses] = useState([]);
    const [error, setError] = useState(null);
    const [isMounted, setIsMounted] = useState(false);
    let history = useHistory();
    
    useEffect(() => {
        setIsMounted(true);
        if (!loggedInUser || !isAuthorized('READ_COURSES')) {
            history.push('/sign-in');
        }

        getCourses(isMounted, setIsLoaded, setCourses, setError);
        return () => { setIsMounted(false) }
    }, [isMounted, history, loggedInUser]);

    if (!isLoaded) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{ error }</div>;
    }

    return (
        <div className="courses">
                <Typography variant="h4" component="h2">My courses</Typography>
                <Grid container spacing={2}>
                    {courses.map(c => <Course key={c.id} loggedInUser={loggedInUser} course={c}/>)}
                </Grid>
        </div>
    )
}


function getCourses(isMounted, setIsLoaded, setCourses, setError) {
    send({
        url: 'http://localhost:8080/api/courses',
        method: 'GET',
        headers: new Headers({
            'Authorization': `Bearer ${getAccessToken()}`
        }),
        data: null,
        expectedStatusCode: 200
    }, (result) => {
        if (isMounted) {
            setCourses(result);
            setIsLoaded(true);
        }
    }, (error) => {
        if (isMounted) {
            setError(error);
            setIsLoaded(true);
        }
    })
}
