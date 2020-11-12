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
import PrivateRoute from './PrivateRoute'
import NotFound from './components/NotFound'
import withContext from './Context'

const HeaderWithContext = withContext(Header);
// CoursesWithContext = withContext(Courses);
// CourseDetailWithContext = withContext(CourseDetail);
// CreateCourseWithContext = withContext(CreateCourse);
// UpdateCourseWithContext = withContext(UpdateCourse);
const UserSignUpWithContext = withContext(UserSignUp); 
// UserSignInWithContext = withContext(UserSignIn);
// UserSignOutWithContext = withContext(UserSignOut);

export default function App() {
    return (
        <Router>
            <div>
                <Header />
                <hr/>
                    <Switch>
                        <Route exact path="/" component={Courses} />
                        {/* <Route path="/authenticated" component={Authenticated} /> */}
                        <Route path="/courses/create" component={CreateCourse} />
                        <Route path={'/courses/:id/update'} component={UpdateCourse} />
                        <Route path='/courses/:id' component={CourseDetail} />
                        <Route path="/signin" component={UserSignIn} />
                        <Route path="/signup" component={UserSignUpWithContext} />
                        <Route path="/signout" component={UserSignOut} />
                        <Route component={NotFound} />
                    </Switch>
            </div>
        </Router>
    )
}
