import React from 'react';

const RecipeSearch = props => {
    return (
        <div>
            <h2>Search</h2>
            <ul>
                <li>
                    <span>Name</span>
                    <input value={props.search.name} onChange={e => props.searchHandler({'name': e.target.value})}/>
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
