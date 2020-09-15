import React from 'react';
import { NavLink } from 'react-router-dom';

import IngredientList from './Ingredient/IngredientList';

import '../../styles/Recipe/RecipeDetails.scss';
import categoryIcon from '../../static/icons/category.png';
import authorIcon from '../../static/icons/author.png';


const RecipeDetails = props => {
    return (
        <div className="RecipeDetails">
            <div className="recipes-header"/>
            <div className="header-title">
                <div>
                    <h1>{props.recipe.name}</h1>
                    <div className="header-actions">
                        { props.isUserLogged ?
                            <span onClick={props.toggleBookmarkRecipe}>{
                                    props.bookmarked ? "Remove from bookmarks" : "Bookmark"}
                                </span>
                        : null }
                        { props.isUserLogged && props.userId === props.recipe.author.pk ?
                            <span onClick={props.deleteRecipe}>Delete</span>
                        : null }
                    </div>
                </div>
            </div>
            <div className="recipe-image-background" style={{backgroundImage: 'url(' + props.recipe.image + ')'}}/>
            <div className="recipe-image-background-overlay"/>
            <div className="recipe-image" style={{backgroundImage: 'url(' + props.recipe.image + ')'}}/>

            <div className="recipe-informations" data-aos="fade-up">
                <div className="recipe-category-author">
                    <p>
                        <img src={categoryIcon} /> <em>{props.recipe.category.name}</em>
                    </p>
                    <p>
                        <img src={authorIcon} /> <NavLink to={'/user/' + props.recipe.author.pk} exact>{props.recipe.author.username}</NavLink>
                    </p>
                </div>

                <ul className="recipe-key-points">
                    <li>Servings: <strong>{props.recipe.servings}</strong></li>
                    <li>Preparation time: <strong>{props.recipe.preparation_time} min</strong></li>
                    <li>Cook time: <strong>{props.recipe.cook_time} min</strong></li>
                </ul>
            </div>

            <div className="ingredients-instructions">
                <div className="ingredients" data-aos="fade-up">
                    <h2>Ingredients</h2>
                    <IngredientList ingredients={props.recipe.ingredients} />
                </div>

                <div className="instructions" data-aos="fade-up">
                    <h2>Instructions</h2>
                    <ol>
                        { props.recipe.steps.map(s => (
                            <li key={s.order}>
                                <p>{s.content}</p>
                            </li>
                        )) }
                    </ol>
                </div>
            </div>

            <div className="nutritional-values-container" data-aos="fade-up">
                { Object.keys(props.recipe.nutritional_values).length ?
                    <>
                        <h2>Nutritional values per servings</h2>
                        <ul className="nutritional-values">
                            <li>
                                <strong>Calories</strong>
                                {Math.round(props.recipe.nutritional_values.calories / props.recipe.servings)}
                            </li>
                            <li>
                                <strong>Protein</strong>
                                {Math.round(props.recipe.nutritional_values.protein / props.recipe.servings)} g
                            </li>
                            <li>
                                <strong>Carbs</strong>
                                {Math.round(props.recipe.nutritional_values.carbs / props.recipe.servings)} g
                            </li>
                            <li>
                                <strong>Fat</strong>
                                {Math.round(props.recipe.nutritional_values.fat / props.recipe.servings)} g
                            </li>
                        </ul>
                    </>
                : null }
            </div>
        </div>
    );
}

RecipeDetails.defaultProps = {
    recipe: {},
};

export default RecipeDetails;
