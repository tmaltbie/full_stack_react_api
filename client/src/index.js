import React from 'react';
import ReactDOM from 'react-dom';

import './styles/global.css';

import { Provider } from './Context';
import App from './App';


ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById('root')
);
