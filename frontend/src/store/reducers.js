import * as types from './actionTypes';

const initialState = {
    userToken: null,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case types.SET_TOKEN:
            console.log(action.token);
            break;
    }
}
