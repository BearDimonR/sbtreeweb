import { access, users } from '../utils/personConstants';
import _ from 'lodash';
import { v4 as uuidv4 } from 'uuid';
import {ROLES} from '../utils/rolesConstrants';

export const login = async request => {
    const auth = _.find(access, request);
    if (_.isEmpty(auth)) {
        return null;
    }
    return auth;
};

export const registration = async request => {
    users.push({id: uuidv4(), ...request});
    access.push({...request, userId: uuidv4(), role: ROLES.MEMBER});
};

export const getCurrentUser = async () => {
    const token = localStorage.getItem('token');
    const obj = _.find(access, ['token', token]);
    const userId = obj?.userId;
    const user = _.find(users, ['id', userId]);
    if (_.isEmpty(user)) {
        return null;
    }
    return {...user, role: obj?.role || 'user'};
};
