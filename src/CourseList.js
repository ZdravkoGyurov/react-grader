import React from 'react';
import './CourseList.css';
import Course from './Course';

class CourseList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            courses: []
        };
    }

    componentDidMount() {
        fetch('http://localhost:8080/api/courses', {
            method: 'get',
            headers: new Headers({
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwY2Y3YjQ5ZDliZjA2MjhjYzZkNWIzMCIsImlhdCI6MTYyNDM5MDg1NiwiZXhwIjoxNjI0NDc3MjU2fQ.vUBDxdm9A9W85PYMSFOyMGiEdj7EwKekfNjfFGlgKxY'
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
        )
    }

    render() {
        if (this.state.error) {
            return <div>Error: {this.state.error.message}</div>;
        } else if (!this.state.isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
                <div className="courses-wrapper">
                    {this.state.courses.map(course => <Course course={course} key={course.id}/>)}
                </div>
            );
        }
    }
}

export default CourseList;