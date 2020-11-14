import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Header from './components/Header'
import Courses from './components/Courses'
import CourseDetail from './components/CourseDetail'
import CreateCourse from './components/CreateCourse'
import UpdateCourse from './components/UpdateCourse'
import UserSignUp from './components/UserSignUp'
import UserSignIn from './components/UserSignIn'
import UserSignOut from './components/UserSignOut'
import NotFound from './components/NotFound'
import Authenticated from './components/Authenticated';

import withContext from './Context'
import PrivateRoute from './PrivateRoute'

const HeaderWithContext = withContext(Header);
const AuthWithContext = withContext(Authenticated);
// const CoursesWithContext = withContext(Courses);
// const CourseDetailWithContext = withContext(CourseDetail);
// const CreateCourseWithContext = withContext(CreateCourse);
// const UpdateCourseWithContext = withContext(UpdateCourse);
const UserSignUpWithContext = withContext(UserSignUp); 
const UserSignInWithContext = withContext(UserSignIn);
const UserSignOutWithContext = withContext(UserSignOut);

export default function App() {
    return (
        <Router>
            <div>
                <HeaderWithContext />
                <hr/>
                    <Switch>
                        <Route exact path="/" component={Courses} />
                        <PrivateRoute path="/authenticated" component={AuthWithContext} />
                        <Route path="/courses/create" component={CreateCourse} />
                        <Route path={'/courses/:id/update'} component={UpdateCourse} />
                        <Route path='/courses/:id' component={CourseDetail} />
                        <Route path="/signin" component={UserSignInWithContext} />
                        <Route path="/signup" component={UserSignUpWithContext} />
                        <Route path="/signout" component={UserSignOutWithContext} />
                        <Route component={NotFound} />
                    </Switch>
            </div>
        </Router>
    )
}
