import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import RecipeItem from '../../components/Recipe/RecipeItem';

const BookmarkedRecipeList = props => {
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        if (props.token) {
            axios.get(props.api + 'users/user_by_token/?token=' + props.token)
            .then(r => {
                const bmRecipes = r.data.profile.bookmarked_recipes;
                if (bmRecipes.length > 0) {
                    axios.get(props.api + 'recipes/?id=' + bmRecipes)
                    .then(r => {
                        setRecipes(r.data);
                    });
                }
            });
        }
    }, [props.token]);

    return (
        <div className="RecipeList">
            { recipes.length > 0 ?
                <ul>
                    { recipes.map(recipe => (
                        <RecipeItem
                            key={recipe.id}
                            showAuthor
                            {...recipe} />
                    )) }
                </ul>
            : <p>No recipes bookmarked.</p> }
        </div>
    );
}

const mapStateToProps = state => {
    return {
        api: state.apiBaseURL,
        token: state.token
    };
};
export default connect(mapStateToProps)(BookmarkedRecipeList);
