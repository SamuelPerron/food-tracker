import React from 'react';
import { NavLink } from 'react-router-dom';

import IngredientList from './Ingredient/IngredientList';


const RecipeDetails = props => {
    return (
        <div className="RecipeDetails">
            <h1>{props.recipe.name}</h1>
            { props.isUserLogged ? <span onClick={props.toggleBookmarkRecipe}>{ props.bookmarked ? "Remove from bookmarks" : "Bookmark"}</span> : null }
            <p>{props.recipe.description}</p>
            <p>
                <em>{props.recipe.category.name}</em><br/>
            </p>
            <ul>
                <li>Servings: {props.recipe.servings}</li>
                <li>Preparation time: {props.recipe.preparation_time} min</li>
                <li>Cook time: {props.recipe.cook_time} min</li>
            </ul>
            <p>Author: <NavLink to={'/user/' + props.recipe.author.pk} exact>{props.recipe.author.username}</NavLink></p>

            <h2>Ingredients</h2>
            <IngredientList ingredients={props.recipe.ingredients} />

            <h2>Instructions</h2>
            <ol>
                { props.recipe.steps.map(s => (
                    <li key={s.order}>
                        <p>{s.content}</p>
                    </li>
                )) }
            </ol>

            { Object.keys(props.recipe.nutritional_values).length ?
                <>
                    <h2>Nutritional values per servings</h2>
                    <ul>
                        <li>
                            <strong>Calories: </strong>
                            {Math.round(props.recipe.nutritional_values.calories / props.recipe.servings)}
                        </li>
                        <li>
                            <strong>Protein: </strong>
                            {Math.round(props.recipe.nutritional_values.protein / props.recipe.servings)} g
                        </li>
                        <li>
                            <strong>Carbs: </strong>
                            {Math.round(props.recipe.nutritional_values.carbs / props.recipe.servings)} g
                        </li>
                        <li>
                            <strong>Fat: </strong>
                            {Math.round(props.recipe.nutritional_values.fat / props.recipe.servings)} g
                        </li>
                    </ul>
                </>
            : null }
        </div>
    );
}

RecipeDetails.defaultProps = {
    recipe: {},
};

export default RecipeDetails;
