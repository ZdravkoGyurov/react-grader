import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@material-ui/core";
import { useFormik } from "formik";
import * as yup from 'yup';

const validationSchema = yup.object({
    name: yup
        .string('Enter course name')
        .required('Course name is required'),
    description: yup
        .string('Enter course description')
        .required('Course description is required'),
    githubRepoName: yup
        .string('Enter GitHub repository name for the course')
        .required('GitHub repository name is required'),
});

export default function CreateCourseDialog({ open, setOpen, createCourse }) {
    const formik = useFormik({
        initialValues: {
            name: '',
            description: '',
            githubRepoName: ''
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            const data = {
                name: values.name,
                description: values.description,
                githubRepoName: values.githubRepoName
            };

            createCourse(data, () => {
                setOpen(false);
                formik.setFieldValue('name', '');
                formik.setFieldValue('description', '');
                formik.setFieldValue('githubRepoName', '');
                formik.touched.name = false;
                formik.touched.description = false;
                formik.touched.githubRepoName = false;
            });
        },
    });

    const handleCloseDialog = () => {
        formik.setFieldValue('name', '');
        formik.setFieldValue('description', '');
        formik.setFieldValue('githubRepoName', '');
        formik.touched.name = false;
        formik.touched.description = false;
        formik.touched.githubRepoName = false;
        setOpen(false);
    };

    const handleSubmitEditForm = (event) => {
        event.preventDefault();
        formik.handleSubmit();
    }

    return (
        <form>
            <Dialog open={open} onClose={handleCloseDialog} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Create a course</DialogTitle>
                <DialogContent>
                    <TextField
                        variant="outlined"
                        margin="dense"
                        id="name"
                        label="Course name"
                        type="text"
                        name="name"
                        fullWidth
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        error={formik.touched.name && Boolean(formik.errors.name)}
                        helperText={formik.touched.name && formik.errors.name}
                    />
                    <TextField
                        variant="outlined"
                        margin="dense"
                        id="description"
                        label="Course description"
                        type="text"
                        name="description"
                        fullWidth
                        value={formik.values.description}
                        onChange={formik.handleChange}
                        error={formik.touched.description && Boolean(formik.errors.description)}
                        helperText={formik.touched.description && formik.errors.description}
                    />
                    <TextField
                        variant="outlined"
                        margin="dense"
                        id="githubRepoName"
                        label="Course GitHub repository name"
                        type="text"
                        name="githubRepoName"
                        fullWidth
                        value={formik.values.githubRepoName}
                        onChange={formik.handleChange}
                        error={formik.touched.githubRepoName && Boolean(formik.errors.githubRepoName)}
                        helperText={formik.touched.githubRepoName && formik.errors.githubRepoName}
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