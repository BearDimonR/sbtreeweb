import * as authService from "../../services/authService";
import {
  SET_IS_LOADING,
  SET_USER,
  SET_CONTENT_IS_LOADING,
  SET_SEARCH,
} from "./actionTypes";

const setIsLoading = (value) => async (dispatch) =>
  dispatch({
    type: SET_IS_LOADING,
    value,
  });

export const setUser = (value) => async (dispatch) => {
  dispatch({
    type: SET_USER,
    value,
  });
};

export const setContentIsLoading = (value) => async (dispatch) =>
  dispatch({
    type: SET_CONTENT_IS_LOADING,
    value,
  });

export const setSearch = (value) => async (dispatch) =>
  dispatch({
    type: SET_SEARCH,
    value,
  });

export const loadCurrentUser = () => async (dispatch) => {
  authService
    .getCurrentUser()
    .then((user) => dispatch(setUser(user)))
    .catch(() => console.log("No token -> Go to login"))
    .finally(() => {
      dispatch(setIsLoading(false));
    });
};

export const logout = () => async (dispatch) => {
  localStorage.setItem("token", "");
  await dispatch(setUser(null));
};
