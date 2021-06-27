import { Grid, Snackbar, TextField, Typography } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import send from "../api/api";
import { getAccessToken } from "../userIdentity";
import BrowseCourse from "./BrowseCourse";

export default function BrowseCourses({loggedInUser}) {
    const [isLoaded, setIsLoaded] = useState(false);
    const [courses, setCourses] = useState([]);
    const [error, setError] = useState(null);
    const [isMounted, setIsMounted] = useState(false);
    const [searchText, setSearchText] = useState('');
    let history = useHistory();

    const [openSnackbar, setOpenSnackbar] = useState(false)
    const [snackbarMessage, setSnackbarMessage] = useState('')

    useEffect(() => {
        setIsMounted(true);
        if (!loggedInUser || (loggedInUser.permissions && loggedInUser.permissions.includes('READ_ALL_COURSES'))) {
            history.push('/sign-in');
        }

        getAllCourses(isMounted, setIsLoaded, setCourses, setError);
        return () => { setIsMounted(false) }
    }, [isMounted, history, loggedInUser]);

    const filterByName = (course) => {
        return course.name.toLowerCase().includes(searchText.toLowerCase())
    }

    const handleSearch = (event) => {
        setSearchText(event.target.value)
    }

    const handleCreateRequest = (courseId) => {
        const course = courses.filter(c => c.id === courseId)[0]
        createRequest(isMounted, courseId, course, setOpenSnackbar, setSnackbarMessage)
    }
    
    if (!isLoaded) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{ error }</div>;
    }

    return (
        <span>
            <Typography variant="h4" component="h2">Browse courses</Typography>
            <Grid container spacing={2}>
                    <TextField
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            name="filter"
                            label="Search"
                            type="text"
                            id="filter"
                            value={searchText}
                            onChange={handleSearch}
                    />
                    {courses.filter(c => filterByName(c)).map(c => <BrowseCourse key={c.id} course={c} createRequest={handleCreateRequest}/>)}
            </Grid>
            <Snackbar open={openSnackbar} autoHideDuration={5000} message={snackbarMessage}/>
        </span>
    )
}

function createRequest(isMounted, courseId, course, setOpenSnackbar, setSnackbarMessage) {
    send({
        url: `http://localhost:8080/api/coursesRequests`,
        method: 'POST',
        headers: new Headers({
            'Authorization': `Bearer ${getAccessToken()}`,
            'Content-Type': 'application/json'
        }),
        data: { courseId: courseId },
        expectedStatusCode: 200
    }, (result) => {
        if (isMounted) {
            setOpenSnackbar(true)
            setSnackbarMessage(`Created request to join course '${course.name}'`)
        }
    }, (error) => {
        setOpenSnackbar(true)
        setSnackbarMessage(`Failed to creat request to join course '${course.name}'`)
    })
}

function getAllCourses(isMounted, setIsLoaded, setCourses, setError) {
    send({
        url: 'http://localhost:8080/api/courses/all',
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