import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import RecipeList from '../../components/Recipe/RecipeList';


const RecipeListPage = props => {
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        axios.get(props.api + 'recipes/')
        .then(r => {
            setRecipes(r.data);
        });
    }, []);

    return (
        <div className="RecipeList">
            <RecipeList recipes={recipes} />
        </div>
    );
}

const mapStateToProps = state => {
    return {
        api: state.apiBaseURL,
        token: state.token
    };
};
export default connect(mapStateToProps)(RecipeListPage);
