import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import RecipeList from '../../components/Recipe/RecipeList';

import '../../styles/Recipe/RecipePage.scss';

const BookmarkedRecipeList = props => {
    const [recipes, setRecipes] = useState([]);
    const [recipeProxy, setRecipeProxy] = useState({});

    useEffect(() => {
        if (props.token) {
            let newRecipes = [];
            axios.get(props.api + 'users/user_by_token/?token=' + props.token)
            .then(r => {
                const bmRecipes = r.data.profile.bookmarked_recipes;
                if (bmRecipes.length > 0) {
                    for (let recipe in bmRecipes) {
                        axios.get(props.api + 'recipes/?id=' + bmRecipes[recipe])
                        .then(r => {
                            setRecipeProxy(r.data[0]);
                        });
                    }
                }
            });
        }
    }, [props.token]);

    useEffect(() => {
        const newRecipes = [...recipes, recipeProxy];
        if (recipeProxy.url) {
            setRecipes(newRecipes);
        }
    }, [recipeProxy]);

    return (
        <div className="Bookmarks">
            <div className="recipes-header"/>

            <div className="header-title">
                <div>
                    <h1>Bookmarked recipes</h1>
                </div>
            </div>

            <RecipeList recipes={recipes} />
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
