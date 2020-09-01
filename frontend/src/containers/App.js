import React, { useState } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Redirect, Switch, Route } from 'react-router-dom';

import './App.scss'
import Login from './Login/Login';
import Signup from './Signup/Signup';
import RecipeList from './RecipeList/RecipeList';
import Profile from './Profile/Profile';
import Navbar from '../components/UI/Navigation/Navbar';
import * as actionTypes from '../store/actionTypes';


const App = props => {
    useState(() => {
        const lsUser = localStorage.getItem('user');
        const lsToken = localStorage.getItem('token');
        if (lsUser && lsToken) {
            props.onLoginSuccessful(lsToken, JSON.parse(lsUser));
        }
    }, []);

    return (
        <BrowserRouter basename="/">
            <div className="App">
                <Navbar />

                <Switch>
                    <Route path="/recipes" component={RecipeList} />

                    <Route path="/register" component={Signup} />
                    <Route path="/login" component={Login} />
                    <Route path="/user/:id" component={Profile} />

                    <Redirect from="/" exact to="/recipes" />
                </Switch>
            </div>
        </BrowserRouter>
    );
}

const mapDispatchToProps = dispatch => {
    return {
        onLoginSuccessful: (token, user) => dispatch({type: actionTypes.SET_TOKEN, token, user}),
        onLogout: (token, user) => dispatch({type: actionTypes.UNSET_TOKEN}),
    };
};

export default connect(null, mapDispatchToProps)(App);
