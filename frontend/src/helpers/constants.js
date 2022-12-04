import moment from "moment";

export const LANDING_URL = process.env.REACT_APP_LANDING_URL;

export const IMAGE_FORMATS = ['image/jpeg', 'image/png', 'image/jpg']

export const NEW = 'new';

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

export const ROLES = {
  VISITOR: 0,
  MEMBER: 1,
  EDITOR: 2,
  ADMIN: 3,
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
    text: "Дата",
  },
  {
    key: "name",
    value: "name",
    text: "Назва",
  },
  {
    key: "category",
    value: "category",
    text: "Категорія",
  },
];

export const PEOPLE_SORT_OPTIONS = [
  {
    key: "dateIn",
    value: "dateOut",
    text: "Членство",
  },
  {
    key: "status",
    value: "status",
    text: "Статус",
  },
];

export const DATE_FORMAT = "dd.mm.yyyy";
export const DATE_FORMAT_UPPER = "DD.MM.YYYY";
export const DATE_FORMAT_FOR_FORMS = "dd.MM.yyyy";

export const dateToString = (date) => (date ? moment(date).format("L") : null);
export const stringToDate = (str) =>
  str ? moment(str, DATE_FORMAT_UPPER).format("L") : null;

export const stringToDateObj = (str) =>
  str ? moment(str, DATE_FORMAT_UPPER) : null;
