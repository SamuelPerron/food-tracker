import React from 'react';

const RecipeItem = props => {
    return (
        <li>
            <strong>{props.name}</strong><br />
            <span>{props.author.username}</span>
        </li>
    );
}

export default RecipeItem;
