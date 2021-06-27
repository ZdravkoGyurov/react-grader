import { Button, Dialog, Select, DialogActions, DialogContent, DialogTitle, MenuItem, InputLabel } from "@material-ui/core";
import { useEffect, useState } from "react";
import send from "../api/api";
import { getAccessToken } from "../userIdentity";

export default function CreateCourseRequestDialog({open, setOpen, createRequest}) {
    const [isMounted, setIsMounted] = useState('')
    const [isLoaded, setIsLoaded] = useState('')
    const [courses, setCourses] = useState([])
    const [error, setError] = useState('')

    const [courseId, setCourseId] = useState('')

    useEffect(() => {
        setIsMounted(true)

        getCourses(isMounted, setIsLoaded, setCourses, setError)
        return () => { setIsMounted(false) }
    }, [isMounted])

    const handleSelect = (event) => {
        setCourseId(event.target.value)
    }

    const handleCloseDialog = () => {
        setOpen(false)
    };

    const handleSubmitEditForm = (event) => {
        event.preventDefault()
        const data = {
            courseId: courseId
        }
        createRequest(data, () => {
            setOpen(false)
        })
    }

    return (
        <form>
            <Dialog open={open} onClose={handleCloseDialog} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Create request to join course</DialogTitle>
                <DialogContent>
                    {isLoaded ? (error ? alert(error) : 
                    <span>
                        <InputLabel id="course">Course</InputLabel>
                        <Select
                            id="course"
                            labelId="course"
                            value={courseId}
                            onChange={handleSelect}
                            name="course"
                            fullWidth
                            >
                                {courses.map(c => courseMenuItem(c))}
                        </Select>
                    </span>)
                     : <div>loading</div>}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog}>Cancel</Button>
                    <Button type="button" onClick={handleSubmitEditForm} variant="contained" color="primary">Create</Button>
                </DialogActions>
            </Dialog>
        </form>
    )
}

function courseMenuItem(c) {
    return (
        <MenuItem key={c.id} value={c.id}>{c.name}</MenuItem>
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
            setCourses(result)
            setIsLoaded(true)
        }
    }, (error) => {
        if (isMounted) {
            setError(error)
            setIsLoaded(true)
        }
    })
}