import React from 'react';

const IngredientForm = props => {
    let grams = 0;
    let milliliters = 0;
    if (props.ingredient.serving && props.ingredient.serving.grams != 0) {
        grams = props.ingredient.serving.grams * props.ingredient.quantity;
    }
    if (props.ingredient.serving && props.ingredient.serving.milliliters != 0) {
        milliliters = props.ingredient.serving.milliliters * props.ingredient.quantity;
    }

    return (
        <div>
            { props.ingredient.name ?
                <>
                    <strong>{props.ingredient.name}</strong><br />
                    <select value={props.ingredient.serving.id} onChange={e => props.changeIngredientServing([e.target.value, props.ingredient.id])}>
                        <option></option>
                        { props.ingredient.servings.map(s => (
                            <option value={s.id} key={s.id}>{ s.for_list_name !== '' ? s.for_list_name : s.custom_name }</option>
                        ))}
                    </select> x
                    <input onChange={e => props.changeIngredientQuantity(e.target.value)} value={props.ingredient.quantity} /> =
                    <span> { grams != 0 ? grams + ' g' : milliliters + ' ml' }</span>
                </>
            :
                <>
                    <span>Ingredient</span>
                    <input value={props.ingredientSearch} onChange={e => props.ingredientSearchHandler(e.target.value)} />
                    { props.ingredientSearch !== '' ?
                        <ul>
                            { props.ingredients.map(i => (
                                <li onClick={() => props.chooseIngredientHandler([props.ingredient.id, i])}>{i.name}</li>
                            ))}
                        </ul>
                    :null }
                </>
            }
        </div>
    );
}

export default IngredientForm;
