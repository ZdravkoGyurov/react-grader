import { TableContainer } from "@material-ui/core";
import { TableHead } from "@material-ui/core";
import { List, Typography } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import send from "../api/api";
import { getAccessToken, isAuthorized } from '../userIdentity';
import Submission from "./Submission";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import { TableRow } from "@material-ui/core";
import TableCell from '@material-ui/core/TableCell';

const SubmissionList = ({loggedInUser}) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [submissions, setSubmissions] = useState([]);
    const [error, setError] = useState(null);
    const [isMounted, setIsMounted] = useState(false);
    let history = useHistory();
    
    useEffect(() => {
        setIsMounted(true);
        if (!loggedInUser || !isAuthorized('READ_ALL_SUBMISSIONS')) {
            history.push('/sign-in');
        }

        getSubmissions(isMounted, setIsLoaded, setSubmissions, setError)
        return () => { setIsMounted(false); }
    }, [isMounted, history, loggedInUser]);

    const handleDeleteSubmission = (id) => {
        deleteSubmission(isMounted, submissions, setSubmissions, id);
    }

    if (!isLoaded) {
        return <div>Loading...</div>
    }
    if (error) {
        return <div>{ error }</div>
    }
    return (
        <div>
            <Typography variant="h4" component="h2">
            All Submissions
            </Typography>
            <TableContainer>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>User Id</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Results</TableCell>
                            <TableCell>Delete submission</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {submissions.map(s => <Submission key={s.id} submission={s} deleteSubmission={handleDeleteSubmission}/>)}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

function getSubmissions(isMounted, setIsLoaded, setSubmissions, setError) {
    send({
        url: 'http://localhost:8080/api/submissions/all',
        method: 'GET',
        headers: new Headers({
            'Authorization': `Bearer ${getAccessToken()}`
        }),
        data: null,
        expectedStatusCode: 200
    }, (result) => {
        if (isMounted) {
            setSubmissions(result);
            setIsLoaded(true);
        }
    }, (error) => {
        if (isMounted) {
            setError(error);
            setIsLoaded(true);
        }
    })
}

function deleteSubmission(isMounted, submissions, setSubmissions, id) {
    send({
        url: `http://localhost:8080/api/submissions/${id}`,
        method: 'DELETE',
        headers: new Headers({
            'Authorization': `Bearer ${getAccessToken()}`
        }),
        data: null,
        expectedStatusCode: 204
    }, (result) => {
        if (isMounted) {
            const newSubmissions = [...submissions];
            setSubmissions(newSubmissions.filter(s => s.id !== id));
        }
    }, (error) => {
        alert(error);
    })
}

export default SubmissionList;