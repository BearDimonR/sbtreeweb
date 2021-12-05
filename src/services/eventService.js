import _ from 'lodash';
import { events } from "../utils/eventsConstatns";

export const getEvents = (sort) => {
    return _.sortBy(events, sort);
};

export const getEvent = (id) => {
    const event = _.find(events, ['id', id]);
    if (_.isEmpty(event)) {
        return null;
    }
    return event;
}