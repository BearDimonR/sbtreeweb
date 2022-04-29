import { EVENTS_SORT_OPTIONS } from "../../utils/shared";
import {
  SET_EVENTS,
  SET_INSTANCE,
  SET_FILTER,
  SET_SORT,
  SET_NAMES,
  SET_CATEGORIES,
  SET_ACTIVITY,
  SET_PAGE,
  SET_TOTAL_PAGES,
} from "./actionTypes";

const reducer = (
  state = {
    list: [],
    instance: {},
    filters: {},
    sort: EVENTS_SORT_OPTIONS[0].value,
    categories: [],
    names: [],
    activity: null,
    totalPages: 1,
    page: 1,
  },
  action
) => {
  switch (action.type) {
    case SET_EVENTS:
      return {
        ...state,
        list: action.value,
      };
    case SET_INSTANCE:
      return {
        ...state,
        instance: action.value,
      };
    case SET_SORT:
      return {
        ...state,
        sort: action.value,
      };
    case SET_FILTER:
      return {
        ...state,
        filters: action.value,
      };
    case SET_NAMES:
      return {
        ...state,
        names: action.value,
      };
    case SET_CATEGORIES:
      return {
        ...state,
        categories: action.value,
      };
    case SET_ACTIVITY:
      return {
        ...state,
        activity: action.value,
      };
    case SET_TOTAL_PAGES:
      return {
        ...state,
        totalPages: action.value,
      };
    case SET_PAGE:
      return {
        ...state,
        page: action.value,
      };
    default:
      return state;
  }
};

export default reducer;
