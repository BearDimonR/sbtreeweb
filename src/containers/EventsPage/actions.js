import { getEvents, getEvent } from "../../services/eventService"
import { SET_EVENTS, SET_INSTANCE } from "./actionTypes";

const setEvents = value => async dispatch => dispatch({
    type: SET_EVENTS,
    value
});

const setInstance = value => async dispatch => dispatch({
    type: SET_INSTANCE,
    value
});

export const loadEvents = (sort) => async dispatch => {
    const events = getEvents(sort);
    dispatch(setEvents(events));
}

export const loadEvent = (id) => async dispatch => {
    const event = getEvent(id);
    dispatch(setInstance(event));
};