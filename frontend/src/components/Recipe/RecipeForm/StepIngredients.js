import React from 'react';

import IngredientForm from '../Ingredient/IngredientForm';
import CreateIngredientForm from '../Ingredient/CreateIngredientForm';

const StepIngredients = props => {
    const nextAvailable = props.recipeValues.ingredients.length > 0;

    return (
        <>
            <h2>Ingredients</h2>
            { props.ingredientSearch === '' ? <button onClick={props.addIngredient}>Add ingredient</button> : null }
            { nextAvailable ?
                <div className="form-item">
                    <button onClick={() => props.changeStep('next')}>Next</button>
                    <p>{props.errorMessage}</p>
                </div>
            : null }
            <div className="form" data-aos="fade-up">
                {
                    props.recipeValues.ingredients.map(i => (
                        <div className="form-item ingredients-fi" data-aos="fade-up" key={i.id}>
                            <IngredientForm
                                ingredients={props.ingredients}
                                ingredient={i}
                                removeRecipeIngredient={() => props.removeRecipeIngredient(i.id)}
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
                            : null }
                        </div>
                    ))
                }
            </div>
        </>
    );
}

export default StepIngredients;
