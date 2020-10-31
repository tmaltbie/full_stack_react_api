import React, { Component } from 'react';
import axios from 'axios'

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
        return (
            <div>
                <ul>
                    {courses.map(course => <li>{course.title}</li>)}
                </ul>
            </div>
        )
    }
}