import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import Form from './Form';

export default class UserSignUp extends Component {

    state = {
        firstName: '',
        lastName: '',
        emailAddress: '',
        password: '',
        confirmPassword: '',
        errors: [],
    }

    render() {
        const {
            firstName,
            lastName,
            emailAddress,
            password,
            confirmPassword,
            errors,
        } = this.state

        return (
            <div className="bounds">
                <div className="grid-33 centered signin">
                    <h1>Sign Up</h1>
                    <Form 
                        cancel={this.cancel}
                        errors={errors}
                        submit={this.submit}
                        submitButtonText="Sign Up"
                        elements={() => (
                            <React.Fragment>
                                <input 
                                    id="firstName" 
                                    name="firstName" 
                                    type="text"
                                    value={firstName} 
                                    onChange={this.change} 
                                    placeholder="First Name" />
                                <input 
                                    id="lastName" 
                                    name="lastName" 
                                    type="text"
                                    value={lastName} 
                                    onChange={this.change} 
                                    placeholder="Last Name" />
                                <input 
                                    id="emailAddress" 
                                    name="emailAddress" 
                                    type="text"
                                    value={emailAddress} 
                                    onChange={this.change} 
                                    placeholder="Email Address" />
                                <input 
                                    id="password" 
                                    name="password"
                                    type="password"
                                    value={password} 
                                    onChange={this.change} 
                                    placeholder="Password" />
                                <input 
                                    id="confirmPassword" 
                                    name="confirmPassword"
                                    type="password"
                                    value={confirmPassword} 
                                    onChange={this.change} 
                                    placeholder="Confirm Password" />
                            </React.Fragment>
                        )} />
                    <p>&nbsp;</p>
                    <p>Already have a user account? <Link to="/signin">Click here</Link> to sign in!</p>
                </div>
            </div>
        )
    }

    change = (event) => {
        const name = event.target.name;
        const value = event.target.value;
    
        this.setState(() => {
            return {
                [name]: value
            };
        });
    }

    submit = () => {
        const { context } = this.props

        // deconstruct state for simpler access
        const {
            firstName,
            lastName,
            emailAddress,
            password,
            confirmPassword,
        } = this.state;

        // New user
        const user = {
            firstName: firstName,
            lastName: lastName,
            emailAddress: emailAddress,
            password: password,
            confirmPassword: confirmPassword,
        };

        if (password !== confirmPassword) {
            this.setState({
                errors: ["Passwords do not match"]
            });
        } else {
            context.data.createUser(user)
                .then( errors => {
                    if (errors.length) {
                        this.setState({ errors });
                    } else {
                        context.actions.signIn(emailAddress, password)
                            .then(() => {
                                this.props.history.push('/');
                            });
                        console.log(`${firstName} ${lastName} is successfully signed up and authenticated with ${emailAddress}!`)
                    }
                })
                .catch( err => { // handle rejected promises
                    console.log(err)
                    this.props.history.push('/error') // push to history stack (change url)
                });
        }

    }

    cancel = () => {
        this.props.history.push('/');
    }
}






///////////////////////////////////
///////////////////////////////////
///////////////////////////////////
/////// NOTES /////////////////////
/////// FOR REFACTOR //////////////
///////// TO HOOKS ////////////////
/////////// AT LATER //////////////
//////////// DATE /////////////////
///////////////////////////////////
/* 

NOTES FOR HOOK REFACTOR LATER:

// REFACTOR TO USE HOOKS?
// function UserSignUp(props) {
//     const { context } = props

//     const [ user, setUser ] = useState({
//         firstName: '',
//         lastName: '',
//         emailAddress: '',
//         password: '',
//         confirmPassword: ''
//     });

//     const [ errors, setErrors ] = useState([])

//     const change = (event) => {
//         const name = event.target.name;
//         const value = event.target.value;
//         setUser({...user,...{ [name]: value } });
//     }

//     const submit = () => {

//     }

*/