import { getAccessCall, getPeopleCall } from '../utils/json';
import _ from 'lodash';
import { v4 as uuidv4 } from 'uuid';
import {ROLES} from '../utils/rolesConstrants';

export const login = async request => {
    const access = await getAccessCall();
    const people = await getPeopleCall(0);
    const auth = _.find(access, request);
    const user = _.find(people, ['id', auth?.userId]);
    if (_.isEmpty(auth) || _.isEmpty(user)) {
        return null;
    }
    return {...user, ...auth, role: auth.role || 'user'};
};

export const registration = async request => {
    const people = await getPeopleCall();
    const access = await getAccessCall(0);


    people.push({id: uuidv4(), ...request});
    access.push({...request, userId: uuidv4(), role: ROLES.MEMBER});
};

export const getCurrentUser = async () => {
    const people = await getPeopleCall();
    const access = await getAccessCall(0);

    const token = localStorage.getItem('token');
    const obj = _.find(access, ['token', token]);
    const userId = obj?.userId;
    const person = _.find(people, ['id', userId]);
    if (_.isEmpty(person)) {
        return null;
    }
    return {...person, ...obj, role: obj.role || 'user'};
};
