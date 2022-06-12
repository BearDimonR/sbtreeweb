import _ from "lodash";
import callWebApi from "../helpers/webApiHelper";

export const getPeople = async ({
  sort,
  filters,
  search = null,
  page = 1,
  pageSize,
}) => {
  const response = await callWebApi({
    type: "POST",
    endpoint: "/api/person/filter",
    request: {
      page: page,
      sort: [sort],
      search,
      filters,
      pageSize,
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

export const getPersonShort = async (id, events = true) => {
  const response = await callWebApi({
    type: "GET",
    endpoint: `/api/person/${id}/short`,
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
      params: ["id", "surname", "name"],
    },
  });
  const peopleInfo = await response.json();
  return _.map(peopleInfo, (value) => ({
    id: value.id,
    fullName: `${value.surname} ${value.name}`,
  }));
};

export const getPeopleSpecialties = async () => {
  const response = await callWebApi({
    type: "GET",
    endpoint: "/api/person",
    query: {
      params: ["specialty"],
    },
  });
  const peopleStatuses = await response.json();
  return _.map(peopleStatuses, "specialty");
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
