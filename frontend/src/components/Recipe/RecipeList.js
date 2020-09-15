import React from 'react';

import RecipeItem from '../../components/Recipe/RecipeItem';
import '../../styles/Recipe/RecipeList.scss';


const RecipeList = props => {
    return (
        props.loading ?
            <div data-aos="zoom-in" className="spinner"><div/></div>
        :
            props.recipes.length > 0 ?
                <div className="list-container">
                    <ul className="RecipeList">
                        { props.recipes.map(recipe => (
                            <RecipeItem
                                key={recipe.url}
                                {...recipe} />
                        )) }
                        { props.recipes.map(recipe => (
                            <RecipeItem
                                key={recipe.url}
                                {...recipe} />
                        )) }
                        { props.recipes.map(recipe => (
                            <RecipeItem
                                key={recipe.url}
                                {...recipe} />
                        )) }
                        { props.recipes.map(recipe => (
                            <RecipeItem
                                key={recipe.url}
                                {...recipe} />
                        )) }
                        { props.recipes.map(recipe => (
                            <RecipeItem
                                key={recipe.url}
                                {...recipe} />
                        )) }
                        { props.recipes.map(recipe => (
                            <RecipeItem
                                key={recipe.url}
                                {...recipe} />
                        )) }
                        { props.recipes.map(recipe => (
                            <RecipeItem
                                key={recipe.url}
                                {...recipe} />
                        )) }
                    </ul>
                </div>
            : <p className="no-results">No recipes found...</p>
    );
}

export default RecipeList;
