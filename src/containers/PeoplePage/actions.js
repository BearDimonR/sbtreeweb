import { getPeople, getPerson, getPeopleFullNames, getPeopleStatuses, putPerson, deletePerson } from "../../services/peopleService"
import { putActivity, deleteActivity } from "../../services/eventService"
import {SET_PEOPLE, SET_INSTANCE, SET_FILTER, SET_SORT, SET_FULL_NAMES, SET_STATUSES} from './actionTypes';

const setPeople = value => async dispatch => dispatch({
    type: SET_PEOPLE,
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

export const setStatuses = value => async dispatch => dispatch({
    type: SET_STATUSES,
    value
});

export const setFullNames = value => async dispatch => dispatch({
    type: SET_FULL_NAMES,
    value
});
export const applyFilter = (value=[]) => async (dispatch, getRootState) => {
    const { event } = getRootState();
    dispatch(setFilter(value));
    dispatch(loadPeople(event.sort, value));
};

export const applyPersonSort = value => async (dispatch, getRootState) => {
    const { event } = getRootState();
    dispatch(setSort(value));
    dispatch(loadPeople(value, event.filters));
};


export const loadPeople = () => async (dispatch, getRootState) => {
    const { person } = getRootState();
    const people = getPeople(person.sort, person.filters);
    dispatch(setPeople(people));
}

export const loadPerson = (id) => async dispatch => {
    const person = getPerson(id);
    dispatch(setInstance(person));
};

export const loadStatuses = () => async dispatch => {
    const statuses = getPeopleStatuses();
    dispatch(setStatuses(statuses));
};

export const loadFullNames = () => async dispatch => {
    const names = getPeopleFullNames();
    dispatch(setFullNames(names));
};

export const editPerson = (data) => async (dispatch, getRootState) => {
    putPerson(data);
    dispatch(loadPerson(data.id));
};

export const editActivity = (data) => async (dispatch, getRootState) => {
    putActivity(data);
    dispatch(loadPerson(data.person_id));

};

export const removePerson = (id) => async (dispatch, getRootState) => {
    deletePerson(id);
    dispatch(loadPeople());
}

export const removeActivity = (id) => async (dispatch, getRootState) => {
    const activity = deleteActivity(id);
    dispatch(loadPerson(activity.person_id));

};