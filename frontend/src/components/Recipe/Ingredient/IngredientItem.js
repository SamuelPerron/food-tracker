import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

const IngredientItem = props => {
    return (
        <li>
            <strong>{props.ingredient_name.name}</strong>
            { props.serving.for_list_name !== '' ?
                <em>{props.quantity} {props.serving.for_list_name}{ props.quantity > 1 ? 's' : null}</em>
            :
                props.serving.grams != 0 ?
                    <em>{Math.round(props.serving.grams * props.quantity)} g</em>
                :
                    <em>{Math.round(props.serving.milliliters * props.quantity)} ml</em>
            }
        </li>
    );
}

export default IngredientItem;
