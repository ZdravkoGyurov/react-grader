import { Button, List, Typography } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import send from "../api/api";
import { getAccessToken } from '../userIdentity';
import PermissionsRequest from "./PermissionsRequest";
import AddIcon from '@material-ui/icons/Add';
import CreatePermissionsRequestDialog from "./CreatePermissionsRequestDialog";

const PermissionsRequestsList = ({loggedInUser}) => {
    const [isLoaded, setIsLoaded] = useState(false)
    const [requests, setRequests] = useState([])
    const [error, setError] = useState(null)
    const [isMounted, setIsMounted] = useState(false)
    const [createOpen, setCreateOpen] = useState(false)
    let history = useHistory()

    useEffect(() => {
        setIsMounted(true)
        if (!loggedInUser || (loggedInUser.permissions && loggedInUser.permissions.includes('READ_PERMISSIONSREQUESTS'))) {
            history.push('/sign-in')
        }

        getPermissionsRequests(isMounted, setIsLoaded, setRequests, setError)
        return () => { setIsMounted(false) }
    }, [isMounted, history, loggedInUser])

    const handleOpenCreateDialog = () => {
        setCreateOpen(true)
    }
    const handleCreateRequest = (request, handleCloseDialog) => {
        createRequest(isMounted, requests, setRequests, request, handleCloseDialog)
    }

    const handleDeleteRequest = (id) => {
        deletePermissionsRequest(isMounted, requests, setRequests, id)
    }

    if (!isLoaded) {
        return <div>Loading...</div>
    }
    if (error) {
        return <div>{ error }</div>
    }
    return (
        <div>
            <Typography variant="h4">
                Requests for permissions
            </Typography>
            <Button
                sx={{ pt: 3 }}
                variant="contained"
                color="primary"
                startIcon={<AddIcon />}
                onClick={handleOpenCreateDialog}
            >
                Create
            </Button>
            <List>{requests.map(r => <PermissionsRequest key={r.id} request={r} deleteRequest={handleDeleteRequest}/>)}</List>
            <CreatePermissionsRequestDialog open={createOpen} setOpen={setCreateOpen} createRequest={handleCreateRequest}/>
        </div>
    )
}

function createRequest(isMounted, requests, setRequests, request, handleCloseDialog) {
    send({
        url: `http://localhost:8080/api/permissionsRequests`,
        method: 'POST',
        headers: new Headers({
            'Authorization': `Bearer ${getAccessToken()}`,
            'Content-Type': 'application/json'
        }),
        data: request,
        expectedStatusCode: 200
    }, (result) => {
        if (isMounted) {
            const newRequests = [...requests]
            newRequests.push(result)
            setRequests(newRequests)
            handleCloseDialog()
        }
    }, (error) => {
        alert(error)
    })
}

function getPermissionsRequests(isMounted, setIsLoaded, setRequests, setError) {
    send({
        url: 'http://localhost:8080/api/permissionsRequests',
        method: 'GET',
        headers: new Headers({
            'Authorization': `Bearer ${getAccessToken()}`
        }),
        data: null,
        expectedStatusCode: 200
    }, (result) => {
        if (isMounted) {
            setRequests(result)
            setIsLoaded(true)
        }
    }, (error) => {
        if (isMounted) {
            setError(error)
            setIsLoaded(true)
        }
    })
}

function deletePermissionsRequest(isMounted, requests, setRequests, id) {
    send({
        url: `http://localhost:8080/api/permissionsRequests/${id}`,
        method: 'DELETE',
        headers: new Headers({
            'Authorization': `Bearer ${getAccessToken()}`
        }),
        data: null,
        expectedStatusCode: 204
    }, (result) => {
        if (isMounted) {
            const newRequests = [...requests]
            setRequests(newRequests.filter(r => r.id !== id))
        }
    }, (error) => {
        alert(error)
    })
}

export default PermissionsRequestsList