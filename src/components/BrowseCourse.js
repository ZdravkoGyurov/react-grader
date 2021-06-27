import React from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { Button, CardActions, Grid, makeStyles } from '@material-ui/core';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import { isAuthorized } from '../userIdentity';

const useStyles = makeStyles({
    root: {
      minWidth: 250,
    },
    media: {
      height: 140,
    },
});

export default function BrowseCourse({course, createRequest}) {
    const classes = useStyles();
    const canRequestJoin = isAuthorized('CREATE_COURSESREQUEST')

    const handleRequestJoin = () => {
        createRequest(course.id)
    }

    return (
        <Grid item>
            <Card className={classes.root}>
                <CardActionArea>
                    <CardMedia
                        className={classes.media}
                        image="course_background.jpg"
                        title="Course Image"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" align='left'>
                            {course.name}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            {course.description}
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    {canRequestJoin ? (
                        <Button
                            onClick={handleRequestJoin}
                            startIcon={<PersonAddIcon />}
                        >
                            Join
                        </Button>
                    ) : null}
                </CardActions>
            </Card>
        </Grid>
    );
}