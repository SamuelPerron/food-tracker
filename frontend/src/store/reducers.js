import * as types from './actionTypes';
import { API_BASE_URL } from '../env';

const initialState = {
    apiBaseURL: API_BASE_URL,
    headers: {},
    token: null,
};

const reducer = (state = initialState, action) => {
    let newState = {};
    switch (action.type) {
        case types.SET_TOKEN:
            newState = {
                ...state,
                headers: {
                    ...state.headers,
                    Authorization: 'Token ' + action.token
                },
                token: action.token
            }
            return newState;
            break;

        case types.UNSET_TOKEN:
            newState = {
                ...state,
                headers: {
                    ...state.headers,
                    Authorization: null
                },
                token: null,
            }
            return newState;
            break;

        default:
            return state;
    }
}

export default reducer;
