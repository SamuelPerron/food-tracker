import React from 'react';
import ImageUploader from 'react-images-upload';

const StepGeneralInformations = props => {
    const nextAvailable = props.recipeValues.name && props.recipeValues.servings > 0 &&
        props.recipeValues.category && props.recipeValues.sub_category && props.recipeValues.image_post;

    return (
        <>
            <h2>General informations</h2>
            <ul className="ul-form" data-aos="fade-up">
                <li>
                    <span>Name</span>
                    <input
                        onChange={e => props.onValuesChange({name: e.target.value})}
                        value={props.recipeValues.name} />
                </li>
                <li>
                    <span>Image</span>
                    <input
                        type="file"
                        onChange={e => props.onValuesChange({image_post: e.target.files[0]})}/>
                </li>
                <li>
                    <span>Servings</span>
                    <input
                        type="number"
                        onChange={e => props.onValuesChange({servings: parseInt(e.target.value)})}
                        value={props.recipeValues.servings} />
                </li>
                <li>
                    <span>Preparation time (in minutes)</span>
                    <input
                        type="number"
                        onChange={e => props.onValuesChange({preparation_time: parseInt(e.target.value)})}
                        value={props.recipeValues.preparation_time} />
                </li>
                <li>
                    <span>Cook time (in minutes)</span>
                    <input
                        type="number"
                        onChange={e => props.onValuesChange({cook_time: parseInt(e.target.value)})}
                        value={props.recipeValues.cook_time} />
                </li>
                <li>
                    <span>Category</span>
                    <select onChange={e => props.onCategorySelect(e.target.value)}>
                        <option></option>
                        {
                            props.categories.map(c => (
                                <option key={c.url} value={c.url}>{c.name}</option>
                            ))
                        }
                    </select>
                </li>
                { props.subCategories.length > 1 ?
                    <li>
                        <span>Sub Category</span>
                        <select onChange={e => props.onValuesChange({sub_category: e.target.value})}>
                            <option></option>
                            {
                                props.subCategories.map(c => (
                                    <option key={c.url} value={c.url}>{c.name}</option>
                                ))
                            }
                        </select>
                    </li>
                : null }
                { nextAvailable ?
                    <li>
                        <button onClick={() => props.changeStep('next')}>Next</button>
                    </li>
                : null }
            </ul>
        </>
    );
}

export default StepGeneralInformations;
