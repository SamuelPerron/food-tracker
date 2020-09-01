import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

import * as actionTypes from '../../../store/actionTypes';


const Navbar = props => {
    const logout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        props.onLogout()
    }

    return (
        <nav>
            <ul>
                <li><NavLink to="/recipes" exact>Recipes</NavLink></li>

                { props.user ?
                    <>
                        <li><NavLink to={'/user/' + props.user.pk} exact>{props.user.username}</NavLink></li>
                        <li><span onClick={logout}>Sign out</span></li>
                    </>
                :
                    <>
                        <li><NavLink to="/login" exact>Sign in</NavLink></li>
                        <li><NavLink to="/register" exact>Sign up</NavLink></li>
                    </>
                }
            </ul>
        </nav>
    );
}

const mapDispatchToProps = dispatch => {
    return {
        onLogout: (token, user) => dispatch({type: actionTypes.UNSET_TOKEN}),
    };
};

const mapStateToProps = state => {
    return {
        user: state.user,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
