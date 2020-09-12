import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

const IngredientItem = props => {
    return (
        <li>
            <strong>{props.ingredient_name.name}</strong>
            { props.serving.for_list_name !== '' ?
                <span>{props.quantity} {props.serving.for_list_name}{ props.quantity > 1 ? 's' : null}</span>
            :
                props.serving.grams != 0 ?
                    <span>{Math.round(props.serving.grams * props.quantity)} g</span>
                :
                    <span>{Math.round(props.serving.milliliters * props.quantity)} ml</span>

            }
        </li>
    );
}

export default IngredientItem;
