import moment from "moment";

export const PERSON_STATUS_TYPES = {
  member: "Братчик",
  student: "Малюк",
  graduated: "Пошанований",
};

export const DATE_FORMAT = "dd.mm.yyyy";
export const DATE_FORMAT_UPPER = "DD.MM.YYYY";

export const dateToString = (date) => (date ? moment(date).format("L") : null);
export const stringToDate = (str) =>
  str ? moment(str, DATE_FORMAT_UPPER).format("L") : null;

export const stringToDateObj = (str) =>
  str ? moment(str, DATE_FORMAT_UPPER) : null;
