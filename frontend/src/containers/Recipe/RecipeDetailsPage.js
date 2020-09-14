import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';

import RecipeDetails from '../../components/Recipe/RecipeDetails';

const RecipeDetailsPage = props => {
    const [recipe, setRecipe] = useState(null);
    const [bookmarked, setBookmarked] = useState(false);
    const [userId, setUserId] = useState(null);

    const toggleBookmarkRecipe = () => {
        axios({
            url: props.api + 'users/' + userId + '/toggle_bookmark/',
            method: 'PATCH',
            headers: props.headers,
            data: {'recipe': recipe.id}
        }).then(r => {
            setBookmarked(!bookmarked);
        });
    }

    const findIfRecipeBookmarked = () => {
        if (props.token && recipe) {
            axios.get(props.api + 'users/user_by_token/?token=' + props.token)
            .then(r => {
                if (r.data.profile.bookmarked_recipes.indexOf(recipe.id) >= 0) {
                    setBookmarked(true);
                } else {
                    setBookmarked(false);
                }
                setUserId(r.data.pk);
            });
        }
    }

    const deleteRecipe = () => {
        axios({
            url: props.api + 'recipes/' + recipe.id,
            method: 'DELETE',
            headers: props.headers,
        }).then(r => {
            props.history.push('/');
        });
    }

    useEffect(() => {
        findIfRecipeBookmarked();
    }, [recipe]);

    useEffect(() => {
        axios.get(props.api + 'recipes/?slug=' + props.match.params.slug)
        .then(r => {
            const result = r.data[0];
            if (result) {
                axios.get(result.category)
                .then(r => {
                    result.category = r.data;
                    axios.get(result.author)
                    .then(r => {
                        result.author = r.data;
                        result.id = parseInt(result.url.split('/recipes/')[1].split('/')[0]);
                        setRecipe(result);
                    });
                });
            } else {
                props.history.push('/');
            }
        });
    }, []);

    return (
        <>
            { recipe ?
                <RecipeDetails
                    recipe={recipe}
                    isUserLogged={props.token}
                    bookmarked={bookmarked}
                    userId={userId}
                    deleteRecipe={deleteRecipe}
                    toggleBookmarkRecipe={toggleBookmarkRecipe} />
            : null }
        </>
    );
}

const mapStateToProps = state => {
    return {
        api: state.apiBaseURL,
        headers: state.headers,
        token: state.token,
    };
};

export default connect(mapStateToProps)(RecipeDetailsPage);
