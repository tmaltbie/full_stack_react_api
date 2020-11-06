import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default class Courses extends Component {

    constructor() {
        super();
        this.state = {
            courses: []
        };
    }

    componentDidMount() {
        axios.get('http://localhost:5000/api/courses')
            .then(res => {
                this.setState({
                    courses: res.data
                })
            })
            .catch(err => {
                console.log("Error fetching & parsing data!", err)
            });
    }

    
    render() {
        const courses = this.state.courses
        console.log(courses)
        return (
            <div className="bounds">
                {courses.map(course => 
                    <div key={course.id} className="grid-33"><Link className="course--module course--link" to={'/courses/:id'}>
                        <h4 className="course--label">Course</h4>
                        <h3 className="course--title">{course.title}</h3>
                    </Link></div>
                )}
            </div>
        )
    }
}