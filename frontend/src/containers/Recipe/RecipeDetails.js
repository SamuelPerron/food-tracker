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
                        <ul>
                            <li>Servings: {recipe.servings}</li>
                            <li>Preparation time: {recipe.preparation_time}</li>
                            <li>Cook time: {recipe.cook_time}</li>
                        </ul>
                    </p>
                    <p>Author: <NavLink to={'/user/' + recipe.author.pk} exact>{recipe.author.username}</NavLink></p>

                    <h2>Instructions</h2>
                    <ol>
                        { recipe.steps.map(s => (
                            <li key={s.order}>
                                <p>{s.content}</p>
                            </li>
                        )) }
                    </ol>
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
