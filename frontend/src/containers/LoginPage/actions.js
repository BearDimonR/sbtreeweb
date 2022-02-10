import * as authService from "../../services/authService";
import { errorHandler } from "../../utils/shared";
import {
  SET_IS_LOADING,
  SET_USER,
  SET_CONTENT_IS_LOADING,
} from "./actionTypes";

const setIsLoading = (value) => async (dispatch) =>
  dispatch({
    type: SET_IS_LOADING,
    value,
  });

const setToken = (token) => {
  localStorage.setItem("token", token);
};

export const setUser = (value) => async (dispatch) => {
  dispatch({
    type: SET_USER,
    value,
  });
}

export const checkLoggedIn = () => async (dispatch) => {
  authService.getCurrentUser()
    .then(user => dispatch(setUser(user)))
    .catch(() => console.log('No token -> Go to login'))
    .finally(() => {
      dispatch(setIsLoading(false));
    });
};

export const logout = () => async (dispatch) => {
  setToken("");
  await dispatch(setUser(null));
};

export const loadCurrentUser = () => async (dispatch) => {
  const user = await authService.getCurrentUser()
    .catch(() => console.log('No token -> Go to login'))
  await dispatch(setUser(user));
};

export const setContentIsLoading = (value) => async (dispatch) =>
  dispatch({
    type: SET_CONTENT_IS_LOADING,
    value,
  });
