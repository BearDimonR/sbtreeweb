import * as eventService from "../../services/eventService";
import { setContentIsLoading } from "../LoginPage/actions";
import {
  SET_EVENTS,
  SET_INSTANCE,
  SET_SORT,
  SET_FILTER,
  SET_CATEGORIES,
  SET_NAMES,
  SET_ACTIVITY,
  SET_PAGE,
  SET_TOTAL_PAGES,
} from "./actionTypes";
import { handleError } from "../../utils/shared";

const PAGE_SIZE = 12;

export const applyFilter =
  (value = {}) =>
  async (dispatch) => {
    await dispatch(setFilter(value));
    await dispatch(loadEvents());
  };

export const applyEventSort = (value) => async (dispatch) => {
  await dispatch(setSort(value));
  await dispatch(loadEvents());
};

export const loadEvents = () => async (dispatch, getRootState) => {
  handleError(async () => {
    dispatch(setContentIsLoading(true));
    const { event, profile } = getRootState();
    const { pages, items } = await eventService.getEvents({
      sort: event.sort,
      filters: event.filters,
      page: event.page,
      pageSize: PAGE_SIZE,
      search: profile.search,
    });
    dispatch(setEvents(items));
    dispatch(setTotalPages(pages));
    dispatch(setContentIsLoading(false));
  });
};

export const loadEvent = (id) => async (dispatch) => {
  handleError(async () => {
    dispatch(setContentIsLoading(true));
    const event = await eventService.getEvent(id);
    dispatch(setInstance(event));
    dispatch(setContentIsLoading(false));
  });
};

export const loadCategories = () => async (dispatch) => {
  handleError(async () => {
    dispatch(setContentIsLoading(true));
    const categories = await eventService.getEventСategories();
    dispatch(setCategories(categories));
    dispatch(setContentIsLoading(false));
  });
};

export const loadNames = () => async (dispatch) => {
  handleError(async () => {
    dispatch(setContentIsLoading(true));
    const names = await eventService.getEventNames();
    dispatch(setNames(names));
    dispatch(setContentIsLoading(false));
  });
};

export const loadActivity = (id) => async (dispatch) => {
  handleError(async () => {
    dispatch(setContentIsLoading(true));
    const activity = await eventService.getActivity(id);
    dispatch(setActivity(activity));
    dispatch(setContentIsLoading(false));
  });
};

export const editEvent = (data) => async (dispatch, getRootState) => {
  handleError(async () => {
    await eventService.putEvent(data);
    dispatch(loadEvent(data.id));
  });
};

export const editActivity = (data) => async (dispatch, getRootState) => {
  handleError(async () => {
    await eventService.putActivity(data);
    dispatch(loadEvent(data.event_id));
  });
};

export const removeEvent = (id) => async (dispatch, getRootState) => {
  handleError(async () => {
    await eventService.deleteEvent(id);
    dispatch(loadEvents());
  });
};

export const removeActivity = (id) => async (dispatch, getRootState) => {
  handleError(async () => {
    const activity = await eventService.deleteActivity(id);
    dispatch(loadEvent(activity.event_id));
  });
};

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

export const setTotalPages = (value) => async (dispatch) =>
  dispatch({
    type: SET_TOTAL_PAGES,
    value,
  });

export const setPage = (value) => async (dispatch) =>
  dispatch({
    type: SET_PAGE,
    value,
  });
