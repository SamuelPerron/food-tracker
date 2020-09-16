import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { NavLink } from 'react-router-dom';

import RecipeItem from '../../components/Recipe/RecipeItem';

import '../../styles/User/Profile.scss';

const Profile = props => {
    const [user, setUser] = useState(null);
    const [loggedUser, setLoggedUser] = useState(null);
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        if (user) {
            axios.get(props.api + 'recipes/?author__username=' + user.username)
            .then(r => {
                setRecipes(r.data);
            });
        }
    }, [user]);

    useEffect(() => {
        if (props.match.params.id > 0) {
            axios.get(props.api + 'users/' + props.match.params.id)
            .then(r => {
                setUser(r.data);
            })
            .catch(e => {
                props.history.push('/');
            });
        }
    }, []);

    useEffect(() => {
        if (props.token) {
            axios.get(props.api + 'users/user_by_token/?token=' + props.token)
            .then(r => {
                setLoggedUser(r.data);
            })
            .catch(e => {
                console.log(e);
            });
        } else {
            setLoggedUser({});
        }
    }, [props.token]);

    return (
        <div className="Profile">
            { user ?
                <>
                    <div className="profile-header"/>
                    <div className="card-container">
                        <div className="profile-card">
                            <div className="card-background"/>
                            <div className="avatar-container" data-aos="zoom-out">
                                <div className="avatar"><img src={user.profile.avatar}/></div>
                            </div>
                            <h1>{user.username}</h1>
                            <ul>
                                <li>
                                    <strong>Recipe created</strong>
                                    <span>{recipes.length}</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <h2>Recipes</h2>
                    <div className="recipes" data-aos="fade-up">
                        <ul>
                            { loggedUser && user.pk === loggedUser.pk ? <li className="new-recipe">
                                <div className="card-background"/>
                                <NavLink to={'/recipes/new'} exact>+</NavLink>
                            </li> : null }
                            { recipes.map(recipe => (
                                <RecipeItem
                                    key={recipe.id}
                                    {...recipe} />
                            )) }
                        </ul>
                    </div>
                </>
            : null }
        </div>
    );
}

const mapStateToProps = state => {
    return {
        api: state.apiBaseURL,
        token: state.token,
    };
};

export default connect(mapStateToProps)(Profile);
