import React from 'react';
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import send from "../api/api";
import '../styles/CourseList.css';
import Course from './Course';
import CreateCourseDialog from './CreateCourseDialog';
import { getAccessToken } from '../userIdentity';
import Typography from '@material-ui/core/Typography';
import ConfirmationDialog from "./ConfirmationDialog";
import { Button } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

export default function CourseList({ loggedInUser }) {
    const [isLoaded, setIsLoaded] = useState(false);
    const [courses, setCourses] = useState([]);
    const [error, setError] = useState(null);
    const [isMounted, setIsMounted] = useState(false);
    const [createOpen, setCreateOpen] = useState(false);
    let history = useHistory();

    useEffect(() => {
        setIsMounted(true);
        if (!loggedInUser || (loggedInUser.permissions && loggedInUser.permissions.includes('READ_COURSES'))) {
            history.push('/sign-in');
        }

        getCourses(isMounted, setIsLoaded, setCourses, setError);
        return () => { setIsMounted(false) }
    }, [isMounted, history, loggedInUser]);

    const handleOpenCreateDialog = () => {
        setCreateOpen(true);
    }

    const handleCreateCourse = (course, handleCloseDialog) => {
        createCourse(isMounted, courses, setCourses, course, handleCloseDialog);
    }

    const handleDeleteCourse = (id) => {
        deleteCourse(isMounted, courses, setCourses, id);
    }

    if (!isLoaded) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{ error }</div>;
    }

    return (
        <div className="courses">
                <Typography variant="h4" component="h2">
                    My courses
                </Typography>
                <Button
                    sx={{ pt: 3 }}
                    variant="contained"
                    color="primary"
                    startIcon={<AddIcon />}
                    onClick={handleOpenCreateDialog}
                >
                Create Course
                </Button>
                <CreateCourseDialog open={createOpen} setOpen={setCreateOpen} createCourse={handleCreateCourse}/>
                <div className="Courses-wrapper">
                    {courses.map(c => <Course key={c.id} course={c} deleteCourse={handleDeleteCourse}/>)}
                </div>
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

function createCourse(isMounted, courses, setCourses, course, handleCloseDialog) {
    send({
        url: `http://localhost:8080/api/courses`,
        method: 'POST',
        headers: new Headers({
            'Authorization': `Bearer ${getAccessToken()}`,
            'Content-Type': 'application/json'
        }),
        data: course,
        expectedStatusCode: 200
    }, (result) => {
        if (isMounted) {
            const newCourses = [...courses];
            newCourses.push(result);
            setCourses(newCourses);
            handleCloseDialog();
        }
    }, (error) => {
        alert(error);
    })
}

function deleteCourse(isMounted, courses, setCourses, id) {
    send({
        url: `http://localhost:8080/api/courses/${id}`,
        method: 'DELETE',
        headers: new Headers({
            'Authorization': `Bearer ${getAccessToken()}`
        }),
        data: null,
        expectedStatusCode: 204
    }, (result) => {
        if (isMounted) {
            const newCourses = [...courses];
            setCourses(newCourses.filter(c => c.id !== id));
        }
    }, (error) => {
        alert(error);
    })
}