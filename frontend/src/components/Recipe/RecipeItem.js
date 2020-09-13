import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

const RecipeItem = props => {
    const [author, setAuthor] = useState({});

    useEffect(() => {
        if (props.showAuthor && props.recipes) {
            axios.get(props.author)
            .then(r => {
                setAuthor(r.data);
            });
        }
    }, []);

    return (
        <li style={{backgroundImage: 'url(' + props.image + ')'}}>
            <div className="card-background"/>
            <NavLink to={'/recipes/' + props.slug} exact>
                <strong>{props.name}</strong>
            </NavLink>
            { props.showAuthor ? <NavLink to={'/user/' + author.pk} exact>{author.username}</NavLink> : null }
        </li>
    );
}

export default RecipeItem;
