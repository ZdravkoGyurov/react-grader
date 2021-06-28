import { List } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import send from "../api/api";
import { getAccessToken, isAuthorized } from '../userIdentity';
import User from "./User";

const UserList = ({loggedInUser}) => {
    const [isLoaded, setIsLoaded] = useState(false)
    const [users, setUsers] = useState([])
    const [error, setError] = useState(null)
    const [isMounted, setIsMounted] = useState(false)
    let history = useHistory()
    
    useEffect(() => {
        setIsMounted(true)
        if (!loggedInUser || !isAuthorized('READ_USERS')) {
            history.push('/sign-in')
        }

        getUsers(isMounted, setIsLoaded, setUsers, setError)
        return () => { setIsMounted(false) }
    }, [isMounted, history, loggedInUser])

    const handleEditUser = (id, user, handleCloseDialog) => {
        editUser(isMounted, users, setUsers, id, user, handleCloseDialog)
    }

    const handleDeleteUser = (id) => {
        deleteUser(isMounted, users, setUsers, id)
    }

    if (!isLoaded) {
        return <div>Loading...</div>
    }
    if (error) {
        return <div>{ error }</div>
    }
    return (
        <List>{users.map(user => <User key={user.id} user={user} editUser={handleEditUser} deleteUser={handleDeleteUser}/>)}</List>
    )
}

function getUsers(isMounted, setIsLoaded, setUsers, setError) {
    send({
        url: 'http://localhost:8080/api/users',
        method: 'GET',
        headers: new Headers({
            'Authorization': `Bearer ${getAccessToken()}`
        }),
        data: null,
        expectedStatusCode: 200
    }, (result) => {
        if (isMounted) {
            setUsers(result)
            setIsLoaded(true)
        }
    }, (error) => {
        if (isMounted) {
            setError(error)
            setIsLoaded(true)
        }
    })
}

function editUser(isMounted, users, setUsers, id, user, handleCloseDialog) {
    send({
        url: `http://localhost:8080/api/users/${id}`,
        method: 'PATCH',
        headers: new Headers({
            'Authorization': `Bearer ${getAccessToken()}`,
            'Content-Type': 'application/json'
        }),
        data: user,
        expectedStatusCode: 200
    }, (result) => {
        if (isMounted) {
            const newUsers = [...users]
            setUsers(newUsers.map(u => u.id === id ? result : u))
            handleCloseDialog()
        }
    }, (error) => {
        alert(error)
    })
}

function deleteUser(isMounted, users, setUsers, id) {
    send({
        url: `http://localhost:8080/api/users/${id}`,
        method: 'DELETE',
        headers: new Headers({
            'Authorization': `Bearer ${getAccessToken()}`
        }),
        data: null,
        expectedStatusCode: 204
    }, (result) => {
        if (isMounted) {
            const newUsers = [...users]
            setUsers(newUsers.filter(u => u.id !== id))
        }
    }, (error) => {
        alert(error)
    })
}

export default UserList