import { Divider } from "@material-ui/core";
import { AppBar, IconButton, MenuItem, Toolbar, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import { getFullname, isAuthorized } from "../userIdentity";
import SignOut from './SignOut';

function NavBar({ loggedInUser, handleSignOut }) {
    const canReadUsers = loggedInUser && isAuthorized('READ_USERS')
    const canReadCourses = loggedInUser && isAuthorized('READ_COURSES')
    const canReadAllCourses = loggedInUser && isAuthorized('READ_ALL_COURSES')
    const canReadPermissionRequests = loggedInUser && isAuthorized('READ_PERMISSIONSREQUESTS')
    const canReadCourseRequests = loggedInUser && isAuthorized('READ_COURSESREQUESTS')
    const canReadAllCRequests = loggedInUser && isAuthorized('READ_ALL_PERMISSIONSREQUESTS')
    const canReadAllPRequests = loggedInUser && isAuthorized('READ_ALL_COURSESREQUESTS')
    const canReadAllSubmissions = loggedInUser && isAuthorized('READ_ALL_SUBMISSIONS')

    return (
        <div>
            <AppBar position="static">
                <Toolbar variant="dense">
                    <IconButton component={Link} to={'/'} edge="start" color="inherit" aria-label="menu">
                        <Typography variant="h4">Grader</Typography>
                    </IconButton>
                    {!loggedInUser ? <MenuItem component={Link} to={'/sign-in'}>Sign In</MenuItem> : null}
                    {!loggedInUser ? <MenuItem component={Link} to={'/sign-up'}>Sign Up</MenuItem> : null}
                    {loggedInUser && canReadUsers ? <MenuItem component={Link} to={'/users'}>Users</MenuItem> : null}
                    {loggedInUser && canReadCourses ? <MenuItem component={Link} to={'/courses'}>Courses</MenuItem> : null}
                    {loggedInUser && canReadAllCourses ? <MenuItem component={Link} to={'/browse-courses'}>Browse Courses</MenuItem> : null}
                    {loggedInUser && canReadAllSubmissions ? <MenuItem component={Link} to={'/submissions'}>Submissions</MenuItem> : null}
                    {loggedInUser && canReadPermissionRequests && canReadCourseRequests ? <MenuItem component={Link} to={'/my-requests'}>My Requests</MenuItem> : null}
                    {loggedInUser && canReadAllCRequests && canReadAllPRequests ? <MenuItem component={Link} to={'/approve-requests'}>Approve Requests</MenuItem> : null}
                    <Divider orientation="vertical" variant="inset" light={true} flexItem />
                    {loggedInUser ? loggedInUserInfo() : null }
                    {loggedInUser ? <SignOut handleSignOut={handleSignOut} />: null}
                </Toolbar>
            </AppBar>
        </div>
      );
}

function loggedInUserInfo() {
    return (
        <MenuItem button={false}>{getFullname()}</MenuItem>
    )
}

export default NavBar;