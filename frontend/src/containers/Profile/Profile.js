import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

const Profile = props => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        if (props.match.params.id > 0) {
            axios.get(props.api + 'users/' + props.match.params.id)
            .then(r => {
                setUser(r.data);
            })
            .catch(e => {
                console.log(e);
            });
        }
    }, []);

    return (
        <div className="Profile">
            { user ?
                <>
                    <h1>{user.username}</h1>
                </>
            : null }
        </div>
    );
}

const mapStateToProps = state => {
    return {
        api: state.apiBaseURL,
    };
};

export default connect(mapStateToProps)(Profile);
