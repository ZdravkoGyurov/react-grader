import { Button, Dialog, Select, DialogActions, DialogContent, DialogTitle, MenuItem, InputLabel } from "@material-ui/core";
import { useState } from "react";

export default function CreateCourseRequestDialog({open, setOpen, createRequest, courses}) {
    const [courseId, setCourseId] = useState('')

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
