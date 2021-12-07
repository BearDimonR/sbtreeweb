import _ from 'lodash';
import moment from 'moment';
import { people } from "../utils/json";

const getOp = key => {
    switch(key) {
        //TODO write filter
        case 'start':
            return ({start, end}, b) => moment(b).isBefore(end) && moment(b).isAfter(start);
        case 'name':
            return (a, b) => _.findIndex(a, el => el === b) !== -1;
        case 'category':
            return (a, b) => _.findIndex(a, el => el === b) !== -1;
        default:
            return new Error('Unknown key');
    }
}

const filter = (array, filters={}) => array.filter((obj) => Object.keys(filters).every((key) => {
    const value = filters[key];
    const op = getOp(key);
    if (_.isEmpty(value)) {
        return true;
    }
    return op(value, obj[key]);
}));

export const getPeople = (sort, filters) => {
    return _.sortBy(filter(people, filters), sort);
};

export const getPerson = (id) => {
    const person = _.find(people, ['id', id]);
    if (_.isEmpty(person)) {
        return null;
    }
    return person;
}

export const getPeopleFullNames = () => _.sortBy(_.uniq(people.map(e => `${e.surname} ${e.name}`)), a => a.toLowerCase());
export const getPeopleStatuses = () => _.sortBy(_.uniq(people.map(e => e.status)), a => a.toLowerCase());