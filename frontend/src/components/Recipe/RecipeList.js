import React from 'react';

import RecipeItem from '../../components/Recipe/RecipeItem';
import '../../styles/Recipe/RecipeList.scss';


const RecipeList = props => {
    return (
        props.recipes.length > 0 ?
            <ul className="RecipeList">
                { props.recipes.map(recipe => (
                    <RecipeItem
                        key={recipe.url}
                        {...recipe} />
                )) }
            </ul>
        : <p>No recipes found.</p>
    );
}

export default RecipeList;
