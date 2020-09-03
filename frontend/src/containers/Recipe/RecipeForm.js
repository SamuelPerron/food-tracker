import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import Step1 from '../../components/Recipe/RecipeForm/Step1';

const RecipeForm = props => {
    const [formStep, setFormStep] = useState(1);
    const [user, setUser] = useState(null);
    const [categories, setCategories] = useState([]);
    const [subCategories, setSubCategories] = useState([]);
    const [recipe, setRecipe] = useState({
        name: '', servings: 0, preparation_time: 0, cook_time: 0, category: null, sub_category: null
    });

    useEffect(() => {
        if (props.token) {
            axios.get(props.api + 'users/user_by_token/?token=' + props.token)
            .then(r => {
                setUser(r.data);
            });
        }
    }, [props.token]);

    useEffect(() => {
        axios.get(props.api + 'recipes/categories/')
        .then(r => {
            setCategories(r.data);
        });
    }, []);

    const findSubCategories = categoryId => {
        axios.get(props.api + 'recipes/sub-categories/?parent_category=' + categoryId)
        .then(r => {
            setSubCategories(r.data);
            setRecipeValue({category: categoryId})
        });
    }

    const setRecipeValue = updatedValues => {
        setRecipe({...recipe, ...updatedValues})
    }

    const changeStep = nextOrPrev => {
        if (nextOrPrev === 'next') {
            setFormStep(formStep + 1);
        } else {
            setFormStep(formStep - 1);
        }
    }

    return (
        <div>
            <h1>New recipe</h1>
            { formStep === 1 ?
                <Step1
                    categories={categories}
                    subCategories={subCategories}
                    onCategorySelect={cId => findSubCategories(parseInt(cId))}
                    onValuesChange={newValues => setRecipeValue(newValues)}
                    recipeValues={recipe}
                    changeStep={nextOrPrev => changeStep(nextOrPrev)} />
            : null}
        </div>
    );
}

const mapStateToProps = state => {
    return {
        api: state.apiBaseURL,
        token: state.token,
        headers: state.headers,
    };
};

export default connect(mapStateToProps)(RecipeForm);
