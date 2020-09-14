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
        : <div data-aos="zoom-in" className="spinner"><div/></div>
    );
}

export default RecipeList;
