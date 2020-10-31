import React from 'react'

import Courses from './components/Courses'
import Header from './components/Header'

function App() {
    return (
        <div>
            <Header />
            <hr>
                <div className="bounds">
                    <Courses />
                </div>
            </hr>
        </div>
    );
}

export default App;
