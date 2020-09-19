import React from 'react';
import { useState } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import * as actionTypes from '../../store/actionTypes';

import '../../styles/User/LoginRegister.scss';
import logo from '../../static/icons/logo.png';

const Login = props => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [generalErrorMessage, setGeneralErrorMessage] = useState('');
    const [usernameErrorMessage, setUsernameGeneralErrorMessage] = useState('');
    const [passwordErrorMessage, setPasswordGeneralErrorMessage] = useState('');

    const resetMessages = () => {
        setGeneralErrorMessage('');
        setUsernameGeneralErrorMessage('');
        setPasswordGeneralErrorMessage('');
    }

    const authUser = () => {
        resetMessages();

        axios.post(props.api + 'login/', { username, password })
        .then(r => {
            const token = r.data.token;
            props.onLoginSuccessful(token);
            localStorage.setItem('token', token);
            props.history.push('/');
        })
        .catch(e => {
            const error = e.response.data;
            for (var key in error) {
                switch (key) {
                    case 'username':
                            setUsernameGeneralErrorMessage(error[key]);
                        break;
                    case 'password':
                            setPasswordGeneralErrorMessage(error[key]);
                        break;
                    default:
                        setGeneralErrorMessage(error[key]);
                }
            }
        });
    }

    return (
        <div className="Login">
            <div className="logo">
                <img src={logo} data-aos="zoom-out" data-aos-delay="700"/>
                <h1>Mealtoasty</h1>
            </div>
            <div className="login-form" data-aos="fade-up">
                <div>
                    <div>
                        <span>Username</span>
                        <input value={username} onChange={e => setUsername(e.target.value)} />
                        <span className="error">{usernameErrorMessage}</span>
                    </div>
                    <div>
                        <span>Password</span>
                        <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
                        <span className="error">{passwordErrorMessage}</span>
                    </div>
                    <div className="submit">
                        <button onClick={authUser}>Sign in</button>
                        <span className="error">{generalErrorMessage}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        api: state.apiBaseURL,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onLoginSuccessful: (token, user) => dispatch({type: actionTypes.SET_TOKEN, token, user}),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
