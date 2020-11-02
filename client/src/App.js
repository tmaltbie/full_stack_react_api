import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom;'

import Header from './components/Header'
import Courses from './components/Courses'
import CourseDetail from './components/CourseDetail'
import CreateCourse from './components/CreateCourse'
import UpdateCourse from './components/UpdateCourse'
import UsersSignUp from './components/UsersSignUp'
import UsersSignIn from './components/UsersSignIn'
import UserSignOut from './components/UserSignOut'




export default function App() {
    <Router>
        <div>
            <Header />

            <Switch>
                <Route exact path="/" component={Courses} />
                <Route path="/courses/create" component={CreateCourse} />
                <Route path={'/courses/:id/update'} component={UpdateCourse} />
                <Route path ={'/courses/:id'} component={CourseDetail} />

                <Route path="/signin" component={UsersSignIn} />
                <Route path="/singup" component={UsersSignUp} />
                <Route path="/signout" component={UserSignOut} />
            </Switch>
        </div>
    </Router>
}
