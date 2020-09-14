import React from 'react';

const StepInstructions = props => {
    const nextAvailable = Object.keys(props.recipeValues.steps).length > 0;

    return (
        <>
            <h2>Instructions</h2>
            <button onClick={props.addStep}>Add step</button>
            <ul className="ul-form">
                {
                    Object.keys(props.recipeValues.steps).map((o) => (
                        <li className="new-step" data-aos="fade-up" key={o}>
                            <span className="step-number">{o}</span>
                            <textarea onChange={e => props.onValuesChange({
                                    ...props.recipeValues,
                                    steps: {
                                        ...props.recipeValues.steps,
                                        [o]: e.target.value
                                    }
                                })} value={props.recipeValues.steps[o]}/>
                            <button onClick={() => props.removeRecipeStep(o)}>Remove</button>
                        </li>
                    ))
                }
                { nextAvailable ?
                    <li>
                        <button onClick={() => props.changeStep('next')}>Next</button>
                        <p>{props.errorMessage}</p>
                    </li>
                : null }
            </ul>
        </>
    );
}

export default StepInstructions;
