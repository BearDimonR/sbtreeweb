import _ from "lodash";
import callWebApi from "../helpers/webApiHelper";

export const getEvents = async ({
  sort,
  filters,
  search = null,
  page = 1,
  pageSize,
}) => {
  const response = await callWebApi({
    type: "POST",
    endpoint: "/api/event/filter",
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

export const getEvent = async (id, people = true) => {
  //TODO people remove
  const response = await callWebApi({
    type: "GET",
    endpoint: `/api/event/${id}`,
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
    endpoint: "/api/event",
    query: {
      params: ["id", "name"],
    },
  });
  return await response.json();
};

export const getEventСategories = async () => {
  const response = await callWebApi({
    type: "GET",
    endpoint: "/api/event",
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
    endpoint: `/api/activity/${id}`,
  });
  const resultPage = await response.json();
  return resultPage;
};

export const putEvent = async (data) => {
  const response = await callWebApi({
    type: "PUT",
    endpoint: `/api/event/${data.id}`,
    request: data,
  });
  return response.json();
};

export const deleteEvent = async (id) => {
  await callWebApi({
    type: "DELETE",
    endpoint: `/api/event/${id}`,
  });
};

export const putActivity = async (data) => {
  const response = await callWebApi({
    type: "PUT",
    endpoint: `/api/activity/${data.id}`,
    request: data,
  });
  return response.json();
};

export const deleteActivity = async (id) => {
  await callWebApi({
    type: "DELETE",
    endpoint: `/api/activity/${id}`,
  });
};
