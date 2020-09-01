import React from 'react';
import { NavLink } from 'react-router-dom';


const RecipeItem = props => {
    return (
        <li>
            <strong>
                <NavLink to={'/recipes/' + props.slug} exact>{props.name}</NavLink>
            </strong><br />
            { props.showAuthor ? <NavLink to={'/user/' + props.author.pk} exact>{props.author.username}</NavLink> : null }
        </li>
    );
}

export default RecipeItem;
