import React, { useState } from 'react';

const CreateIngredientForm = props => {
    const [newIngredient, setNewIngredient] = useState({
        name: '',
        nutritional_values: {
            calories: 0,
            proteins: 0,
            carbs: 0,
            fats: 0,
        },
        category: '',
    });

    return (
        <div>
            <h4>Create new ingredient ?</h4>
            <ul>
                <li>
                    <span>Name</span>
                    <input value={newIngredient.name} onChange={e => setNewIngredient({...newIngredient, name: e.target.value})} />
                </li>
                <li>
                    <span>Category</span>
                    <select value={newIngredient.category} onChange={e => setNewIngredient({...newIngredient, category: e.target.value})}>
                        <option></option>
                        { props.categories.map(c => (
                            <option key={c.url} value={c.url}>{c.name}</option>
                        )) }
                    </select>
                </li>
                <li>
                    <h4>Nutritional values</h4>
                    <ul>
                        <li>
                            <span>Calories</span>
                            <input
                                value={newIngredient.nutritional_values.calories}
                                onChange={e => setNewIngredient({
                                    ...newIngredient, nutritional_values: {
                                        ...newIngredient.nutritional_values,
                                        calories: parseFloat(e.target.value)
                                    }
                                })} />
                        </li>
                        <li>
                            <span>Proteins</span>
                            <input
                                value={newIngredient.nutritional_values.proteins}onChange={e => setNewIngredient({
                                    ...newIngredient, nutritional_values: {
                                        ...newIngredient.nutritional_values,
                                        proteins: parseFloat(e.target.value)
                                    }
                                })} />
                        </li>
                        <li>
                            <span>Carbs</span>
                            <input
                                value={newIngredient.nutritional_values.carbs}
                                onChange={e => setNewIngredient({
                                    ...newIngredient, nutritional_values: {
                                        ...newIngredient.nutritional_values,
                                        carbs: parseFloat(e.target.value)
                                    }
                                })} />
                        </li>
                        <li>
                            <span>Fats</span>
                            <input
                                value={newIngredient.nutritional_values.fats}
                                onChange={e => setNewIngredient({
                                    ...newIngredient, nutritional_values: {
                                        ...newIngredient.nutritional_values,
                                        fats: parseFloat(e.target.value)
                                    }
                                })} />
                        </li>
                    </ul>
                </li>
            </ul>
            <button onClick={() => props.createIngredient(newIngredient)}>Create</button>
        </div>
    );
}

export default CreateIngredientForm;
