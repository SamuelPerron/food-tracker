import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import './App.scss'
import Login from './Login/Login';
import Profile from '../components/User/Profile/Profile';
import * as actionTypes from '../store/actionTypes';


const App = props => {
    useState(() => {
        const lsUser = localStorage.getItem('user');
        const lsToken = localStorage.getItem('token');
        if (lsUser && lsToken) {
            props.onLoginSuccessful(lsToken, JSON.parse(lsUser));
        }
    }, []);

    const logout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        props.onLogout()
    }

    return (
        <div className="App">
            <Login />

            { props.user !== null ?
                <>
                    <span onClick={logout}>Logout</span>
                    <Profile />
                </>
            : null }
        </div>
    );
}

const mapDispatchToProps = dispatch => {
    return {
        onLoginSuccessful: (token, user) => dispatch({type: actionTypes.SET_TOKEN, token, user}),
        onLogout: (token, user) => dispatch({type: actionTypes.UNSET_TOKEN}),
    };
};

const mapStateToProps = state => {
    return {
        user: state.user,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
