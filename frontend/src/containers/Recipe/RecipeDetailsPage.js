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

    useEffect(() => {
        findIfRecipeBookmarked();
    }, [recipe]);

    useEffect(() => {
        axios.get(props.api + 'recipes/?slug=' + props.match.params.slug)
        .then(r => {
            if (r.data[0]) {
                setRecipe(r.data[0]);
            } else {
                props.history.push('/');
            }
        });
    }, [props.token]);

    return (
        <>
            { recipe ?
                <RecipeDetails
                    recipe={recipe}
                    bookmarked={bookmarked}
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
