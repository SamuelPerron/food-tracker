import React from 'react';
import { useState } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import * as actionTypes from '../../store/actionTypes';


const Signup = props => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [generalErrorMessage, setGeneralErrorMessage] = useState('');
    const [usernameErrorMessage, setUsernameGeneralErrorMessage] = useState('');
    const [passwordErrorMessage, setPasswordGeneralErrorMessage] = useState('');
    const [emailErrorMessage, setEmailGeneralErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const resetMessages = () => {
        setGeneralErrorMessage('');
        setUsernameGeneralErrorMessage('');
        setPasswordGeneralErrorMessage('');
        setEmailGeneralErrorMessage('');
    }

    const resetFields = () => {
        setUsername('');
        setEmail('');
        setPassword('');
        setRepeatPassword('');
    }

    const registerUser = () => {
        resetMessages();

        if (password === repeatPassword) {
            axios.post(props.api + 'users/', { username, password, email }, )
            .then(r => {
                resetFields();
                setSuccessMessage('User created, you can now login.');
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
                        case 'email':
                                setEmailGeneralErrorMessage(error[key]);
                            break;
                        default:
                            setGeneralErrorMessage(error[key]);
                    }
                }
            });
        } else {
            setPasswordGeneralErrorMessage('Passwords don\'t match');
        }
    }

    return (
        <div className="Signup">
            <h1>Signup</h1>
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
                    <span>Repeat password</span>
                    <input type="password" value={repeatPassword} onChange={e => setRepeatPassword(e.target.value)} />
                </li>
                <li>
                    <span>Email</span>
                    <input value={email} onChange={e => setEmail(e.target.value)} />
                    <span>{emailErrorMessage}</span>
                </li>
                <li>
                    <button onClick={registerUser}>Sign up</button>
                    <span>{generalErrorMessage}</span>
                    <span>{successMessage}</span>
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

export default connect(mapStateToProps)(Signup);
