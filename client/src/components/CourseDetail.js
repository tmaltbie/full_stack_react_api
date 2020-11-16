import React, { Component } from 'react'
import { Link, NavLink } from 'react-router-dom';
import ReactMarkdown from "react-markdown";
// import axios from 'axios'
// import config from '../config'

export default class CourseDetail extends Component {
    // state = {
    //     courses: []
    // }

    state = {
        course: {
            user: {},
            materialsNeeded: {}
        },
        errors: []
    }

    // http://localhost:5000/api/courses/
    // componentDidMount() {
    //     const { id } = this.props.match.params 
        
    //     axios.get(`${config.apiBaseUrl}/courses/${id}`)
    //         .then(res => {
    //             this.setState({
    //                 courses: res.data
    //             })
    //         })
    //         .catch(err => {
    //             console.log("Error fetching & parsing data!", err)
    //         });   
    // }


    componentDidMount() {
        const { id } = this.props.match.params;
        const { context } = this.props;

        context.data.detCourseDetails(id).then((response => {
            if (response){
                this.setState({
                    courseDetail: response,
                    user: response.user,
                    materialsNeeded: response.materialsNeeded
                });
            } else {
                this.props.history.push("/error");
            }
        })).catch(error => {
            console.log(error);
        });
    }

    userIsAuthenticated (authenticatedUser, user) {
        return authenticatedUser.emailAddress === user.emailAddress
    }

    deleteCourse = () => {
        const { context } = this.props;
        const {
            course,
        } = this.state;
    
        const user = course.user;

        const { password } = context.authenticatedUser;
        context.data.deleteCourse(course.id, user.emailAddress, password)
            .then( errors => {
                if (errors.length > 0){
                    console.log(errors);
                } else {
                    this.props.history.push('/');
                }
            }).catch(errors => {
                console.log(errors)
            });

    }
    
    render() {
        // const course = this.state.courses
        // const userData = {...course}
        const {
            course,
        } = this.state;

        const { user } = course;
        const { materialsNeeded } = course;
        const { context } = this.props;
        const { authenticatedUser } = context;
        const courseId = this.props.match.params.id;

        return (
            <div>
                <div className="action--bar">
                    <div className="bounds">
                        <div className="grid-100">
                        <span>{this.userIsAuthenticated(authenticatedUser, user) ? (
                            <React.Fragment>
                                <NavLink className="button" to={`/courses/${courseId}/update`}>Update Course</NavLink>
                                <button className="button" onClick={this.deleteCourse}>Delete Course</button>
                            </React.Fragment>
                        ) : <hr/> }
                        </span>
                            <Link className="button button-secondary" to="/">Return to List</Link>
                        </div>
                    </div>
                </div>
                <div className="bounds course--detail">
                    <div className="grid-66">
                        <div className="course--header">
                            <h4 className="course--label"> Course </h4>
                            <h3 className="course--title"> {course.title} </h3>
                            <h3> By {user.firstName} {user.lastName} </h3>
                        </div>
                        <div className="course--description">
                            <p> {course.description} </p>
                        </div>
                    </div>
                    <div className="grid-25 grid-right">
                        <div className="course--stats">
                            <ul className="course--stats--list">
                                <li className="course--stats--list--item">
                                    <h4>Estimated Time</h4>
                                    <h3> {course.estimatedTime} </h3>
                                </li>

                                <li className="course--stats--list--item">
                                    <h4>Materials Needed</h4>
                                    <ReactMarkdown> {materialsNeeded} </ReactMarkdown>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

        );
    }

}