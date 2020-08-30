import React from 'react';
import { useState } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

const Profile = props => {
    return (
        <div className="Profile">
            { props.user ?
                <h1>{props.user.username}</h1>
            : null }
        </div>
    );
}

const mapStateToProps = state => {
    return {
        api: state.apiBaseURL,
        user: state.user,
        headers: state.headers,
    };
};

export default connect(mapStateToProps)(Profile);
