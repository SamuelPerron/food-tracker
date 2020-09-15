import React from 'react';

const StepInstructions = props => {
    const nextAvailable = Object.keys(props.recipeValues.steps).length > 0;

    return (
        <>
            <h2>Instructions</h2>
            <button onClick={props.addStep}>Add step</button>
            { nextAvailable ?
                <div className="form-item">
                    <button onClick={() => props.changeStep('next')}>Next</button>
                    <p>{props.errorMessage}</p>
                </div>
            : null }

            <div className="form form-steps">
                {
                    Object.keys(props.recipeValues.steps).map((o) => (
                        <div className="form-item new-step" data-aos="fade-up" key={o}>
                            <span className="step-number">{o}</span>
                            <textarea onChange={e => props.onValuesChange({
                                    ...props.recipeValues,
                                    steps: {
                                        ...props.recipeValues.steps,
                                        [o]: e.target.value
                                    }
                                })} value={props.recipeValues.steps[o]}/>
                            { o != Object.keys(props.recipeValues.steps).length ?
                                <button onClick={() => props.removeRecipeStep(o)}>Remove</button>
                            : null }
                        </div>
                    ))
                }
            </div>
        </>
    );
}

export default StepInstructions;
