import {SET_EVENTS, SET_INSTANCE} from './actionTypes';

const reducer = (state = {list: [], instance: {}}, action) => {
    switch (action.type) {
        case SET_EVENTS:
            return {
                ...state,
                list: action.value,
            }
        case SET_INSTANCE:
            return {
                ...state,
                instance: action.value
            }
        default:
            return state;
    }
};

export default reducer;