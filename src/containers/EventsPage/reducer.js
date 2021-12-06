import {SET_EVENTS, SET_INSTANCE, SET_FILTER, SET_SORT, SET_NAMES, SET_CATEGORIES} from './actionTypes';
import {eventsSortOptions} from '../../utils/sortOptions';

const reducer = (state = {
        list: [], 
        instance: {}, 
        filters: [], 
        sort: eventsSortOptions[0].value,
        categories: [],
        names: [],
    }, action) => {
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
        case SET_SORT:
            return {
                ...state,
                sort: action.value,
            }
        case SET_FILTER:
            return {
                ...state,
                filters: action.value,
            }
        case SET_NAMES:
            return {
                ...state,
                names: action.value,
            }
        case SET_CATEGORIES:
            return {
                ...state,
                categories: action.value,
            }
        default:
            return state;
    }
};

export default reducer;