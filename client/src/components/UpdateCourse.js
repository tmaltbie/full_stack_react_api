import React, { Component } from 'react'
import Form from "./Form";

export default class UpdateCourse extends Component {
    state = {
        userId:"",
        firstName:"",
        lastName:"",
        emailAddress:"",
        password:"",
        title:"",
        description:"",
        estimatedTime:"",
        materialsNeeded:"",
        errors: []
    }

    componentDidMount() {
        const { context } = this.props;
        this.setState({
            userId: context.authenticatedUser.id,
            firstName : context.authenticatedUser.firstName,
            lastName: context.authenticatedUser.lastName,
            emailAddress: context.authenticatedUser.emailAddress,
            password: context.authenticatedUser.password
        });

        const {id} = this.props.match.params;

        context.data.detCourseDetails(id).then( response => {
            if (response) {
                this.setState({
                        courseId:id,
                        title: response.title,
                        description: response.description,
                        estimatedTime: response.estimatedTime,
                        materialsNeeded: response.materialsNeeded
            });
            }else {
                this.props.history.push("./");
            }
        }).catch( (error) => {
                console.log(error);
            });

    }

    updateCourse = () => {
        const { context } = this.props;
        const { id } = this.props.match.params;
        const {
            userId,
            emailAddress,
            password,
            title,
            description,
            estimatedTime,
            materialsNeeded
        } = this.state;

        const updatedCourse = { userId, title, description, estimatedTime, materialsNeeded };

        context.data.updateCourse(id, updatedCourse, emailAddress, password)
            .then(errors => {
                if(errors.length){
                    this.setState({
                        errors: errors
                    })
                } else {
                    this.props.history.push("./");
                }
            }).catch(errors => {
                console.log(errors)
            });
    }

    cancel = () => {
        this.props.history.push('/')
    }

    onChange = (event) => {
        const fieldName = event.target.name;
        const fieldValue = event.target.value;
        this.setState({
            [fieldName] : fieldValue
        })
    }
    render() {
        const {
            firstName,
            lastName,
            title,
            description,
            estimatedTime,
            materialsNeeded,
            errors
        } = this.state;

        return (
            <div className="bounds course--detail">
                <h1>Update Course</h1>
                <div>
                    <Form cancel={this.cancel} submit={this.updateCourse} submitButtonText="Update Course" errors={errors}
                            elements={() => (
                                <React.Fragment>
                                    <div className="grid-66">
                                        <div className="course--header">
                                            <h4 className="course--label">Course</h4>
                                            <div><input id="title" name="title" type="text"
                                                    className="input-title course--title--input"
                                                    onChange={this.onChange} value={title}/></div>
                                            <p>By {firstName} {lastName}</p>
                                        </div>
                                        <div className="course--description">
                                            <div>
                                                <textarea id="description" name="description"
                                                        className="" onChange={this.onChange} value={description}>
                                                </textarea>
                                            </div>
                                      </div>
                                    </div>
                                    <div className="grid-25 grid-right">
                                        <div className="course--stats">
                                            <ul className="course--stats--list">
                                                <li className="course--stats--list--item">
                                                    <h4>Estimated Time</h4>
                                                    <div>
                                                        <input id="estimatedTime" name="estimatedTime" type="text"
                                                            className="course--time--input" onChange={this.onChange} value={estimatedTime}/>
                                                    </div>
                                                </li>
                                                <li className="course--stats--list--item">
                                                    <h4>Materials Needed</h4>
                                                    <div>
                                                        <textarea id="materialsNeeded" name="materialsNeeded"
                                                            className="" onChange={this.onChange} value={materialsNeeded}>
                                                        </textarea>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </React.Fragment>
                            )}>
                    </Form>
                </div>
            </div>
        )
    }
}

