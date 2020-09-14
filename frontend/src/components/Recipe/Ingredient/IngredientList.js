import React from 'react';

import IngredientItem from './IngredientItem';


const IngredientList = props => {
    return (
        props.ingredients.length > 0 ?
            <ul className="IngredientList">
                { props.ingredients.map(ingredient => (
                    <IngredientItem
                        key={ingredient.url}
                        {...ingredient} />
                )) }
            </ul>
        : <p>No ingredients found.</p>
    );
}

export default IngredientList;
