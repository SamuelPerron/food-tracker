import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import RecipeList from '../../components/Recipe/RecipeList';

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
                        const results = r.data;
                        for (let recipe in results) {
                            axios.get(results[recipe].author)
                            .then(r => {
                                results[recipe].author = r.data;
                                setRecipes(results);
                            });
                        }
                    });
                }
            });
        }
    }, [props.token]);

    return (
        <div className="RecipeList">
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
