import React from 'react'

import UsersSignUp from './UsersSignUp'
import UsersSignIn from './UsersSignIn'

function Header() {
    return (
        <div className="header">
            <div className="bounds">
                <h1 className="header--logo">Courses</h1>
                <nav> 
                    <UsersSignUp />
                    <UsersSignIn />
                </nav>
            </div>
        </div>
    )
}

export default Header;