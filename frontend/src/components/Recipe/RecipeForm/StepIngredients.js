import React from 'react';

import IngredientForm from '../Ingredient/IngredientForm';
import CreateIngredientForm from '../Ingredient/CreateIngredientForm';

const StepIngredients = props => {
    const nextAvailable = props.recipeValues.ingredients.length > 0;

    return (
        <>
            <h2>Ingredients</h2>
            { props.ingredientSearch === '' ? <button onClick={props.addIngredient}>Add ingredient</button> : null }
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
                            { props.ingredients.length === 0 ?
                                <>
                                    <CreateIngredientForm
                                        alreadyEnteredName={props.ingredientSearch}
                                        ingredientId={i.id}
                                        createIngredient={i => props.createIngredient(i)}
                                        categories={props.categories} />
                                </>
                            :null }
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
