import React from 'react';

import RecipeDetails from '../RecipeDetails';

const StepInstructions = props => {
    return (
        <>
            <h2>Preview</h2>
            <button onClick={props.sendToAPI}>Save</button>
            <RecipeDetails recipe={props.recipe} />
        </>
    );
}

export default StepInstructions;
