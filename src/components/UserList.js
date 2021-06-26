import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { getAccessToken } from '../userIdentity';


const UserList = ({loggedInUser}) => {
    const [isLoaded, setIsLoaded] = useState(false)
    const [users, setUsers] = useState([])
    const [error, setError] = useState(null)
    let history = useHistory()
    
    useEffect(() => {
        if (!loggedInUser || (loggedInUser.permissions && loggedInUser.permissions.includes('READ_USERS'))) {
            history.push('/sign-in')
        }

        fetch('http://localhost:8080/api/users', {
                method: 'GET',
                headers: new Headers({
                    'Authorization': `Bearer ${getAccessToken()}`
                })
            }
        )
        .then(res => res.json())
        .then(
            (result) => {
                setIsLoaded(true)
                setUsers(result)
            },
            (error) => {
                setIsLoaded(true)
                setError(error)
            }
        )
    }, [])


    if (!isLoaded) {
        return <div>Loading...</div>
    }
    if (error) {
        return <div>{ error }</div>
    }
    return (
        <div>{ JSON.stringify(users) }</div>
    )
}

export default UserList