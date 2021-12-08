import _ from 'lodash';
import moment from 'moment';
import { events, eventPerson, people } from "../utils/json";
import {getPerson, getPersonByFullName} from "./peopleService";

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

export const getEvents = (sort={}, filters=[]) => {
    return _.sortBy(filter(events, filters), sort);
};

export const getEvent = (id, people=true) => {
    const event = _.find(events, ['id', id]);
    if (_.isEmpty(event)) {
        return null;
    }
    if (people) {
        return {...event, people: getEventPeople(id)};
    }
    return event;
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
            role: epValue.role, about: epValue.about, activity_id: epValue.id}];
    }, []);
    return res;
};

export const getActivity = (id, additional=true) => {
    const activity = _.find(eventPerson, ['id', id]);
    if (_.isEmpty(activity)) {
        return null;
    }
    if (additional) {
        return {...activity, person: getPerson(activity.person_id, false), event: getEvent(activity.event_id, false)};
    }
    return activity;
}

export const putEvent = (data) => {
    let event = getEvent(data.id, false);
    event = _.merge(event, _.omitBy(data, _.isEmpty));
    return event;
}

export const getEventByName = (name) => {
    return _.find(events, (e) => e.name === name);
};

export const putActivity = (data) => {
    const person = getPersonByFullName(data.person);
    const event = getEventByName(data.event);
    let activity = getActivity(data.id, false);
    //TODO errors?
    activity = _.merge(activity, _.omitBy(data, _.isEmpty), {person_id: person.id, event_id: event.id});
    return activity;
}

export const deleteEvent = (id) => {
    _.remove(events, ['id', id]);
    _.remove(eventPerson, ['event_id', id]);
};

export const deleteActivity = (id) => {
    return _.first(_.remove(eventPerson, ['id', id]));
};