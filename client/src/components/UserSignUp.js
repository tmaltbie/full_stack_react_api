import React, { Component } from 'react'
import { Link } from 'react-router-dom';

export default class UserSignUp extends Component {

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
            <div class="bounds">
                <div class="grid-33 centered signin">
                    <h1>Sign Up</h1>
                    <div>

                        <div>

                        </div>     

                        <form>
                            <div><input id="firstName" name="firstName" type="text" className="" placeholder="First Name" value=""/></div>
                            <div><input id="lastName" name="lastName" type="text" className="" placeholder="Last Name" value=""/></div>
                            <div><input id="emailAddress" name="emailAddress" type="text" className="" placeholder="Email Address" value=""/></div>
                            <div><input id="password" name="password" type="password" className="" placeholder="Password" value=""/> </div>
                            <div><input id="confirmPassword" name="confirmPassword" type="password" className="" placeholder="Confirm Password"
                                value=""/></div>
                            <div className="grid-100 pad-bottom"><button class="button" type="submit">Sign Up</button><Link className="button button-secondary" to="/">Cancel</Link></div>
                        </form>
                    </div>
                    <p>&nbsp;</p>
                    <p>Already have a user account? <Link to="/">Click here</Link> to sign in!</p>
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
        const { context } = this.state

        const {
            firstName,
            lastName,
            emailAddress,
            password,
            confirmPassword,
        } = this.state;

        // New user
        const user = {
            firstName,
            lastName,
            emailAddress,
            password,
        } 

        context.data.createUser(user)

    }

}



// export default UserSignUp;