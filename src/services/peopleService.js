import _ from "lodash";
import moment from "moment";
import { getPeopleCall, getActivityCall, getEventsCall } from "../utils/json";

const getOp = (key) => {
  switch (key) {
    case "start":
      return ({ start, end }, b) => {
        const val = b["start"];
        moment(val).isBefore(end) && moment(val).isAfter(start);
      };
    case "fullName":
      return (a, b) =>
        _.findIndex(a, (el) => el === `${b.surname} ${b.name}`) !== -1;
    case "status":
      return (a, b) => _.findIndex(a, (el) => el === b.status) !== -1;
    default:
      return new Error("Unknown key");
  }
};

const filter = (array, filters = {}) =>
  array.filter((obj) =>
    Object.keys(filters).every((key) => {
      const value = filters[key];
      const op = getOp(key);
      if (_.isEmpty(value)) {
        return true;
      }
      return op(value, obj);
    })
  );

export const getPeople = async (sort, filters) => {
  const people = await getPeopleCall();

  return _.sortBy(filter(people, filters), sort);
};

export const getPerson = async (id, ppl = true) => {
  const people = await getPeopleCall();

  const person = _.find(people, ["id", id]);
  if (_.isEmpty(person)) {
    return null;
  }
  if (ppl) {
    return { ...person, events: await getPersonEvents(person.id) };
  }
  return person;
};

export const getPersonEvents = async (id) => {
  const eventPerson = await getActivityCall();
  const events = await getEventsCall(0);

  const ep = _.filter(eventPerson, ["person_id", id]);
  const res = events.reduce((res, obj) => {
    const i = _.findIndex(ep, ["event_id", obj.id]);
    if (i === -1) {
      return res;
    }
    const epValue = ep[i];
    return [
      ...res,
      {
        ..._.omit(obj, []),
        role: epValue.role,
        about: epValue.about,
        activity_id: epValue.id,
      },
    ];
  }, []);
  return res;
};

export const getPeopleFullNames = async () => {
  const people = await getPeopleCall();

  return _.sortBy(_.uniq(people.map((e) => `${e.surname} ${e.name}`)), (a) =>
    a.toLowerCase()
  );
};
export const getPeopleStatuses = async () => {
  const people = await getPeopleCall();

  return _.sortBy(_.uniq(people.map((e) => e.status)), (a) => a.toLowerCase());
};

export const getPersonByFullName = async (fullName) => {
  const people = await getPeopleCall();

  return _.find(people, (p) => `${p.surname} ${p.name}` === fullName);
};

export const deletePerson = async (id) => {
  const people = await getPeopleCall();
  const eventPerson = await getActivityCall();

  _.remove(people, ["id", id]);
  _.remove(eventPerson, ["person_id", id]);
};

export const putPerson = async (data) => {
  let person = await getPerson(data.id, false);
  person = _.merge(person, _.omitBy(data, _.isEmpty));
  return person;
};
