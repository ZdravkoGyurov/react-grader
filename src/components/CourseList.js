import React from 'react';
import '../styles/CourseList.css';
import Course from './Course';
import { getAccessToken } from '../userIdentity';
import { withRouter } from 'react-router'

class CourseList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            error: null,
            isLoaded: false,
            courses: [],
            redirect: this.props.loggedInUser
        };

        if (!this.redirect) {
            this.props.history.push({ pathname: `/sign-in` });
        }
    }

    componentDidMount() {
        if (this.state.redirect) {
            fetch('http://localhost:8080/api/courses', {
                method: 'GET',
                headers: new Headers({
                    'Authorization': `Bearer ${getAccessToken()}`
                })
            })
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        courses: result
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            );
        }
    }

    render() {
        if (this.state.error) {
            return <div>Error: {this.state.error.message}</div>;
        } else if (!this.state.isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
                <div className="Courses-wrapper">
                    {this.state.courses.map(course => <Course course={course} key={course.id}/>)}
                </div>
            );
        }
    }
}

export default withRouter(CourseList);