import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@material-ui/core";
import { useFormik } from "formik";
import * as yup from 'yup';

const validationSchema = yup.object({
    name: yup
        .string('Enter course name')
        .required('Course name is required'),
    description: yup
        .string('Enter description')
        .required('Course description is required'),
    githubRepoName: yup
        .string('Enter GitHub repository name')
        .required('GitHub repository name is required'),
});

export default function EditCourseDialog({ open, setOpen, editCourse, course }) {
    const formik = useFormik({
        initialValues: {
          name: course.name,
          description: course.description,
          githubRepoName: course.githubRepoName
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            const data = {}
            if (course.name !== values.name) {
                data.name = values.name;
            }
            if (course.description !== values.description) {
                data.description = values.description;
            }
            if (course.githubRepoName !== values.githubRepoName) {
                data.githubRepoName = values.githubRepoName;
            }

            editCourse(course.id, data, () => {
                setOpen(false);
            });
        },
    });

    const handleCloseDialog = () => {
        formik.setFieldValue('name', course.name);
        formik.setFieldValue('description', course.description);
        formik.setFieldValue('githubRepoName', course.githubRepoName);
        setOpen(false);
    };

    const handleSubmitEditForm = (event) => {
        event.preventDefault();
        formik.handleSubmit();
    }

    return (
        <form>
            <Dialog open={open} onClose={handleCloseDialog} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Edit course</DialogTitle>
                <DialogContent>
                    <TextField
                        variant="outlined"
                        autoFocus
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
                        multiline
                        value={formik.values.description}
                        onChange={formik.handleChange}
                        error={formik.touched.description && Boolean(formik.errors.description)}
                        helperText={formik.touched.description && formik.errors.description}
                    />
                    <TextField
                        variant="outlined"
                        margin="dense"
                        id="githubRepoName"
                        label="GitHub repository name"
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
                    <Button type="button" onClick={handleSubmitEditForm} variant="contained" color="primary">Save</Button>
                </DialogActions>
            </Dialog>
        </form>
    )
}