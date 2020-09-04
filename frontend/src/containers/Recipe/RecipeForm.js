import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import StepGeneralInformations from '../../components/Recipe/RecipeForm/StepGeneralInformations';
import StepInstructions from '../../components/Recipe/RecipeForm/StepInstructions';
import StepValidation from '../../components/Recipe/RecipeForm/StepValidation';

const RecipeForm = props => {
    const [formStep, setFormStep] = useState(1);
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
        if (categoryId) {
            axios.get(props.api + 'recipes/sub-categories/?parent_category=' + categoryId)
            .then(r => {
                setSubCategories(r.data);
                setRecipeValue({category: categoryId})
            });
        } else {
            setSubCategories([]);
        }
    }

    const setRecipeValue = updatedValues => {
        setRecipe({...recipe, ...updatedValues})
    }

    const transformRecipe = () => {
        const newRecipe = {...recipe};
        newRecipe.author = {
            pk: user.pk,
            username: user.username
        }
        newRecipe.nutritional_values = [];
        for (let cat in subCategories) {
            if (subCategories[cat].id === recipe.sub_category) {
                newRecipe.category = subCategories[cat];
                delete newRecipe.sub_category;
            }
        }
        delete newRecipe.steps;
        const newSteps = [];
        for (let step in Object.keys(recipe.steps)) {
            newSteps.push({order: parseInt(step) + 1, content: recipe.steps[parseInt(step) + 1]});
        }
        newRecipe.steps = newSteps;
        return newRecipe;
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

    const sendToAPI = () => {
        const toSend = transformRecipe();
        delete toSend.nutritional_values;
        axios({
            url: props.api + 'recipes/',
            method: 'POST',
            headers: props.headers,
            data: toSend
        })
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
            { formStep === 3 ?
                <StepValidation
                    recipe={transformRecipe()}
                    sendToAPI={() => sendToAPI()} />
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
