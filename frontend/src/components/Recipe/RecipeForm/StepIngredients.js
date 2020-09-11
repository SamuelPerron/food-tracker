import React from 'react';

import IngredientForm from '../Ingredient/IngredientForm';

const StepIngredients = props => {
    const nextAvailable = props.recipeValues.ingredients.length > 0;

    return (
        <>
            <h2>Ingredients</h2>
            <button onClick={props.addIngredient}>Add ingredient</button>
            <ul>
                {
                    props.recipeValues.ingredients.map(i => (
                        <li key={i.id}>
                            <IngredientForm
                                ingredients={props.ingredients}
                                ingredient={i}
                                chooseIngredientHandler={i => props.chooseIngredientHandler(i)}
                                ingredientSearch={props.ingredientSearch}
                                ingredientSearchHandler={i => props.ingredientSearchHandler(i)}
                                changeIngredientServing={s => props.changeIngredientServing(s)}
                                changeIngredientQuantity={qty => props.changeIngredientQuantity(i.id, qty)} />
                            <button onClick={() => props.removeRecipeIngredient(i.id)}>Remove</button>
                        </li>
                    ))
                }
                { nextAvailable ?
                    <li>
                        <button onClick={() => props.changeStep('next')}>Next</button>
                        <p>{props.errorMessage}</p>
                    </li>
                : null }
            </ul>
        </>
    );
}

export default StepIngredients;
