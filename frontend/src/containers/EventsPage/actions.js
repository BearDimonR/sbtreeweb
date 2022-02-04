import * as eventService from "../../services/eventService";
import {
  SET_EVENTS,
  SET_INSTANCE,
  SET_SORT,
  SET_FILTER,
  SET_CATEGORIES,
  SET_NAMES,
  SET_ACTIVITY,
} from "./actionTypes";

const setEvents = (value) => async (dispatch) =>
  dispatch({
    type: SET_EVENTS,
    value,
  });

const setInstance = (value) => async (dispatch) =>
  dispatch({
    type: SET_INSTANCE,
    value,
  });

export const setSort = (value) => async (dispatch) =>
  dispatch({
    type: SET_SORT,
    value,
  });

export const setFilter = (value) => async (dispatch) =>
  dispatch({
    type: SET_FILTER,
    value,
  });

export const setCategories = (value) => async (dispatch) =>
  dispatch({
    type: SET_CATEGORIES,
    value,
  });

export const setNames = (value) => async (dispatch) =>
  dispatch({
    type: SET_NAMES,
    value,
  });

export const setActivity = (value) => async (dispatch) =>
  dispatch({
    type: SET_ACTIVITY,
    value,
  });

export const applyFilter =
  (value = []) =>
  async (dispatch, getRootState) => {
    const { event } = getRootState();
    await dispatch(setFilter(value));
    return await dispatch(loadEvents(event.sort, value));
  };

export const applyEventSort = (value) => async (dispatch, getRootState) => {
  const { event } = getRootState();
  await dispatch(setSort(value));
  return await dispatch(loadEvents(value, event.filters));
};

export const loadEvents = () => async (dispatch, getRootState) => {
  const { event } = getRootState();
  const events = await eventService.getEvents(event.sort, event.filters);
  return dispatch(setEvents(events));
};

export const loadEvent = (id) => async (dispatch) => {
  const event = await eventService.getEvent(id);
  return dispatch(setInstance(event));
};

export const loadCategories = () => async (dispatch) => {
  const categories = await eventService.getEventСategories();
  return dispatch(setCategories(categories));
};

export const loadNames = () => async (dispatch) => {
  const names = await eventService.getEventNames();
  return dispatch(setNames(names));
};

export const loadActivity = (id) => async (dispatch) => {
  const activity = await eventService.getActivity(id);
  return dispatch(setActivity(activity));
};

export const editEvent = (data) => async (dispatch, getRootState) => {
  await eventService.putEvent(data);
  return dispatch(loadEvent(data.id));
};

export const editActivity = (data) => async (dispatch, getRootState) => {
  await eventService.putActivity(data);
  return dispatch(loadEvent(data.event_id));
};

export const removeEvent = (id) => async (dispatch, getRootState) => {
  await eventService.deleteEvent(id);
  return dispatch(loadEvents());
};

export const removeActivity = (id) => async (dispatch, getRootState) => {
  const activity = await eventService.deleteActivity(id);
  return dispatch(loadEvent(activity.event_id));
};

export const searchEvents = (name) => async (dispatch, getRootState) => {
  const { event } = getRootState();
  const events = await eventService.getEvents(event.sort, event.filters);
  if (name) {
    return dispatch(
      setEvents(
        events.filter((e) =>
          e.name.toLowerCase().includes(name.toLowerCase().trim())
        )
      )
    );
  }
  return dispatch(setEvents(events));
};
