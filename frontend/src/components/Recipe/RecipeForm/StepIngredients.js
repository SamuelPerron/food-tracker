import React from 'react';

import IngredientForm from '../Ingredient/IngredientForm';
import CreateIngredientForm from '../Ingredient/CreateIngredientForm';

const StepIngredients = props => {
    const nextAvailable = props.recipeValues.ingredients.length > 0;

    return (
        <>
            <h2>Ingredients</h2>
            { props.ingredientSearch === '' ? <button onClick={props.addIngredient}>Add ingredient</button> : null }
            <ul className="ul-form">
                {
                    props.recipeValues.ingredients.map(i => (
                        <li className="new-ingredient" data-aos="fade-up" key={i.id}>
                            <IngredientForm
                                ingredients={props.ingredients}
                                ingredient={i}
                                chooseIngredientHandler={i => props.chooseIngredientHandler(i)}
                                ingredientSearch={props.ingredientSearch}
                                ingredientSearchHandler={i => props.ingredientSearchHandler(i)}
                                changeIngredientServing={s => props.changeIngredientServing(s)}
                                changeIngredientQuantity={qty => props.changeIngredientQuantity(i.id, qty)} />
                            { props.ingredients.length === 0 && !i.name ?
                                <>
                                    <CreateIngredientForm
                                        alreadyEnteredName={props.ingredientSearch}
                                        ingredientId={i.id}
                                        createIngredient={i => props.createIngredient(i)}
                                        authorId={props.user.pk}
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
