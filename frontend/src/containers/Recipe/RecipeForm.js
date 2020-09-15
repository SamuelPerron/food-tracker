import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import crypto from 'crypto';

import StepGeneralInformations from '../../components/Recipe/RecipeForm/StepGeneralInformations';
import StepIngredients from '../../components/Recipe/RecipeForm/StepIngredients';
import StepInstructions from '../../components/Recipe/RecipeForm/StepInstructions';
import StepValidation from '../../components/Recipe/RecipeForm/StepValidation';

import '../../styles/Recipe/RecipeForm.scss';

const RecipeForm = props => {
    const [formStep, setFormStep] = useState(1);
    const [user, setUser] = useState(null);
    const [categories, setCategories] = useState([]);
    const [subCategories, setSubCategories] = useState([]);
    const [ingredientCategories, setIngredientCategories] = useState([]);
    const [ingredients, setIngredients] = useState([]);
    const [ingredientSearch, setIngredientSearch] = useState('');
    const [recipe, setRecipe] = useState({
        name: '', servings: 0, preparation_time: 0, cook_time: 0, category: null, sub_category: null,
        steps: {1: ''}, ingredients: [],
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

        axios.get(props.api + 'ingredients/sub-categories/')
        .then(r => {
            setIngredientCategories(r.data);
        });
    }, []);

    useEffect(() => {
        axios.get(props.api + 'ingredients?search=' + ingredientSearch)
        .then(r => {
            setIngredients(r.data);
        });
    }, [ingredientSearch]);

    const findSubCategories = categoryUrl => {
        if (categoryUrl) {
            axios.get(props.api + 'recipes/sub-categories/?parent_category=' + categoryUrl.slice(-2)[0])
            .then(r => {
                setSubCategories(r.data);
                setRecipeValue({category: categoryUrl})
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
        newRecipe.image = URL.createObjectURL(newRecipe.image_post);
        console.log(newRecipe.image);
        newRecipe.nutritional_values = [];
        for (let cat in subCategories) {
            if (subCategories[cat].url === recipe.sub_category) {
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
        delete newRecipe.ingredients;
        const newIngredients = [];
        for (let i in recipe.ingredients) {
            newIngredients.push({
                "ingredient": recipe.ingredients[i].url,
                "ingredient_name": {"name": recipe.ingredients[i].name},
                "quantity": recipe.ingredients[i].quantity,
                "serving": {
                    "custom_name": recipe.ingredients[i].quantity + recipe.ingredients[i].serving.name,
                    "for_list_name": recipe.ingredients[i].serving.name !== 'Standard serving' ? recipe.ingredients[i].serving.name : '',
                    "grams": recipe.ingredients[i].serving.grams,
                    "milliliters": recipe.ingredients[i].serving.milliliters
                }
            });
        }
        newRecipe.ingredients = newIngredients;
        return newRecipe;
    }

    const changeStep = nextOrPrev => {
        setErrorMessage('');
        if (nextOrPrev === 'next') {
            if (formStep === 3) {
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

    const addIngredient = () => {
        const newId = crypto.randomBytes(20).toString('hex');
        setRecipe({...recipe, ingredients: [...recipe.ingredients, {id: newId}]});
    }

    const chooseIngredientHandler = ingredient => {
        const newRecipeValues = {...recipe};
        for (let i = 0; i < newRecipeValues.ingredients.length; i++) {
            if (newRecipeValues.ingredients[i].id === ingredient[0]) {
                newRecipeValues.ingredients[i] = {
                    id: ingredient[0],
                    ...ingredient[1],
                    serving: {
                        name: '',
                        grams: 0,
                        milliliters: 0
                    },
                    quantity: 1,
                };
                setIngredientSearch('');
            }
        }
        setRecipeValue(newRecipeValues);
    }

    const changeIngredientServing = serving => {
        const newRecipeValues = {...recipe};
        for (let i = 0; i < newRecipeValues.ingredients.length; i++) {
            if (newRecipeValues.ingredients[i].id === serving[1]) {

                for (let j = 0; j < newRecipeValues.ingredients[i].servings.length; j++) {
                    if (newRecipeValues.ingredients[i].servings[j].id == serving[0]) {
                        serving = newRecipeValues.ingredients[i].servings[j];
                        newRecipeValues.ingredients[i].serving = {
                            name: serving.for_list_name ? serving.for_list_name : serving.custom_name,
                            grams: serving.grams,
                            milliliters: serving.milliliters
                        };
                    }
                }

            }
        }
        setRecipeValue(newRecipeValues);
    }

    const removeRecipeIngredient = ingredientId => {
        const newRecipeIngredients = [...recipe.ingredients];
        for (let i = newRecipeIngredients.length -1; i >= 0; i--) {
            if (newRecipeIngredients[i].id === ingredientId) {
                newRecipeIngredients.splice(i, 1);
            }
        }
        setRecipe({...recipe, ingredients: newRecipeIngredients});
        setIngredientSearch('');
    }

    const changeIngredientQuantity = (ingredientId, qty) => {
        let quantity = 0;
        if (qty !== "") {
            quantity = parseFloat(qty)
        }
        const newRecipeValues = {...recipe};
        for (let i = 0; i < newRecipeValues.ingredients.length; i++) {
            if (newRecipeValues.ingredients[i].id === ingredientId) {
                newRecipeValues.ingredients[i].quantity = qty;
            }
        }
        setRecipeValue(newRecipeValues);
    }

    const createIngredient = ingredient => {
        axios({
            url: props.api + 'ingredients/',
            method: 'POST',
            headers: props.headers,
            data: ingredient[1]
        })
        .then(r => {
            chooseIngredientHandler([ingredient[0], r.data]);
        });
    }

    const sendToAPI = () => {
        const toSend = transformRecipe();
        delete toSend.nutritional_values;
        delete toSend.image;
        toSend.category = toSend.category.url;
        toSend.author = props.api + 'users/' + toSend.author.pk + '/';

        const data = new FormData();
        for (let att in toSend) {
            if (att === 'steps' || att === 'ingredients') {
                data.append(att + '_post', JSON.stringify(toSend[att]));
            } else if (att === 'image_post') {
                data.append('image', toSend[att]);
            } else {
                data.append(att, toSend[att]);
            }
        }
        axios({
            url: props.api + 'recipes/',
            method: 'POST',
            headers: {...props.headers, 'Content-Type': 'multipart/form-data'},
            data
        })
        .then(r => {
            props.history.push('/recipes/' + r.data['slug']);
        });
    }

    return (
        <div className="RecipeForm">
            <div className="recipes-header"/>
            <div className="header-title">
                <div>
                    <h1>New recipe</h1>
                </div>
            </div>

            { formStep === 1 ?
                <StepGeneralInformations
                    categories={categories}
                    subCategories={subCategories}
                    onCategorySelect={cId => findSubCategories(cId)}
                    onValuesChange={newValues => setRecipeValue(newValues)}
                    recipeValues={recipe}
                    changeStep={nextOrPrev => changeStep(nextOrPrev)} />
            : null }
            { formStep === 2 ?
                <StepIngredients
                    user={user}
                    onValuesChange={newValues => setRecipeValue(newValues)}
                    recipeValues={recipe}
                    ingredients={ingredients}
                    ingredientSearch={ingredientSearch}
                    ingredientSearchHandler={i => setIngredientSearch(i)}
                    addIngredient={() => addIngredient()}
                    chooseIngredientHandler={i => chooseIngredientHandler(i)}
                    changeIngredientServing={s => changeIngredientServing(s)}
                    changeIngredientQuantity={(i, qty) => changeIngredientQuantity(i, qty)}
                    changeStep={nextOrPrev => changeStep(nextOrPrev)}
                    removeRecipeIngredient={ingredient => removeRecipeIngredient(ingredient)}
                    createIngredient={i => createIngredient(i)}
                    categories={ingredientCategories}
                    errorMessage={errorMessage} />
            : null }
            { formStep === 3 ?
                <StepInstructions
                    onValuesChange={newValues => setRecipeValue(newValues)}
                    recipeValues={recipe}
                    addStep={() => addStep()}
                    changeStep={nextOrPrev => changeStep(nextOrPrev)}
                    removeRecipeStep={step => removeRecipeStep(step)}
                    errorMessage={errorMessage} />
            : null }
            { formStep === 4 ?
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
