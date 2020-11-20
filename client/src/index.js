import React from 'react';
import ReactDOM from 'react-dom';
import './styles/global.css';
import App from './App';
import { Provider } from './Context';

ReactDOM.render(
    <Provider>
        <React.StrictMode>
            <App />
        </React.StrictMode>
    </Provider>, document.getElementById('root')
);
