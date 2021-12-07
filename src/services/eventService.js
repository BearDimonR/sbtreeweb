import _ from 'lodash';
import moment from 'moment';
import { events, eventPerson, people } from "../utils/json";

const getOp = key => {
    switch(key) {
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

export const getEvents = (sort, filters) => {
    return _.sortBy(filter(events, filters), sort);
};

export const getEvent = (id) => {
    const event = _.find(events, ['id', id]);
    if (_.isEmpty(event)) {
        return null;
    }
    return {...event, people: getEventPeople(id)};
}

export const getEventNames = () => _.sortBy(_.uniq(events.map(e => e.name.trim())), a => a.toLowerCase());
export const getEventСategories = () => _.sortBy(_.uniq(events.map(e => e.category.trim())), a => a.toLowerCase());

export const getEventPeople = (id) => {
    const ep = _.filter(eventPerson, ['event_id', id]);
    const res = people.reduce((res, obj) => {
        const i = _.findIndex(ep, ['person_id', obj.id]);
        if (i === -1) {
            return res;
        }
        const epValue = ep[i];
        return [...res, {...(_.omit(obj, ['email', 'about', 'telephone', 'start', 'end'])),
            role: epValue.role, about: epValue.about}];
    }, []);
    return res;
};