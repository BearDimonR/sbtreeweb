import {
  SET_IS_LOADING,
  SET_USER,
  SET_CONTENT_IS_LOADING,
} from "./actionTypes";
import { ROLES } from "../../utils/rolesConstrants";

const reducer = (
  state = {
    isLoading: true,
    access: ROLES.VISITOR,
    user: null,
    contentIsLoading: false,
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
      return {
        ...state,
        contentIsLoading: action.value,
      };
    case SET_USER:
      return {
        ...state,
        user: action.value,
        access: action.value?.access || ROLES.VISITOR,
      };
    default:
      return state;
  }
};

export default reducer;
