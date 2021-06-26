import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@material-ui/core";
import { useFormik } from "formik";
import * as yup from 'yup';

const validationSchema = yup.object({
    fullname: yup
        .string('Enter full name')
        .required('Full name is required'),
    githubUsername: yup
        .string('Enter GitHub username')
        .required('GitHub username is required'),
});

export default function EditUserDialog({open, setOpen, editUser, user}) {
    const formik = useFormik({
        initialValues: {
          fullname: user.fullname,
          githubUsername: user.githubUsername,
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            const data = {}
            if (user.fullname !== values.fullname) {
                data.fullname = values.fullname
            }
            if (user.githubUsername !== values.githubUsername) {
                data.githubUsername = values.githubUsername
            }
            editUser(user.id, data, () => {
                setOpen(false)
            })
        },
    });

    const handleCloseDialog = () => {
        formik.setFieldValue('fullname', user.fullname)
        formik.setFieldValue('githubUsername', user.githubUsername)
        setOpen(false)
    };

    const handleSubmitEditForm = (event) => {
        event.preventDefault()
        formik.handleSubmit()
    }

    return (
        <form>
            <Dialog open={open} onClose={handleCloseDialog} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Edit user</DialogTitle>
                <DialogContent>
                    <TextField
                        variant="outlined"
                        autoFocus
                        margin="dense"
                        id="fullname"
                        label="Full name"
                        type="text"
                        name="fullname"
                        fullWidth
                        value={formik.values.fullname}
                        onChange={formik.handleChange}
                        error={formik.touched.fullname && Boolean(formik.errors.nafullnameme)}
                        helperText={formik.touched.fullname && formik.errors.fullname}
                    />
                    <TextField
                        variant="outlined"
                        margin="dense"
                        id="githubUsername"
                        label="GitHub username"
                        type="text"
                        name="githubUsername"
                        fullWidth
                        value={formik.values.githubUsername}
                        onChange={formik.handleChange}
                        error={formik.touched.githubUsername && Boolean(formik.errors.githubUsername)}
                        helperText={formik.touched.githubUsername && formik.errors.githubUsername}
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