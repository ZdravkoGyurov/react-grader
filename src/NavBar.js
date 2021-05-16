import { AppBar, IconButton, MenuItem, Toolbar, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";

function NavBar() {
    return (
        <div>
            <AppBar position="static">
                <Toolbar variant="dense">
                    <IconButton component={Link} to={'/'} edge="start" color="inherit" aria-label="menu">
                        <Typography variant="h4">Grader</Typography>
                    </IconButton>
                    <MenuItem component={Link} to={'/sign-in'}>Sign In</MenuItem>
                    <MenuItem component={Link} to={'/about'}>About</MenuItem>
                </Toolbar>
            </AppBar>
        </div>
      );
}

export default NavBar;