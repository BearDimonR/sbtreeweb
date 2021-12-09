import {SET_PEOPLE, SET_INSTANCE, SET_FILTER, SET_SORT, SET_FULL_NAMES, SET_STATUSES} from './actionTypes';
import {peopleSortOptions} from '../../utils/sortOptions';

const reducer = (state = {
        list: [], 
        instance: {}, 
        filters: [], 
        sort: peopleSortOptions[0].value,
        statuses: [],
        fullNames: [],
    }, action) => {
    //console.log('person: ' + action.type);
    switch (action.type) {
        case SET_PEOPLE:
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
        case SET_FULL_NAMES:
            return {
                ...state,
                fullNames: action.value,
            }
        case SET_STATUSES:
            return {
                ...state,
                statuses: action.value,
            }
        default:
            return state;
    }
};

export default reducer;