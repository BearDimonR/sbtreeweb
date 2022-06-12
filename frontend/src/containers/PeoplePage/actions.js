import * as peopleService from "../../services/peopleService";
import * as eventService from "../../services/eventService";
import { setContentIsLoading } from "../LoginPage/actions";
import {
  SET_PEOPLE,
  SET_INSTANCE,
  SET_FILTER,
  SET_SORT,
  SET_FULL_NAMES,
  SET_SPECIALTIES,
  SET_PAGE,
  SET_TOTAL_PAGES,
} from "./actionTypes";
import { handleError } from "../../utils/shared";

const PAGE_SIZE = 20;

export const applyFilter =
  (value = {}) =>
  async (dispatch, getRootState) => {
    dispatch(setFilter(value));
    dispatch(loadPeople());
  };

export const applyPersonSort = (value) => async (dispatch, getRootState) => {
  dispatch(setSort(value));
  dispatch(loadPeople());
};

export const loadPeople = () => async (dispatch, getRootState) => {
  handleError(async () => {
    dispatch(setContentIsLoading(true));
    const { person, profile } = getRootState();
    const { pages, items } = await peopleService.getPeople({
      sort: person.sort,
      filters: person.filters,
      page: person.page,
      pageSize: PAGE_SIZE,
      search: profile.search,
    });
    dispatch(setPeople(items));
    dispatch(setTotalPages(pages));
    dispatch(setContentIsLoading(false));
  });
};

export const loadPerson = (id) => async (dispatch, getRootState) => {
  handleError(async () => {
    dispatch(setContentIsLoading(true));
    const store = getRootState();
    const access = store.profile.access;
    let person = {};
    if (access) {
      person = await peopleService.getPerson(id);
    } else {
      person = await peopleService.getPersonShort(id);
    }
    dispatch(setInstance(person));
    dispatch(setContentIsLoading(false));
  });
};

export const loadSpecialties = () => async (dispatch) => {
  handleError(async () => {
    dispatch(setContentIsLoading(true));
    const specialties = await peopleService.getPeopleSpecialties();
    dispatch(setSpecialties(specialties));
    dispatch(setContentIsLoading(false));
  });
};

export const loadFullNames = () => async (dispatch) => {
  handleError(async () => {
    dispatch(setContentIsLoading(true));
    const names = await peopleService.getPeopleFullNames();
    dispatch(setFullNames(names));
    dispatch(setContentIsLoading(false));
  });
};

export const editPerson = (data) => async (dispatch, getRootState) => {
  handleError(async () => {
    dispatch(setContentIsLoading(true));
    await peopleService.putPerson(data);
    dispatch(loadPerson(data.id));
    dispatch(setContentIsLoading(false));
  });
};

export const editActivity = (data) => async (dispatch, getRootState) => {
  handleError(async () => {
    dispatch(setContentIsLoading(true));
    await eventService.putActivity(data);
    dispatch(loadPerson(data.personId));
    dispatch(setContentIsLoading(false));
  });
};

export const removePerson = (id) => async (dispatch, getRootState) => {
  handleError(async () => {
    dispatch(setContentIsLoading(true));
    await peopleService.deletePerson(id);
    dispatch(loadPeople());
    dispatch(setContentIsLoading(false));
  });
};

export const removeActivity = (id) => async (dispatch, getRootState) => {
  const store = getRootState();
  const personId = store.person.instance.id;
  handleError(async () => {
    dispatch(setContentIsLoading(true));
    await eventService.deleteActivity(id);
    dispatch(loadPerson(personId));
    dispatch(setContentIsLoading(false));
  });
};

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

export const setSpecialties = (value) => async (dispatch) =>
  dispatch({
    type: SET_SPECIALTIES,
    value,
  });

export const setFullNames = (value) => async (dispatch) =>
  dispatch({
    type: SET_FULL_NAMES,
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
