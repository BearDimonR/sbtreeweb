import { getAccessCall, getUsersCall } from '../utils/json';
import _ from 'lodash';
import { v4 as uuidv4 } from 'uuid';
import {ROLES} from '../utils/rolesConstrants';

export const login = async request => {
    const access = await getAccessCall();
    const users = await getUsersCall(0);
    const auth = _.find(access, request);
    const user = _.find(users, ['id', auth?.userId]);
    if (_.isEmpty(auth) || _.isEmpty(user)) {
        return null;
    }
    return {...user, role: auth.role || 'user', token: auth.token, refresh: auth.refresh};
};

export const registration = async request => {
    const users = await getUsersCall();
    const access = await getAccessCall(0);


    users.push({id: uuidv4(), ...request});
    access.push({...request, userId: uuidv4(), role: ROLES.MEMBER});
};

export const getCurrentUser = async () => {
    const users = await getUsersCall();
    const access = await getAccessCall(0);

    const token = localStorage.getItem('token');
    const obj = _.find(access, ['token', token]);
    const userId = obj?.userId;
    const user = _.find(users, ['id', userId]);
    if (_.isEmpty(user)) {
        return null;
    }
    return {...user, role: obj?.role || 'user'};
};
