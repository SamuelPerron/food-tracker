import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import RecipeItem from '../../components/Recipe/RecipeItem';

const RecipeList = props => {
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        axios.get(props.api + 'recipes/')
        .then(r => {
            setRecipes(r.data);
        });
    }, []);

    return (
        <div className="RecipeList">
            <ul>
                { recipes.map(recipe => (
                    <RecipeItem
                        key={recipe.id}
                        {...recipe} />
                )) }
            </ul>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        api: state.apiBaseURL,
    };
};
export default connect(mapStateToProps)(RecipeList);
