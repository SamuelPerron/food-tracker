import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';

const RecipeDetails = props => {
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
        <div className="RecipeDetails">
            { recipe ?
                <>
                    <h1>{recipe.name}</h1>
                    { props.token ? <span onClick={toggleBookmarkRecipe}>{ bookmarked ? "Remove from bookmarks" : "Bookmark"}</span> : null }
                    <p>{recipe.description}</p>
                    <p>
                        <em>{recipe.category.name}</em><br/>
                    </p>
                    <ul>
                        <li>Servings: {recipe.servings}</li>
                        <li>Preparation time: {recipe.preparation_time} min</li>
                        <li>Cook time: {recipe.cook_time} min</li>
                    </ul>
                    <p>Author: <NavLink to={'/user/' + recipe.author.pk} exact>{recipe.author.username}</NavLink></p>

                    <h2>Instructions</h2>
                    <ol>
                        { recipe.steps.map(s => (
                            <li key={s.order}>
                                <p>{s.content}</p>
                            </li>
                        )) }
                    </ol>

                    <h2>Nutritional values per servings</h2>
                    <ul>
                        <li>
                            <strong>Calories: </strong>
                            {Math.round(recipe.nutritional_values.calories / recipe.servings)}
                        </li>
                        <li>
                            <strong>Protein: </strong>
                            {Math.round(recipe.nutritional_values.protein / recipe.servings)} g
                        </li>
                        <li>
                            <strong>Carbs: </strong>
                            {Math.round(recipe.nutritional_values.carbs / recipe.servings)} g
                        </li>
                        <li>
                            <strong>Fat: </strong>
                            {Math.round(recipe.nutritional_values.fat / recipe.servings)} g
                        </li>
                    </ul>
                </>
            : null }
        </div>
    );
}

const mapStateToProps = state => {
    return {
        api: state.apiBaseURL,
        headers: state.headers,
        token: state.token,
    };
};

export default connect(mapStateToProps)(RecipeDetails);
