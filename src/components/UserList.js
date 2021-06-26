import { List } from "@material-ui/icons";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { getAccessToken } from '../userIdentity';
import User from "./User";

const UserList = ({loggedInUser}) => {
    const [isLoaded, setIsLoaded] = useState(false)
    const [users, setUsers] = useState([])
    const [error, setError] = useState(null)
    let history = useHistory()
    
    useEffect(() => {
        if (!loggedInUser || (loggedInUser.permissions && loggedInUser.permissions.includes('READ_USERS'))) {
            history.push('/sign-in')
        }

        getUsers().then(
            (result) => {
                setUsers(result)
                setIsLoaded(true)
            },
            (error) => {
                setError(error)
                setIsLoaded(true)
            }
        )
    }, [history, loggedInUser])


    if (!isLoaded) {
        return <div>Loading...</div>
    }
    if (error) {
        return <div>{ error }</div>
    }
    return (
        <List>{users.map(user => <User key={user.id} user={user}/>)}</List>
    )
}

async function getUsers() {
    const res = await fetch('http://localhost:8080/api/users', {
            method: 'GET',
            headers: new Headers({
                'Authorization': `Bearer ${getAccessToken()}`
            })
        }
    )
    return await res.json()
}

export default UserList