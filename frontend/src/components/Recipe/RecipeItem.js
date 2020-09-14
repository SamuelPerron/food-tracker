import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

const RecipeItem = props => {
    return (
        <li style={{backgroundImage: 'url(' + props.image + ')'}}>
            <div className="card-background"/>
            <div className="card-text">
                <NavLink to={'/recipes/' + props.slug} exact>
                    <strong>{props.name}</strong>
                </NavLink>
            </div>
        </li>
    );
}

export default RecipeItem;
