import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@material-ui/core";
import { useFormik } from "formik";
import * as yup from 'yup';

const validationSchema = yup.object({
    name: yup
        .string('Enter assignment name')
        .required('Assignment name is required'),
    description: yup
        .string('Enter assignment description')
        .required('Assignment description is required'),
    dueDate: yup
        .string('Enter due date')
        .required('Due date is required'),
});

export default function CreateAssignmentDialog({ open, setOpen, createAssignment, courseId }) {
    const formik = useFormik({
        initialValues: {
            name: '',
            description: '',
            dueDate: ''
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            const data = {
                name: values.name,
                description: values.description,
                dueDate: values.dueDate,
                courseId: courseId
            };

            createAssignment(data, () => {
                setOpen(false);
                formik.setFieldValue('name', '');
                formik.setFieldValue('description', '');
                formik.setFieldValue('dueDate', '');
                formik.touched.name = false;
                formik.touched.description = false;
                formik.touched.dueDate = false;
            });
        },
    });

    const handleCloseDialog = () => {
        formik.setFieldValue('name', '');
        formik.setFieldValue('description', '');
        formik.setFieldValue('dueDate', '');
        formik.touched.name = false;
        formik.touched.description = false;
        formik.touched.dueDate = false;
        setOpen(false);
    };

    const handleSubmitEditForm = (event) => {
        event.preventDefault();
        formik.handleSubmit();
    }

    return (
        <form>
            <Dialog open={open} onClose={handleCloseDialog} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Create an assignment</DialogTitle>
                <DialogContent>
                    <TextField
                        variant="outlined"
                        margin="dense"
                        id="name"
                        label="Assignment name"
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
                        label="Assignment description"
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
                        id="dueDate"
                        label="Assignment due date"
                        type="text"
                        name="dueDate"
                        fullWidth
                        value={formik.values.dueDate}
                        onChange={formik.handleChange}
                        error={formik.touched.dueDate && Boolean(formik.errors.dueDate)}
                        helperText={formik.touched.dueDate && formik.errors.dueDate}
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