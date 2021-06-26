import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@material-ui/core";
import { useFormik } from "formik";
import * as yup from 'yup';

const validationSchema = yup.object({
    courseId: yup
        .string('Enter course id')
        .required('Course id is required'),
});

export default function CreateCourseRequestDialog({open, setOpen, createRequest}) {
    const formik = useFormik({
        initialValues: {
            courseId: ''
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            const data = {
                courseId: values.courseId
            }
            createRequest(data, () => {
                setOpen(false)
                formik.setFieldValue('courseId', '')
                formik.touched.courseId = false
            })
        },
    });

    const handleCloseDialog = () => {
        formik.setFieldValue('courseId', '')
        formik.touched.courseId = false
        setOpen(false)
    };

    const handleSubmitEditForm = (event) => {
        event.preventDefault()
        formik.handleSubmit()
    }

    return (
        <form>
            <Dialog open={open} onClose={handleCloseDialog} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Create request to join course</DialogTitle>
                <DialogContent>
                    <TextField
                        variant="outlined"
                        margin="dense"
                        id="courseId"
                        label="Course ID"
                        type="text"
                        name="courseId"
                        fullWidth
                        value={formik.values.courseId}
                        onChange={formik.handleChange}
                        error={formik.touched.courseId && Boolean(formik.errors.courseId)}
                        helperText={formik.touched.courseId && formik.errors.courseId}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog}>Cancel</Button>
                    <Button type="button" onClick={handleSubmitEditForm} variant="contained" color="primary">Create</Button>
                </DialogActions>
            </Dialog>
        </form>
    )
}