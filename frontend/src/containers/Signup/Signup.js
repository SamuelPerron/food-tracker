import React from 'react';
import { useState } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import '../../styles/User/LoginRegister.scss';
import logo from '../../static/icons/logo.png';

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
            <div className="logo">
                <img src={logo} data-aos="zoom-out" data-aos-delay="700"/>
                <h1>Mealtoasty</h1>
            </div>
            <div className="register-form">
                <ul>
                    <li data-aos="fade-up" data-aos-delay="100">
                        <span>Username</span>
                        <input value={username} onChange={e => setUsername(e.target.value)} />
                        <span className="error">{usernameErrorMessage}</span>
                    </li>
                    <li data-aos="fade-up" data-aos-delay="200">
                        <span>Password</span>
                        <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
                        <span className="error">{passwordErrorMessage}</span>
                    </li>
                    <li data-aos="fade-up" data-aos-delay="300">
                        <span>Repeat password</span>
                        <input type="password" value={repeatPassword} onChange={e => setRepeatPassword(e.target.value)} />
                    </li>
                    <li data-aos="fade-up" data-aos-delay="400">
                        <span>Email</span>
                        <input value={email} onChange={e => setEmail(e.target.value)} />
                        <span className="error">{emailErrorMessage}</span>
                    </li>
                    <li data-aos="fade-up" data-aos-delay="500">
                        <button onClick={registerUser}>Sign up</button>
                        <span className="error">{generalErrorMessage}</span>
                        <span className="error">{successMessage}</span>
                    </li>
                </ul>
            </div>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        api: state.apiBaseURL,
    };
};

export default connect(mapStateToProps)(Signup);
