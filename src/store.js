import {
    createStore,
    applyMiddleware,
    combineReducers
} from 'redux';
import thunk from 'redux-thunk';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createBrowserHistory } from 'history';
import profileReducer from './containers/LoginPage/reducer';

export const history = createBrowserHistory();

const initialState = {};

const middlewares = [
    thunk,
    routerMiddleware(history)
];

const reducers = {
    profile: profileReducer,
};

const rootReducer = combineReducers({
    router: connectRouter(history),
    ...reducers
});

const store = createStore(
    rootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middlewares))
);

export default store;