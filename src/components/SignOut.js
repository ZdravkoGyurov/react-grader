import { MenuItem} from "@material-ui/core";
import { Link } from "react-router-dom";

export default function SignOut({ handleSignOut }) {
    return(
        <MenuItem component={Link} to={'/sign-in'} onClick={handleSignOut}>Sign out</MenuItem>
    );
}