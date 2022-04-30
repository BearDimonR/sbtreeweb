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
      `🤯 Oops! ${msg || "It looks like error occurred:"} ${
        (err.message || err.title) ?? err
      }`
    );
    if (err.details) {
      toast(err.details);
    }
  }
};

export const PAGE_TYPE = {
  events: "/events",
  people: "/people",
  profile: "/profile",
};

export const EVENTS_SORT_OPTIONS = [
  {
    key: "dateStart",
    value: "dateEnd",
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
    key: "dateIn",
    value: "dateOut",
    text: "Date",
  },
  {
    key: "status",
    value: "status",
    text: "Status",
  },
];
