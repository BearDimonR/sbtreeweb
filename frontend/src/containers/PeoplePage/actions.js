import * as peopleService from "../../services/peopleService";
import * as eventService from "../../services/eventService";
import {
  SET_PEOPLE,
  SET_INSTANCE,
  SET_FILTER,
  SET_SORT,
  SET_FULL_NAMES,
  SET_STATUSES,
} from "./actionTypes";

const setPeople = (value) => async (dispatch) =>
  dispatch({
    type: SET_PEOPLE,
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

export const setStatuses = (value) => async (dispatch) =>
  dispatch({
    type: SET_STATUSES,
    value,
  });

export const setFullNames = (value) => async (dispatch) =>
  dispatch({
    type: SET_FULL_NAMES,
    value,
  });
export const applyFilter =
  (value = []) =>
  async (dispatch, getRootState) => {
    const { event } = getRootState();
    await dispatch(setFilter(value));
    return await dispatch(loadPeople(event.sort, value));
  };

export const applyPersonSort = (value) => async (dispatch, getRootState) => {
  const { event } = getRootState();
  await dispatch(setSort(value));
  return await dispatch(loadPeople(value, event.filters));
};

export const loadPeople = () => async (dispatch, getRootState) => {
  const { person } = getRootState();
  const people = await peopleService.getPeople(person.sort, person.filters);
  return await dispatch(setPeople(people));
};

export const loadPerson = (id) => async (dispatch) => {
  const person = await peopleService.getPerson(id);
  return await dispatch(setInstance(person));
};

export const loadStatuses = () => async (dispatch) => {
  const statuses = await peopleService.getPeopleStatuses();
  return await dispatch(setStatuses(statuses));
};

export const loadFullNames = () => async (dispatch) => {
  const names = await peopleService.getPeopleFullNames();
  return await dispatch(setFullNames(names));
};

export const editPerson = (data) => async (dispatch, getRootState) => {
  await peopleService.putPerson(data);
  return await dispatch(loadPerson(data.id));
};

export const editActivity = (data) => async (dispatch, getRootState) => {
  await eventService.putActivity(data);
  return await dispatch(loadPerson(data.person_id));
};

export const removePerson = (id) => async (dispatch, getRootState) => {
  await peopleService.deletePerson(id);
  return await dispatch(loadPeople());
};

export const removeActivity = (id) => async (dispatch, getRootState) => {
  const activity = await eventService.deleteActivity(id);
  return await dispatch(loadPerson(activity.person_id));
};

export const searchPeople = (fullName) => async (dispatch, getRootState) => {
  const { person } = getRootState();
  const people = await peopleService.getPeople(person.sort, person.filters);
  if (fullName) {
    return dispatch(
      setPeople(
        people.filter((e) =>
          `${e.surname} ${e.name} ${e.parental || ""}`
            .toLowerCase()
            .includes(fullName.toLowerCase().trim())
        )
      )
    );
  }
  return dispatch(setPeople(people));
};
