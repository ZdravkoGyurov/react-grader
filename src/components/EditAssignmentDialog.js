import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@material-ui/core";
import { useFormik } from "formik";
import * as yup from 'yup';

const validationSchema = yup.object({
    name: yup
        .string('Enter assignment name')
        .required('Assignment name is required'),
    description: yup
        .string('Enter assignment description')
        .required('Description is required'),
    dueDate: yup
        .date('Enter assignment due date')
});

export default function EditAssignmentDialog({ open, setOpen, editAssignment, assignment }) {
    const formik = useFormik({
        initialValues: {
          name: assignment.name,
          description: assignment.description,
          dueDate: assignment.dueDate,
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            const data = {}
            if (assignment.name !== values.name) {
                data.name = values.name;
            }
            if (assignment.description !== values.description) {
                data.description = values.description;
            }
            if (assignment.dueDate !== values.dueDate) {
                data.dueDate = values.dueDate;
            }
            editAssignment(assignment.id, data, () => {
                setOpen(false);
            });
        },
    });

    const handleCloseDialog = () => {
        formik.setFieldValue('name', assignment.name);
        formik.setFieldValue('description', assignment.description);
        formik.setFieldValue('dueDate', assignment.dueDate);
        setOpen(false);
    };

    const handleSubmitEditForm = (event) => {
        event.preventDefault();
        formik.handleSubmit();
    }

    return (
        <form>
            <Dialog open={open} onClose={handleCloseDialog} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Edit assignment</DialogTitle>
                <DialogContent>
                    <TextField
                        variant="outlined"
                        autoFocus
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
                    <Button type="button" onClick={handleSubmitEditForm} variant="contained" color="primary">Save</Button>
                </DialogActions>
            </Dialog>
        </form>
    )
}