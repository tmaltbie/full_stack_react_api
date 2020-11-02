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
                {/* <CourseDetail />
                <CreateCourse />
                <UpdateCourse />

                <UsersSignUp />
                <UsersSignIn />
                <UserSignOut /> */}
            </Switch>
        </div>
    </Router>
}
