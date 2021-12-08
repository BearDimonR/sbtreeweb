import { getEvents, getEvent, getEventNames, getEventСategories, getActivity, putEvent, deleteEvent, putActivity, deleteActivity } from "../../services/eventService"
import { SET_EVENTS, SET_INSTANCE, SET_SORT, SET_FILTER, SET_CATEGORIES, SET_NAMES, SET_ACTIVITY } from "./actionTypes";
import _ from 'lodash';

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

export const setActivity = value => async dispatch => dispatch({
    type: SET_ACTIVITY,
    value
});

export const applyFilter = (value=[]) => async (dispatch, getRootState) => {
    const { event } = getRootState();
    dispatch(setFilter(value));
    dispatch(loadEvents(event.sort, value));
};

export const applyEventSort = value => async (dispatch, getRootState) => {
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
    dispatch(setNames(names));
};

export const loadActivity = (id) => async dispatch => {
    const activity = getActivity(id);
    dispatch(setActivity(activity));
};

export const editEvent = (data) => async (dispatch, getRootState) => {
    putEvent(data);
    dispatch(loadEvent(data.id));
};

export const editActivity = (data) => async (dispatch, getRootState) => {
    putActivity(data);
    dispatch(loadEvent(data.event_id));
};

export const removeEvent = (id) => async (dispatch, getRootState) => {
    deleteEvent(id);
    dispatch(loadEvents());
}

export const removeActivity = (id) => async (dispatch, getRootState) => {
    const activity = deleteActivity(id);
    dispatch(loadEvent(activity.event_id));
};