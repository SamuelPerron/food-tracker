import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Redirect, Switch, Route } from 'react-router-dom';
import axios from 'axios';
import AOS from 'aos';
import 'aos/dist/aos.css';

import '../styles/App.scss'

import Login from './Login/Login';
import Signup from './Signup/Signup';
import RecipeListPage from './Recipe/RecipeListPage';
import BookmarkedRecipeList from './Recipe/BookmarkedRecipeList';
import RecipeDetailsPage from './Recipe/RecipeDetailsPage';
import Profile from './Profile/Profile';
import Header from '../components/UI/Header/Header';
import RecipeForm from './Recipe/RecipeForm';

import * as actionTypes from '../store/actionTypes';


const App = props => {
    AOS.init()
    const [user, setUser] = useState(null);

    const findUser = () => {
        axios.get(props.api + 'users/user_by_token/?token=' + props.token)
        .then(r => {
            setUser(r.data);
        })
        .catch(e => {
            console.log(e);
        });
    }

    useEffect(() => {
        const lsToken = localStorage.getItem('token');
        if (lsToken) {
            props.onSessionFound(lsToken);
        }
    }, []);

    useEffect(() => {
        if (props.token) {
            findUser();
        } else {
            setUser(null);
        }
    }, [props.token]);

    return (
        <BrowserRouter basename="/">
            <div className="App">
                <Header user={user}/>

                <Switch>
                    <Route path="/recipes" exact component={RecipeListPage} />
                    <Route path="/recipes/new" exact component={RecipeForm} />
                    <Route path="/recipes/:slug" exact component={RecipeDetailsPage} />
                    <Route path="/bookmarks" exact component={BookmarkedRecipeList} />

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
        onSessionFound: token => dispatch({type: actionTypes.SET_TOKEN, token}),
    };
};

const mapStateToProps = state => {
    return {
        api: state.apiBaseURL,
        token: state.token
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(App);
