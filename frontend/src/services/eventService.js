import _ from "lodash";
import callWebApi from "../helpers/webApiHelper";

export const getEvents = async ({ sort, filters, search = null, page = 1 }) => {
  //TODO add filter and search
  const response = await callWebApi({
    type: "GET",
    endpoint: "/api/activity",
    query: {
      page: page,
      sort: [sort],
      search,
    },
  });
  return response.json();
};

export const getEvent = async (id, people = true) => {
  //TODO people remove
  const response = await callWebApi({
    type: "GET",
    endpoint: `/api/activity/${id}`,
    query: {
      people,
    },
  });
  const event = (await response.json()) || null;
  return event;
};

export const getEventNames = async () => {
  const response = await callWebApi({
    type: "GET",
    endpoint: "/api/activity",
    query: {
      params: ["name"],
    },
  });
  const eventNames = await response.json();
  return _.map(eventNames, "name");
};

export const getEventСategories = async () => {
  const response = await callWebApi({
    type: "GET",
    endpoint: "/api/activity",
    query: {
      params: ["category"],
    },
  });
  const eventCategories = await response.json();
  return _.map(eventCategories, "category");
};

export const getActivity = async (id, additional = true) => {
  const response = await callWebApi({
    type: "GET",
    endpoint: `/api/activity/user/${id}`,
  });
  const resultPage = await response.json();
  return resultPage;
};

export const deleteEvent = async (id) => {
  await callWebApi({
    type: "DELETE",
    endpoint: `/api/activity/${id}`,
  });
};

export const deleteActivity = async (id) => {
  await callWebApi({
    type: "DELETE",
    endpoint: `/api/activity/user/${id}`,
  });
};

export const putEvent = async (data) => {
  const response = await callWebApi({
    type: "PUT",
    endpoint: `/api/activity/${data.id}`,
    request: data,
  });
  return response.json();
};

export const putActivity = async (data) => {
  const response = await callWebApi({
    type: "PUT",
    endpoint: `/api/activity/user/${data.id}`,
    request: data,
  });
  return response.json();
};
