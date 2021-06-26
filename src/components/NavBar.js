import { AppBar, IconButton, MenuItem, Toolbar, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import SignOut from './SignOut';

function NavBar({ loggedInUser, handleSignOut }) {
    return (
        <div>
            <AppBar position="static">
                <Toolbar variant="dense">
                    <IconButton component={Link} to={'/'} edge="start" color="inherit" aria-label="menu">
                        <Typography variant="h4">Grader</Typography>
                    </IconButton>
                    {!loggedInUser ? <MenuItem component={Link} to={'/sign-in'}>Sign In</MenuItem> : null}
                    {!loggedInUser ? <MenuItem component={Link} to={'/sign-up'}>Sign Up</MenuItem> : null}
                    {!loggedInUser ? <MenuItem component={Link} to={'/courses'}>Courses</MenuItem> : null}
                    {loggedInUser ? <MenuItem component={Link} to={'/users'}>Users</MenuItem> : null}
                    {loggedInUser ? <MenuItem component={Link} to={'/my-requests'}>My Requests</MenuItem> : null}
                    {loggedInUser ? <MenuItem component={Link} to={'/approve-requests'}>Approve Requests</MenuItem> : null}
                    {loggedInUser ? <SignOut handleSignOut={handleSignOut} />: null}
                </Toolbar>
            </AppBar>
        </div>
      );
}

export default NavBar;