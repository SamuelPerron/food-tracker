import * as types from './actionTypes';

const initialState = {
    apiBaseURL: 'http://localhost:8000/',
    headers: {},
    user: null,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case types.SET_TOKEN:
            let newState = {
                ...state,
                headers: {
                    ...state.headers,
                    Authorization: 'Token ' + action.token
                },
                user: action.user
            }
            return newState;
            break;

        default:
            return state;
    }
}

export default reducer;
