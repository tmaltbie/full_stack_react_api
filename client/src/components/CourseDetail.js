import React, { Component } from 'react'
import axios from 'axios'
import apiBaseUrl from '../config'

export default class CourseDetail extends Component {
    constructor() {
        super()
        this.state = {
            courses: []
        };
    }

   
    componentDidMount() {
        const { id } = this.props.match.params
        
        axios.get(`http://localhost:5000/api/courses/`)
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

        let owner = courses.map(course => course.User)
        console.log(owner)

        return (
            <div>
                <div className="actions--bar">
                    <div className="bounds">
                        <div className="grid-100"><span><a className="button" href="update-course.html">Update Course</a><a className="button" href="#">Delete Course</a></span><a
                            className="button button-secondary" href="index.html">Return to List</a></div>
                        </div>
                    </div>
                    { courses.map(course => 
                         
                        <div className="bounds course--detail">
                        <div className="grid-66">
                            <div className="course--header">
                            <h4 className="course--label">Course</h4>
                            <h3 className="course--title">{course.title}</h3>
                            <p>By {course.user?.firstName}</p>
                            </div>
                            <div className="course--description">
                                <p>{course.description}</p>
                            </div>
                        </div>
                        <div className="grid-25 grid-right">
                            <div className="course--stats">
                                <ul className="course--stats--list">
                                    <li className="course--stats--list--item">
                                        <h4>Estimated Time</h4>
                                        <h3>{course.estimatedTime}</h3>
                                    </li>
                                    <li className="course--stats--list--item">
                                        <h4>Materials Needed</h4>
                                        <ul>
                                            {course.materialsNeeded}
                                        </ul>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>       
                                )}
                    
                </div>
        )
    }
}