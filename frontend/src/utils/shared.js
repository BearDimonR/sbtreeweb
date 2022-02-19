import { toast } from "react-toastify";

export const errorHandler =
  (msg, callback = () => {}) =>
  (e) => {
    toast(
      `🤯 Oops! ${msg || "It looks like error occurred:"} ${e.message ?? e}`
    );
    callback(e);
  };

export const handleError = async (action, msg) => {
  try {
    await action();
  } catch (err) {
    toast(
      `🤯 Oops! ${msg || "It looks like error occurred:"} ${err.message ?? err}`
    );
  }
};

export const PAGE_TYPE = {
  events: "/events",
  people: "/people",
  profile: "/profile",
};

export const EVENTS_SORT_OPTIONS = [
  {
    key: "date_start",
    value: "date_start",
    text: "Date",
  },
  {
    key: "name",
    value: "name",
    text: "Name",
  },
  {
    key: "category",
    value: "category",
    text: "Category",
  },
];

export const PEOPLE_SORT_OPTIONS = [
  {
    key: "date_in",
    value: "date_in",
    text: "Date",
  },
  {
    key: "status",
    value: "status",
    text: "Status",
  },
];
