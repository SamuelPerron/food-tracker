import React from 'react';

import './App.scss'
import Login from './Login/Login';
import Profile from '../components/User/Profile/Profile';

function App() {
    return (
        <div className="App">
            <Login />

            <Profile />
        </div>
    );
}

export default App;
