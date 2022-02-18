import _ from "lodash";
import callWebApi from "../helpers/webApiHelper";
import { getActivityCall, getEventsCall } from "../utils/json";

export const getPeople = async ({ sort, filters, search = null, page = 1 }) => {
  const response = await callWebApi({
    type: "GET",
    endpoint: "/api/user",
    query: {
      page: page,
      sort: [sort],
      search,
    },
  });
  return response.json();
};

export const getPerson = async (id, events = true) => {
  const response = await callWebApi({
    type: "GET",
    endpoint: `/api/user/${id}`,
    query: {
      events,
    },
  });

  const person = (await response.json()) || null;
  return person;
};

export const getPersonEvents = async (id) => {
  //TODO test it
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
  const response = await callWebApi({
    type: "GET",
    endpoint: "/api/user",
    query: {
      params: ["surname", "name"],
    },
  });
  const peopleNames = await response.json();
  return _.map(peopleNames, (value) => `${value.surname} ${value.name}`);
};

export const getPeopleStatuses = async () => {
  const response = await callWebApi({
    type: "GET",
    endpoint: "/api/user",
    query: {
      params: ["status"],
    },
  });
  const peopleStatuses = await response.json();
  return _.map(peopleStatuses, "status");
};

export const deletePerson = async (id) => {
  await callWebApi({
    type: "DELETE",
    endpoint: `/api/user/${id}`,
  });
};

export const putPerson = async (data) => {
  const response = await callWebApi({
    type: "PUT",
    endpoint: `/api/user/${data.id}`,
    request: data,
  });
  return response.json();
};
