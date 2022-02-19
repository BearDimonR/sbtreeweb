import _ from "lodash";
import callWebApi from "../helpers/webApiHelper";

export const getPeople = async ({ sort, filters, search = null, page = 1 }) => {
  //TODO use filters
  const response = await callWebApi({
    type: "GET",
    endpoint: "/api/person",
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
    endpoint: `/api/person/${id}`,
    query: {
      events,
    },
  });

  const person = (await response.json()) || null;
  return person;
};

export const getPeopleFullNames = async () => {
  const response = await callWebApi({
    type: "GET",
    endpoint: "/api/person",
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
    endpoint: "/api/person",
    query: {
      params: ["status"],
    },
  });
  const peopleStatuses = await response.json();
  return _.map(peopleStatuses, "status");
};

export const putPerson = async (data) => {
  const response = await callWebApi({
    type: "PUT",
    endpoint: `/api/person/${data.id}`,
    request: data,
  });
  return response.json();
};

export const deletePerson = async (id) => {
  await callWebApi({
    type: "DELETE",
    endpoint: `/api/person/${id}`,
  });
};
