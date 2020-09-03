import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { NavLink } from 'react-router-dom';

import RecipeItem from '../../components/Recipe/RecipeItem';

const Profile = props => {
    const [user, setUser] = useState(null);
    const [recipes, setRecipes] = useState([]);

    const fetchRecipes = () => {
        axios.get(props.api + 'recipes/?author=' + props.match.params.id)
        .then(r => {
            setRecipes(r.data);
        })
    }

    useEffect(() => {
        if (props.match.params.id > 0) {
            axios.get(props.api + 'users/' + props.match.params.id)
            .then(r => {
                setUser(r.data);
                fetchRecipes();
            })
            .catch(e => {
                props.history.push('/');
            });
        }
    }, []);

    return (
        <div className="Profile">
            { user ?
                <>
                    <h1>{user.username}</h1>
                    { recipes.length > 0 ?
                        <>
                            <h2>Recipes</h2>
                            <ul>
                                <li><NavLink to={'/recipes/new'} exact>New recipe</NavLink></li>
                                { recipes.map(recipe => (
                                    <RecipeItem
                                        key={recipe.id}
                                        {...recipe} />
                                )) }
                            </ul>
                        </>
                    : null }
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
