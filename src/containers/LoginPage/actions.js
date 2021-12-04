import * as authService from '../../services/authService';
import {SET_IS_LOADING, SET_USER} from './actionTypes';

const setTokens = (token, refreshToken) => {
    localStorage.setItem('token', token);
    localStorage.setItem('refreshToken', refreshToken);
};

const setIsLoading = value => async dispatch => dispatch({
    type: SET_IS_LOADING,
    value,
});

const setUser = value => async dispatch => dispatch({
    type: SET_USER,
    value
});

export const checkLoggedIn = () => async dispatch => {
    const user = await authService.getCurrentUser();
    if (user) {
        await dispatch(setUser(user));
    }
    await dispatch(setIsLoading(false));
};

export const login = (request) => async dispatch => {
    const data = await authService.login(request);
    if (data) {
        setTokens(data.token, data.refresh);
        await dispatch(setIsLoading(false));
        await dispatch(setUser(data));
    } else {
        throw new Error('Wrong credentials');
    }
};

export const register = async (request) => {
    await authService.registration(request);
};

export const logout = () => async (dispatch) => {
    setTokens('', '');
    await dispatch(setUser(null));
}

export const loadCurrentUser = () => async (dispatch) => {
    const user = await authService.getCurrentUser();
    await dispatch(setUser(user));
};
