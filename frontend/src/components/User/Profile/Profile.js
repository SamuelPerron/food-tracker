import React, { useEffect } from 'react';
import { connect } from 'react-redux';

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
        user: state.user,
    };
};

export default connect(mapStateToProps)(Profile);
