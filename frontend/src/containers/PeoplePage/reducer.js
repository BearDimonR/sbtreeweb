import { PEOPLE_SORT_OPTIONS } from "../../utils/shared";
import {
  SET_PEOPLE,
  SET_INSTANCE,
  SET_FILTER,
  SET_SORT,
  SET_FULL_NAMES,
  SET_STATUSES,
  SET_PAGE,
  SET_TOTAL_PAGES,
} from "./actionTypes";

const reducer = (
  state = {
    list: [],
    instance: {},
    filters: {},
    sort: PEOPLE_SORT_OPTIONS[0].value,
    statuses: [],
    fullNames: [],
    totalPages: 1,
    page: 1,
  },
  action
) => {
  switch (action.type) {
    case SET_PEOPLE:
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
    case SET_FULL_NAMES:
      return {
        ...state,
        fullNames: action.value,
      };
    case SET_STATUSES:
      return {
        ...state,
        statuses: action.value,
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
