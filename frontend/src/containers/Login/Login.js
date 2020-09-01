import React from 'react';
import { useState } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import * as actionTypes from '../../store/actionTypes';


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
            axios.get(props.api + 'users/?username=' + username)
            .then(r => {
                const user = r.data[0];
                props.onLoginSuccessful(token, user);
                localStorage.setItem('user', JSON.stringify(user));
                localStorage.setItem('token', token);
            });
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
            <h1>Login</h1>
            <ul>
                <li>
                    <span>Username</span>
                    <input value={username} onChange={e => setUsername(e.target.value)} />
                    <span>{usernameErrorMessage}</span>
                </li>
                <li>
                    <span>Password</span>
                    <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
                    <span>{passwordErrorMessage}</span>
                </li>
                <li>
                    <button onClick={authUser}>Login</button>
                    <span>{generalErrorMessage}</span>
                </li>
            </ul>
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
