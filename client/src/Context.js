import React, { Component } from 'react';
import Data from './Data';
import Cookies from 'js-cookie';
import config from './config'

export const Context = React.createContext(); 

export class Provider extends Component {

    state = {
        authenticatedUser: Cookies.getJSON('authenticatedUser') || null,
        courses: null
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

    signIn = async (emailAddress, password) => {
        const user = await this.data.getUser(emailAddress, password);
        if (user !== null) {
            this.setState(() => {
                return {
                    authenticatedUser: user,
                };
            });
        }
        return user;
    }

    signOut = () => {
        this.setState({ authenticatedUser: null });
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