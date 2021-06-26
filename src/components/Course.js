import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import { isAuthorized } from '../userIdentity';

const useStyles = makeStyles({
    root: {
      maxWidth: 345,
    },
    media: {
      height: 140,
    },
});

export default function Course({ course, loggedInUser, ...rest }) {
    const classes = useStyles();
    const canEditCourse = isAuthorized('UPDATE_COURSE');
    const canDeleteCourse = isAuthorized('DELETE_COURSE');

    const handleEditCourse = () => {
        
    }
    
    return (
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
                <Button size="small" color="primary">Learn More</Button>
                {canEditCourse ? (
                    <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    startIcon={<EditIcon />}
                    onClick={handleEditCourse}
                    >
                    Edit
                    </Button>) : null
                }
                
                {canDeleteCourse ? (
                    <Button
                        variant="contained"
                        color="secondary"
                        className={classes.button}
                        startIcon={<DeleteIcon />}
                    >
                    Delete
                    </Button>) : null
                }
            </CardActions>
            
        </Card>
    );
}