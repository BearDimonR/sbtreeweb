import moment from "moment";

export const FACULTIES = [
  {
    label: "ФІ",
    value: "ФІ",
  },
  {
    label: "ФЕН",
    value: "ФЕН",
  },
  {
    label: "ФСНСТ",
    value: "ФСНСТ",
  },
  {
    label: "ФГН",
    value: "ФГН",
  },
  {
    label: "ФПвН",
    value: "ФПвн",
  },
  {
    label: "ФПрН",
    value: "ФПрн",
  },
];

export const STATUSES = [
  {
    label: "Братчик",
    value: "Братчик",
  },
  {
    label: "Пошанований",
    value: "Пошанований",
  },
  {
    label: "Малюк",
    value: "Малюк",
  },
];

export const PERSON_STATUS_TYPES = {
  member: "Братчик",
  student: "Малюк",
  graduated: "Пошанований",
};

export const DATE_FORMAT = "dd.mm.yyyy";
export const DATE_FORMAT_UPPER = "DD.MM.YYYY";
export const DATE_FORMAT_FOR_FORMS = "dd.MM.yyyy";

export const dateToString = (date) => (date ? moment(date).format("L") : null);
export const stringToDate = (str) =>
  str ? moment(str, DATE_FORMAT_UPPER).format("L") : null;

export const stringToDateObj = (str) =>
  str ? moment(str, DATE_FORMAT_UPPER) : null;
