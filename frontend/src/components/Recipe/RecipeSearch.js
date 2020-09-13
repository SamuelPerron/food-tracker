import React from 'react';

import loopIcon from '../../static/icons/loop.png';

const RecipeSearch = props => {
    return (
        <div className="RecipeSearch">
            <ul>
                <li>
                    <input
                        value={props.search.name}
                        onChange={e => props.searchHandler({'name': e.target.value})}
                        placeholder="Search recipes..." />
                </li>
                <li>
                    <span>Category</span>
                    <select value={props.search.category__parent_category__name} onChange={e => props.searchHandler({'category__parent_category__name': e.target.value})}>
                        <option/>
                        {
                            props.categories.map(c => (
                                <option key={c.url} value={c.name + ' +++ ' + c.url}>{c.name}</option>
                            ))
                        }
                    </select>
                </li>
                { props.subCategories.length > 0 ?
                    <li>
                        <span>Sub Category</span>
                        <select value={props.search.category__name} onChange={e => props.searchHandler({'category__name': e.target.value})}>
                            <option/>
                            {
                                props.subCategories.map(c => (
                                    <option key={c.url} value={c.name}>{c.name}</option>
                                ))
                            }
                        </select>
                    </li>
                : null }
            </ul>
        </div>
    );
}

export default RecipeSearch;
