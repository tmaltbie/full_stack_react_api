import React, { Component } from 'react';
import Data from './Data';
import Cookies from 'js-cookie';

export const Context = React.createContext(); 

export class Provider extends Component {

    state = {
        authenticatedUser: Cookies.getJSON('authenticatedUser') || null,
        // courses: null
    };

    constructor() {
        super();
        this.data = new Data();
    }

    render() {
        const { authenticatedUser } = this.state;
        const { courses } = this.state;
        
        const value = {
            authenticatedUser,
            courses,
            data: this.data,
            actions: { // Add the 'actions' property and object
                signIn: this.signIn,
                signOut: this.signOut
            },
        };

        
        return (
            <Context.Provider value={ value }>
                {this.props.children}
            </Context.Provider>
        )
    }

    /**
     * Handles sign in of auth'd user w/ equivalent GET request of API
     * @param {string} emailAddress - users email
     * @param {string} password - users password
     */
    signIn = async (emailAddress, password) => {
        const user = await this.data.getUser(emailAddress, password);
        if (user !== null) {
            user.password = password;
            this.setState(() => {
                return {
                    authenticatedUser: user,
                };
            });
            Cookies.set('authenticatedUser', JSON.stringify(user), { expires: 1 });
        }
        return user;
    }

    /* removes name and username properties from state: user is no longer auth'd  */
    signOut = () => {
        this.setState({ authenticatedUser: null });
        Cookies.remove('authenticatedUser');
    }

}

export const Consumer = Context.Consumer;

/**
 * A higher-order component that wraps the provided component in a Context Consumer component.
 * @param {class} Component - A React component.
 * @returns {function} A higher-order component.
 */

export default function withContext(Component) {
    return function ContextComponent(props) {
        return (
            <Context.Consumer>
                {context => <Component {...props} context={context} />}
            </Context.Consumer>
        )
    }
}