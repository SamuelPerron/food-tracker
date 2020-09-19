import React from 'react';
import { connect } from 'react-redux';
import { NavLink, Route, Link } from 'react-router-dom';

import * as actionTypes from '../../../../store/actionTypes';

import recipesIcon from '../../../../static/icons/recipes.png';
import bookmarksIcon from '../../../../static/icons/bookmarks.png';
import loginIcon from '../../../../static/icons/login.png';
import logoutIcon from '../../../../static/icons/logout.png';
import registerIcon from '../../../../static/icons/register.png';


const Navbar = props => {
    const logout = () => {
        localStorage.removeItem('token');
        props.onLogout()
    }

    return (
        <nav className={props.open ? 'open' : ''}>
            <ul>
                { props.user ?
                    <li className="user" onClick={props.close}>
                        <NavLink to={'/user/' + props.user.pk} exact>
                            <div className="avatar"><img src={props.user.profile.avatar}/></div>
                            <strong>{props.user.username}</strong>
                        </NavLink>
                    </li>
                : null }

                <Route
                    path='/recipes'
                    children={({ match }) => (
                        <li onClick={props.close} className={match ? 'active' : ''}>
                            <Link to='/recipes'><img src={recipesIcon}/> Recipes</Link>
                        </li>
                    )} />

                { props.user ?
                    <>
                        <Route
                            path='/bookmarks'
                            children={({ match }) => (
                                <li onClick={props.close} className={match ? 'active' : ''}>
                                    <Link to='/bookmarks'><img src={bookmarksIcon}/> Bookmarks</Link>
                                </li>
                            )} />
                        <li onClick={props.close}><a onClick={logout}><img src={logoutIcon}/> Sign out</a></li>
                    </>
                :
                    <>
                        <Route
                            path='/login'
                            children={({ match }) => (
                                <li onClick={props.close} className={match ? 'active' : ''}>
                                    <Link to='/login'><img src={loginIcon}/> Sign in</Link>
                                </li>
                            )} />
                        <Route
                            path='/register'
                            children={({ match }) => (
                                <li onClick={props.close} className={match ? 'active' : ''}>
                                    <Link to='/register'><img src={registerIcon}/> Sign up</Link>
                                </li>
                            )} />
                    </>
                }

                <li className="version">v0.10.5</li>
            </ul>
        </nav>
    );
}

const mapDispatchToProps = dispatch => {
    return {
        onLogout: () => dispatch({type: actionTypes.UNSET_TOKEN}),
    };
};

const mapStateToProps = state => {
    return {
        api: state.apiBaseURL,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
