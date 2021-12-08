import _ from 'lodash';
import moment from 'moment';
import { people } from "../utils/json";

const getOp = key => {
    switch(key) {
        case 'start':
            return ({start, end}, b) => {
                const val = b['start'];
                moment(val).isBefore(end) && moment(val).isAfter(start)
            };
        case 'fullName':
            return (a, b) => _.findIndex(a, el => el === `${b.surname} ${b.name}`) !== -1;
        case 'status':
            return (a, b) => _.findIndex(a, el => el === b.status) !== -1;
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
    return op(value, obj);
}));

export const getPeople = (sort, filters) => {
    return _.sortBy(filter(people, filters), sort);
};

export const getPerson = (id, events=true) => {
    const person = _.find(people, ['id', id]);
    if (_.isEmpty(person)) {
        return null;
    }
    if (events) {
        //TODO events
        return person;
    }
    return person;
}

export const getPeopleFullNames = () => _.sortBy(_.uniq(people.map(e => `${e.surname} ${e.name}`)), a => a.toLowerCase());
export const getPeopleStatuses = () => _.sortBy(_.uniq(people.map(e => e.status)), a => a.toLowerCase());

export const getPersonByFullName = (fullName) => _.find(people, (p) => `${p.surname} ${p.name}` === fullName);