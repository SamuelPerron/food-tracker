import React, { useState, useEffect } from 'react';

const CreateIngredientForm = props => {
    const [newIngredient, setNewIngredient] = useState({
        name: '',
        nutritional_values: [{
            calories: 0,
            proteins: 0,
            carbs: 0,
            fats: 0,
        }],
        servings: [{
            serving_name: '',
            serving_size: 0,
            serving_type: '',
        }],
        category: '',
        author: props.authorId,
    });

    useEffect(() => {
        setNewIngredient({...newIngredient, name: props.alreadyEnteredName});
    }, [props.alreadyEnteredName]);

    return (
        <div className="create-ingredient">
            <h4>Create new ingredient ?</h4>
            <div className="form">
                <div className="form-item">
                    <span>Name</span>
                    <input value={newIngredient.name} onChange={e => setNewIngredient({...newIngredient, name: e.target.value})} />
                </div>
                <div className="form-item">
                    <span>Category</span>
                    <select value={newIngredient.category} onChange={e => setNewIngredient({...newIngredient, category: e.target.value})}>
                        <option></option>
                        { props.categories.map(c => (
                            <option key={c.url} value={c.url}>{c.name}</option>
                        )) }
                    </select>
                </div>
                <div className="form-item">
                    <h4>Nutritional values</h4>
                    <div className="form">
                        <div className="form-item">
                            <span>Serving name</span>
                            <input
                                value={newIngredient.servings.serving_name}
                                onChange={e => setNewIngredient({
                                    ...newIngredient, servings: [{
                                        ...newIngredient.servings[0],
                                        serving_name: e.target.value
                                    }]
                                })} />
                            <span>Serving size</span>
                            <input
                                className="serving-size"
                                value={newIngredient.servings.serving_size}
                                onChange={e => setNewIngredient({
                                    ...newIngredient, servings: [{
                                        ...newIngredient.servings[0],
                                        serving_size: parseFloat(e.target.value)
                                    }]
                                })} />
                            <select
                                className="serving-size"
                                value={newIngredient.servings.serving_type} onChange={e => setNewIngredient({
                                    ...newIngredient, servings: [{
                                        ...newIngredient.servings[0],
                                        serving_type: e.target.value
                                    }]
                                })}>
                                <option></option>
                                <option value="grams">grams</option>
                                <option value="milliliters">milliliters</option>
                            </select>
                        </div>
                        <div className="form-item">
                            <span>Calories</span>
                            <input
                                value={newIngredient.nutritional_values.calories}
                                onChange={e => setNewIngredient({
                                    ...newIngredient, nutritional_values: [{
                                        ...newIngredient.nutritional_values[0],
                                        calories: parseFloat(e.target.value)
                                    }]
                                })} />
                        </div>
                        <div className="form-item">
                            <span>Proteins</span>
                            <input
                                value={newIngredient.nutritional_values.proteins}onChange={e => setNewIngredient({
                                    ...newIngredient, nutritional_values: [{
                                        ...newIngredient.nutritional_values[0],
                                        protein: parseFloat(e.target.value)
                                    }]
                                })} />
                        </div>
                        <div className="form-item">
                            <span>Carbs</span>
                            <input
                                value={newIngredient.nutritional_values.carbs}
                                onChange={e => setNewIngredient({
                                    ...newIngredient, nutritional_values: [{
                                        ...newIngredient.nutritional_values[0],
                                        carbs: parseFloat(e.target.value)
                                    }]
                                })} />
                        </div>
                        <div className="form-item">
                            <span>Fats</span>
                            <input
                                value={newIngredient.nutritional_values.fats}
                                onChange={e => setNewIngredient({
                                    ...newIngredient, nutritional_values: [{
                                        ...newIngredient.nutritional_values[0],
                                        fat: parseFloat(e.target.value)
                                    }]
                                })} />
                        </div>
                    </div>
                </div>
            </div>
            <button onClick={() => props.createIngredient([props.ingredientId, newIngredient])}>Create</button>
        </div>
    );
}

export default CreateIngredientForm;
