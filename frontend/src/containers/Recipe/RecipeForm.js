import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import StepGeneralInformations from '../../components/Recipe/RecipeForm/StepGeneralInformations';
import StepInstructions from '../../components/Recipe/RecipeForm/StepInstructions';

const RecipeForm = props => {
    const [formStep, setFormStep] = useState(2);
    const [user, setUser] = useState(null);
    const [categories, setCategories] = useState([]);
    const [subCategories, setSubCategories] = useState([]);
    const [recipe, setRecipe] = useState({
        name: '', servings: 0, preparation_time: 0, cook_time: 0, category: null, sub_category: null,
        steps: {1: ''}
    });
    const [errorMessage, setErrorMessage] = useState('');

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
        setErrorMessage('');
        if (nextOrPrev === 'next') {
            if (formStep === 2) {
                for (let step in recipe.steps) {
                    if (recipe.steps[step] === '') {
                        setErrorMessage('Instruction steps must have instructions..');
                        return
                    }
                }
            }
            setFormStep(formStep + 1);
        } else {
            setFormStep(formStep - 1);
        }
    }

    const addStep = () => {
        const newStep = Object.keys(recipe.steps).length + 1;
        setRecipe({...recipe, steps: {...recipe.steps, [newStep]: ''}});
    }

    const removeRecipeStep = step => {
        const newRecipeSteps = {...recipe.steps};
        for (let o in recipe.steps) {
            if (o > step) {
                delete Object.assign(newRecipeSteps, {[o - 1]: newRecipeSteps[o]})[o];
            }
        }
        setRecipe({...recipe, steps: newRecipeSteps});
    }

    return (
        <div>
            <h1>New recipe</h1>
            { formStep === 1 ?
                <StepGeneralInformations
                    categories={categories}
                    subCategories={subCategories}
                    onCategorySelect={cId => findSubCategories(parseInt(cId))}
                    onValuesChange={newValues => setRecipeValue(newValues)}
                    recipeValues={recipe}
                    changeStep={nextOrPrev => changeStep(nextOrPrev)} />
            : null }
            { formStep === 2 ?
                <StepInstructions
                    onValuesChange={newValues => setRecipeValue(newValues)}
                    recipeValues={recipe}
                    addStep={() => addStep()}
                    changeStep={nextOrPrev => changeStep(nextOrPrev)}
                    removeRecipeStep={step => removeRecipeStep(step)}
                    errorMessage={errorMessage} />
            : null }
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
