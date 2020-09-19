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
    const [avatar, setAvatar] = useState(null);
    const [generalErrorMessage, setGeneralErrorMessage] = useState('');
    const [usernameErrorMessage, setUsernameErrorMessage] = useState('');
    const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
    const [emailErrorMessage, setEmailErrorMessage] = useState('');
    const [avatarErrorMessage, setAvatarErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const resetMessages = () => {
        setGeneralErrorMessage('');
        setUsernameErrorMessage('');
        setPasswordErrorMessage('');
        setEmailErrorMessage('');
        setAvatarErrorMessage('');
    }

    const resetFields = () => {
        setUsername('');
        setEmail('');
        setPassword('');
        setRepeatPassword('');
        setAvatar(null);
    }

    const registerUser = () => {
        resetMessages();

        if (password === repeatPassword) {
            const data = new FormData();
            data.append('username', username);
            data.append('password', password);
            data.append('email', email);
            data.append('avatar', avatar);

            axios({
                url: props.api + 'users/',
                method: 'POST',
                headers: {...props.headers, 'Content-Type': 'multipart/form-data'},
                data
            })
            .then(r => {
                resetFields();
                setSuccessMessage('User created, you can now login.');
            })
            .catch(e => {
                const error = e.response.data;
                for (var key in error) {
                    switch (key) {
                        case 'username':
                                setUsernameErrorMessage(error[key]);
                            break;
                        case 'password':
                                setPasswordErrorMessage(error[key]);
                            break;
                        case 'email':
                                setEmailErrorMessage(error[key]);
                            break;
                        case 'Avatar':
                                setAvatarErrorMessage(error[key]);
                            break;
                        default:
                            setGeneralErrorMessage(error[key]);
                    }
                }
            });
        } else {
            setPasswordErrorMessage('Passwords don\'t match');
        }
    }

    return (
        <div className="Signup">
            <div className="logo">
                <img src={logo} data-aos="zoom-out" data-aos-delay="700"/>
                <h1>Mealtoasty</h1>
            </div>
            <div className="register-form" data-aos="fade-up">
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
                    <div>
                        <span>Repeat password</span>
                        <input type="password" value={repeatPassword} onChange={e => setRepeatPassword(e.target.value)} />
                    </div>
                    <div>
                        <span>Email</span>
                        <input value={email} onChange={e => setEmail(e.target.value)} />
                        <span className="error">{emailErrorMessage}</span>
                    </div>
                    <div>
                        <span>Avatar</span>
                        <input
                            type="file"
                            onChange={e => setAvatar(e.target.files[0])}/>
                    </div>
                    <div className="submit">
                        <button onClick={registerUser}>Sign up</button>
                        <span className="error">{generalErrorMessage}</span>
                        <span className="error">{successMessage}</span>
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

export default connect(mapStateToProps)(Signup);
