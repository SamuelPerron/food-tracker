import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import RecipeList from '../../components/Recipe/RecipeList';
import RecipeSearch from '../../components/Recipe/RecipeSearch';

import '../../styles/Recipe/RecipePage.scss';
import logo from '../../static/icons/logo.png';


const RecipeListPage = props => {
    const [recipes, setRecipes] = useState([]);
    const [search, setSearch] = useState({});
    const [categories, setCategories] = useState([]);
    const [subCategories, setSubCategories] = useState([]);
    const [searchFocused, setSearchFocused] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        axios.get(props.api + 'recipes/')
        .then(r => {
            const results = r.data;
            setRecipes(results);
            setLoading(false);
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
        <div className="RecipePage">
            <div className="recipes-header"/>
            <div className="header-title">
                <div>
                    <img src={logo} />
                    <h1>Mealtoasty</h1>
                </div>
            </div>

            <RecipeSearch
                search={search}
                focusSearch={() => setSearchFocused(!searchFocused)}
                searchFocused={searchFocused}
                searchHandler={s => setSearch({...search, ...s})}
                categories={categories}
                subCategories={subCategories} />

            <RecipeList recipes={recipes} loading={loading} />
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
