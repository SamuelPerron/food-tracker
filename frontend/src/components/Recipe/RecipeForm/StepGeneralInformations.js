import React, { useEffect } from 'react';
import ImageUploader from 'react-images-upload';

const StepGeneralInformations = props => {
    const nextAvailable = props.recipeValues.name && props.recipeValues.servings > 0 &&
        props.recipeValues.category && props.recipeValues.sub_category && props.recipeValues.image_post;

    useEffect(() => {
        props.onValuesChange({image_post: null});
    }, []);

    return (
        <>
            <h2>General informations</h2>
            <div className="form" data-aos="fade-up">
                <div className="form-group">
                    <div className="form-item">
                        <span>Name</span>
                        <input
                            onChange={e => props.onValuesChange({name: e.target.value})}
                            value={props.recipeValues.name} />
                    </div>
                    <div className="form-item">
                        <span>Image</span>
                        <input
                            type="file"
                            onChange={e => props.onValuesChange({image_post: e.target.files[0]})}/>
                    </div>
                </div>
                <div className="form-group">
                    <div className="form-item">
                        <span>Servings</span>
                        <input
                            type="number"
                            onChange={e => props.onValuesChange({servings: parseInt(e.target.value)})}
                            value={props.recipeValues.servings} />
                    </div>
                    <div className="form-item">
                        <span>Preparation time (in minutes)</span>
                        <input
                            type="number"
                            onChange={e => props.onValuesChange({preparation_time: parseInt(e.target.value)})}
                            value={props.recipeValues.preparation_time} />
                    </div>
                    <div className="form-item">
                        <span>Cook time (in minutes)</span>
                        <input
                            type="number"
                            onChange={e => props.onValuesChange({cook_time: parseInt(e.target.value)})}
                            value={props.recipeValues.cook_time} />
                    </div>
                </div>
                <div className="form-group">
                    <div className="form-item">
                        <span>Category</span>
                        <select
                            onChange={e => props.onCategorySelect(e.target.value)}
                            value={props.recipeValues.category}>
                            <option></option>
                            {
                                props.categories.map(c => (
                                    <option key={c.url} value={c.url}>{c.name}</option>
                                ))
                            }
                        </select>
                    </div>
                    { props.subCategories.length > 1 ?
                        <div className="form-item">
                            <span>Sub Category</span>
                            <select
                                onChange={e => props.onValuesChange({sub_category: e.target.value})}
                                value={props.recipeValues.sub_category}>
                                <option></option>
                                {
                                    props.subCategories.map(c => (
                                        <option key={c.url} value={c.url}>{c.name}</option>
                                    ))
                                }
                            </select>
                        </div>
                    : null }
                </div>
                { nextAvailable ?
                    <div className="form-item">
                        <button onClick={() => props.changeStep('next')}>Next</button>
                    </div>
                : null }
            </div>
        </>
    );
}

export default StepGeneralInformations;
