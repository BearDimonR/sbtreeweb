import {
  SET_IS_LOADING,
  SET_USER,
  SET_CONTENT_IS_LOADING,
  SET_SEARCH,
} from "./actionTypes";
import { ROLES } from "../../utils/rolesConstrants";

const reducer = (
  state = {
    isLoading: true,
    access: ROLES.VISITOR,
    user: null,
    contentIsLoading: [],
    search: "",
  },
  action
) => {
  switch (action.type) {
    case SET_IS_LOADING:
      return {
        ...state,
        isLoading: action.value,
      };
    case SET_CONTENT_IS_LOADING:
      const contentIsLoading = state.contentIsLoading;
      if (action.value) {
        contentIsLoading.push(true);
      } else {
        contentIsLoading.pop();
      }
      return {
        ...state,
        contentIsLoading,
      };
    case SET_USER:
      return {
        ...state,
        user: action.value,
        access: action.value?.access || ROLES.VISITOR,
      };
    case SET_SEARCH:
      return {
        ...state,
        search: action.value,
      };
    default:
      return state;
  }
};

export default reducer;
