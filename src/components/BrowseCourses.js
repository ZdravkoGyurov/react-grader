import { Button, Grid, Snackbar, TextField, Typography } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import send from "../api/api";
import { getAccessToken, isAuthorized } from "../userIdentity";
import BrowseCourse from "./BrowseCourse";
import AddIcon from '@material-ui/icons/Add';
import CreateCourseDialog from "./CreateCourseDialog";

export default function BrowseCourses({loggedInUser}) {
    const [isLoaded, setIsLoaded] = useState(false);
    const [courses, setCourses] = useState([]);
    const [error, setError] = useState(null);
    const [isMounted, setIsMounted] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [createOpen, setCreateOpen] = useState(false);
    let history = useHistory();

    const canCreateCourse = isAuthorized('CREATE_COURSE');

    const [openSnackbar, setOpenSnackbar] = useState(false)
    const [snackbarMessage, setSnackbarMessage] = useState('')

    useEffect(() => {
        setIsMounted(true);
        if (!loggedInUser || !isAuthorized('READ_ALL_COURSES')) {
            history.push('/sign-in');
        }

        getAllCourses(isMounted, setIsLoaded, setCourses, setError);
        return () => { setIsMounted(false) }
    }, [isMounted, history, loggedInUser]);

    const filterByName = (course) => {
        return course.name.toLowerCase().includes(searchText.toLowerCase())
    }

    const handleOpenCreateDialog = () => {
        setCreateOpen(true);
    }

    const handleCreateCourse = (course, handleCloseDialog) => {
        createCourse(isMounted, courses, setCourses, course, handleCloseDialog);
    }

    const handleSearch = (event) => {
        setSearchText(event.target.value)
    }

    const handleCreateRequest = (courseId) => {
        const course = courses.filter(c => c.id === courseId)[0]
        createRequest(isMounted, courseId, course, setOpenSnackbar, setSnackbarMessage)
    }

    const handleEditCourse = (id, course, handleCloseDialog) => {
        editCourse(isMounted, courses, setCourses, id, course, handleCloseDialog);
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
        <span>
            <Typography variant="h4" component="h2">Browse courses</Typography>
            { canCreateCourse ? 
                <Button
                    sx={{ pt: 3 }}
                    variant="contained"
                    color="primary"
                    startIcon={<AddIcon />}
                    onClick={handleOpenCreateDialog}
                >
                    Create Course
                </Button> : null }
            <CreateCourseDialog open={createOpen} setOpen={setCreateOpen} createCourse={handleCreateCourse}/>
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
                    {courses.filter(c => filterByName(c)).map(c => <BrowseCourse key={c.id} course={c} createRequest={handleCreateRequest} editCourse={handleEditCourse} deleteCourse={handleDeleteCourse}/>)}
            </Grid>
            <Snackbar open={openSnackbar} autoHideDuration={5000} message={snackbarMessage}/>
        </span>
    )
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


function editCourse(isMounted, courses, setCourses, id, course, handleCloseDialog) {
    send({
        url: `http://localhost:8080/api/courses/${id}`,
        method: 'PATCH',
        headers: new Headers({
            'Authorization': `Bearer ${getAccessToken()}`,
            'Content-Type': 'application/json'
        }),
        data: course,
        expectedStatusCode: 200
    }, (result) => {
        if (isMounted) {
            const newCourses = [...courses];
            setCourses(newCourses.map(c => c.id === id ? result : c));
            handleCloseDialog()
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