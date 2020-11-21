import React, { Component } from 'react'
import { Link, NavLink } from 'react-router-dom';
import ReactMarkdown from "react-markdown";
// import axios from 'axios'
// import config from '../config'

export default class CourseDetail extends Component {
    state = {
        courseDetail: {
            user: {},
            materialsNeeded: {}
        },
        errors: []
    }

    componentDidMount() {
        const { id } = this.props.match.params;
        const { context } = this.props;

        context.data.detCourseDetails(id).then((response => {
            if (response){
                this.setState({
                    courseDetail: response,
                    title: response.title,
                    description: response.description,
                    estimatedTime: response.estimatedTime,
                    materialsNeeded: response.materialsNeeded,
                    user: response.User,
                    email: response.User.emailAddress
                });
            } else {
                this.props.history.push("/error");
            }
        })).catch(error => {
            console.log(error);
        });
    }

    userIsAuthenticated (authenticatedUser, email) {
        return authenticatedUser.emailAddress === email
    }

    deleteCourse = () => {
        const { context } = this.props;
        const {
            courseDetail,
        } = this.state;
    
        const user = courseDetail.User;
        const password = context.authenticatedUser.password;

        context.data.deleteCourse(courseDetail.id, user.emailAddress, password)
            .then( errors => {
                if (errors.length > 0) {
                    this.setState({ errors: errors })
                } else {
                    this.props.history.push('/');
                }
            }).catch(errors => {
                console.log(errors)
            });

    }
    
    render() {
        const {
            courseDetail,
        } = this.state;

        const user = courseDetail;
        const materialsNeeded = `${courseDetail.materialsNeeded}`;
        const {context} = this.props;
        const {authenticatedUser} = context;
        const courseId = this.props.match.params.id;
        const email = this.state.email
        const materials = `${courseDetail.materialsNeeded}`
        const description = `${courseDetail.description}`
        
        return (
            <div>
                <div className="action--bar">
                    <div className="bounds">
                        <div className="grid-100">
                        <span>{this.userIsAuthenticated(authenticatedUser, email) ? (
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
                            <h3 className="course--title"> {courseDetail.title} </h3>
                            <h3> By {courseDetail.User?.firstName} {courseDetail.User?.lastName} </h3>
                        </div>
                        <div className="course--description">
                            
                                <ReactMarkdown source={description} />
                            
                        </div>
                    </div>
                    <div className="grid-25 grid-right">
                        <div className="course--stats">
                            <ul className="course--stats--list">
                                <li className="course--stats--list--item">
                                    <h4>Estimated Time</h4>
                                    <h3> {courseDetail.estimatedTime} </h3>
                                </li>
                                <li className="course--stats--list--item">
                                    <h4>Materials Needed</h4>
                                     <ReactMarkdown source={materialsNeeded || ""} /> 
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}