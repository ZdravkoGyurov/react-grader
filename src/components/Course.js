import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import { useHistory } from "react-router-dom";

const useStyles = makeStyles({
    root: {
      minWidth: 250,
    },
    media: {
      height: 140,
    },
});

export default function Course({ loggedInUser, course }) {
    let history = useHistory();
    const classes = useStyles();

    return (
        <div>
            <Card className={classes.root}>
                <CardActionArea onClick={() => history.push(`/courses/${course.id}`, { course: course })}>
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
            </Card>
        </div>
    );
}