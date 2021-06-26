import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@material-ui/core";
import { useFormik } from "formik";
import * as yup from 'yup';

const validationSchema = yup.object({
    permissions: yup
        .string('Enter permissions')
        .required('Permissions are required'),
});

export default function CreatePermissionsRequestDialog({open, setOpen, createRequest}) {
    const formik = useFormik({
        initialValues: {
            permissions: ''
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            const data = {
                permissions: values.permissions.split(' ')
            }
            createRequest(data, () => {
                setOpen(false)
            })
        },
    });

    const handleCloseDialog = () => {
        formik.setFieldValue('permissions', '')
        setOpen(false)
    };

    const handleSubmitEditForm = (event) => {
        event.preventDefault()
        formik.handleSubmit()
    }

    return (
        <form>
            <Dialog open={open} onClose={handleCloseDialog} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Create request for permissions</DialogTitle>
                <DialogContent>
                    <TextField
                        variant="outlined"
                        margin="dense"
                        id="permissions"
                        label="Permissions"
                        type="text"
                        name="permissions"
                        fullWidth
                        value={formik.values.permissions}
                        onChange={formik.handleChange}
                        error={formik.touched.permissions && Boolean(formik.errors.permissions)}
                        helperText={formik.touched.permissions && formik.errors.permissions}
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