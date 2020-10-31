import React from 'react'

import Header from './components/Header'
import Courses from './components/Courses'
import CourseDetail from './components/CourseDetail'
import CreateCourse from './components/CreateCourse'
import UpdateCourse from './components/UpdateCourse'
import UsersSignUp from './components/UsersSignUp'
import UsersSignIn from './components/UsersSignIn'
import UserSignOut from './components/UserSignOut'




function App() {
    return (
        <div>
            <Header />

            <Courses />
            <CourseDetail />
            <CreateCourse />
            <UpdateCourse />

            <UsersSignUp />
            <UsersSignIn />
            <UserSignOut />
            
        </div>
    );
}

export default App;
