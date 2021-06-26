import { Grid } from "@material-ui/core"
import AllCourseRequestsList from "./AllCourseRequestsList"
import AllPermissionsRequestsList from "./AllPermissionsRequestsList"

const ApproveRequests = ({loggedInUser}) => {
    return (
        <Grid container spacing={2}>
            <Grid item xs={6}>
                <AllPermissionsRequestsList loggedInUser={loggedInUser}/>
            </Grid>
            <Grid item xs={6}>
                <AllCourseRequestsList loggedInUser={loggedInUser}/>
            </Grid>
        </Grid>
    )
}

export default ApproveRequests