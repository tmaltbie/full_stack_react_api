import React, { Component } from 'react'
import Form from './Form'

export default class CreateCourse extends Component {
    state = {
        userId: "",
        firstName: "",
        lastName: "",
        emailAddress: "",
        password: "joepassword",
        title: "",
        description: "",
        estimatedTime: "",
        materialsNeeded: "",
        errors: [],
    }

    componentDidMount() {
        const { context } = this.props;
        this.setState({
            userId: context.authenticatedUser.id,
            firstName: context.authenticatedUser.firstName,
            lastName: context.authenticatedUser.lastName,
            emailAddress: context.authenticatedUser.emailAddress,
            password: context.authenticatedUser.password,
        })
    }

    cancel = () => {
        this.props.history.push('/')
    }

    // request to create a new course
    submit = () => {
        const { context } = this.props;
        
        const {
            userId,
            firstName,
            lastName,
            emailAddress,
            password,
            title,
            description,
            estimatedTime,
            materialsNeeded,
            errors
        } = this.state

        const createdCourse = { userId, title, description, estimatedTime, materialsNeeded };

        context.data.createCourse(createdCourse, emailAddress, password)
            .then( errors => {
                if (errors.length > 0) {
                    this.setState({ errors: errors })
                } else {
                    this.props.history.push('/')
                }
            }).catch(error => {
                console.log(error);
            })
    }

    onChange = (event) => {
        const fieldName = event.target.name;
        const fieldValue = event.target.value;
        
        this.setState({
            [fieldName]: fieldValue
        })
    }
    
    render() {

        const {
            firstName,
            lastName,
            errors
        } = this.state;

        return(
            <div>
                <div className="bounds course--detail">
                    <h1>Create Course</h1>
                    <div>
                        <Form 
                            cancel={this.cancel}
                            submit={this.submit}
                            submitButtonText="Create Course"
                            errors={errors}
                            elements={() => (
                                <React.Fragment>
                                    <div className="grid-66">
                                        <div className="course--header">
                                            <h4 className="course--label">Course</h4>
                                            <div><input 
                                                id="title" 
                                                name="title"
                                                type="text"
                                                className="input-title course--title--input"
                                                placeholder="Course title..."
                                                onChange={this.onChange}/>
                                            </div>
                                            <p>By {firstName} {lastName}</p>
                                            </div>
                                            <div className="course--description">
                                                <div>
                                                    <textarea 
                                                        id="description"
                                                        name="description"
                                                        className=""
                                                        placeholder="Course description..."
                                                        onChange={this.onChange}>
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
                                                            <input
                                                                id="estimatedTime"
                                                                name="estimatedTime"
                                                                type="text"
                                                                className="course--time--input"
                                                                placeholder="Hours"
                                                                onChange={this.onChange}/>
                                                        </div>
                                                    </li>
                                                    <li className="course--stats--list--item">
                                                        <h4>Materials Needed</h4>
                                                        <div>
                                                            <textarea
                                                                id="materialsNeeded"
                                                                name="materialsNeeded"
                                                                className=""
                                                                placeholder="List materials..."
                                                                onChange={this.onChange}>
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
            </div>
        )}

}