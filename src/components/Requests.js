import { Grid } from "@material-ui/core"
import CourseRequestsList from "./CourseRequestsList"
import PermissionsRequestsList from "./PermissionsRequestsList"

const Requests = ({loggedInUser}) => {
    return (
        <Grid container spacing={2}>
            <Grid item xs={6}>
                <PermissionsRequestsList loggedInUser={loggedInUser}/>
            </Grid>
            <Grid item xs={6}>
                <CourseRequestsList loggedInUser={loggedInUser}/>
            </Grid>
        </Grid>
    )
}

export default Requests