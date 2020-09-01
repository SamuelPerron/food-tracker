import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';

const RecipeDetails = props => {
    const [recipe, setRecipe] = useState(null);

    useEffect(() => {
        axios.get(props.api + 'recipes/?slug=' + props.match.params.slug)
        .then(r => {
            if (r.data[0]) {
                setRecipe(r.data[0]);
            } else {
                props.history.push('/');
            }
        });
    }, []);

    return (
        <div className="RecipeDetails">
            { recipe ?
                <>
                    <h1>{recipe.name}</h1>
                    <p>{recipe.description}</p>
                    <p>
                        <em>{recipe.category.name}</em><br/>
                    </p>
                    <ul>
                        <li>Servings: {recipe.servings}</li>
                        <li>Preparation time: {recipe.preparation_time}</li>
                        <li>Cook time: {recipe.cook_time}</li>
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
    };
};

export default connect(mapStateToProps)(RecipeDetails);
