import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import RecipeList from '../../components/Recipe/RecipeList';
import RecipeSearch from '../../components/Recipe/RecipeSearch';


const RecipeListPage = props => {
    const [recipes, setRecipes] = useState([]);
    const [search, setSearch] = useState({});
    const [categories, setCategories] = useState([]);
    const [subCategories, setSubCategories] = useState([]);

    useEffect(() => {
        axios.get(props.api + 'recipes/')
        .then(r => {
            const results = r.data;
            setRecipes(results);
        });

        axios.get(props.api + 'recipes/categories/')
        .then(r => {
            setCategories(r.data);
        });
    }, []);

    const findSubCategories = categoryUrl => {
        if (categoryUrl) {
            axios.get(props.api + 'recipes/sub-categories/?parent_category=' + categoryUrl.slice(-2)[0])
            .then(r => {
                setSubCategories(r.data);
            });
        } else {
            setSubCategories([]);
        }
    }

    const constructSearch = () => {
        let searchString = '?';
        for (let att in search) {
            let searchKW = att;
            let searchValue = search[att];
            if (att === 'name') {
                searchKW = 'search';
            }
            if (att === 'category__parent_category__name') {
                if (search[att] === '') {
                    search.category__name = '';
                    findSubCategories();
                } else {
                    const splitSearch = search[att].split(' +++ ');
                    searchValue = splitSearch[0];
                    findSubCategories(splitSearch[1]);
                }
            }
            searchString += searchKW + '=' + searchValue + '&';
        }
        return searchString;
    }

    useEffect(() => {
        // https://www.digitalocean.com/community/tutorials/react-live-search-with-axios#preventing-unnecessary-requests
        axios.get(props.api + 'recipes/' + constructSearch())
        .then(r => {
            const results = r.data;
            setRecipes(results);
        });
    }, [search]);

    return (
        <div className="RecipeList">
            <RecipeSearch
                search={search}
                searchHandler={s => setSearch({...search, ...s})}
                categories={categories}
                subCategories={subCategories} />

            <RecipeList recipes={recipes} />
        </div>
    );
}

const mapStateToProps = state => {
    return {
        api: state.apiBaseURL,
        token: state.token
    };
};
export default connect(mapStateToProps)(RecipeListPage);
