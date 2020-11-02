import React from 'react'

import UsersSignIn from './UsersSignIn'
import UsersSignUp from './UsersSignUp'

function Header() {
    return (
        <div>
        <div className="header">
            <div className="bounds">
                <h1 className="header--logo">Courses</h1>
                <nav> 
                    <a className="signup" href="sign-up.html"> <UsersSignUp /> </a>
                    <a className="signin" href="sign-in.html"> <UsersSignIn /> </a>
                </nav>
            </div>
        </div>
        </div>
    )
}

export default Header;