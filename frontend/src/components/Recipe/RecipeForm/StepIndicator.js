import React from 'react';

const StepIndicator = props => {
    const done = () => {
        let toReturn = [];
        for (let i = 0; i < props.step; i++) {
            toReturn.push(<span className="done"/>);
        }
        return toReturn;
    }

    const left = () => {
        let toReturn = [];
        for (let i = props.step; i < props.totalSteps; i++) {
            toReturn.push(<span className="left"/>);
        }
        return toReturn;
    }

    return (
        <div className="step-indicator">
            { done().map(s => s ) }
            { left().map(s => s ) }
        </div>
    );
}

export default StepIndicator;
