import { set } from "lodash";
import { getEvents, getEvent, getEventNames, getEventСategories } from "../../services/eventService"
import { SET_EVENTS, SET_INSTANCE, SET_SORT, SET_FILTER, SET_CATEGORIES, SET_NAMES } from "./actionTypes";

const setEvents = value => async dispatch => dispatch({
    type: SET_EVENTS,
    value
});

const setInstance = value => async dispatch => dispatch({
    type: SET_INSTANCE,
    value
});

export const setSort = value => async dispatch => dispatch({
    type: SET_SORT,
    value
});

export const setFilter = value => async dispatch => dispatch({
    type: SET_FILTER,
    value
});

export const setCategories = value => async dispatch => dispatch({
    type: SET_CATEGORIES,
    value
});

export const setNames = value => async dispatch => dispatch({
    type: SET_NAMES,
    value
});
export const applyFilter = (value=[]) => async (dispatch, getRootState) => {
    const { event } = getRootState();
    dispatch(setFilter(value));
    dispatch(loadEvents(event.sort, value));
};

export const applySort = value => async (dispatch, getRootState) => {
    const { event } = getRootState();
    dispatch(setSort(value));
    dispatch(loadEvents(value, event.filters));
};


export const loadEvents = () => async (dispatch, getRootState) => {
    const { event } = getRootState();
    const events = getEvents(event.sort, event.filters);
    dispatch(setEvents(events));
}

export const loadEvent = (id) => async dispatch => {
    const event = getEvent(id);
    dispatch(setInstance(event));
};

export const loadCategories = () => async dispatch => {
    const categories = getEventСategories();
    dispatch(setCategories(categories));
};

export const loadNames = () => async dispatch => {
    const names = getEventNames();
    console.log(names);
    dispatch(setNames(names));
};