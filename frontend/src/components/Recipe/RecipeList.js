import React from 'react';

import RecipeItem from '../../components/Recipe/RecipeItem';


const RecipeList = props => {
    return (
        props.recipes.length > 0 ?
            <ul>
                { props.recipes.map(recipe => (
                    <RecipeItem
                        key={recipe.id}
                        showAuthor
                        {...recipe} />
                )) }
            </ul>
        : <p>No recipes found.</p>
    );
}

export default RecipeList;
