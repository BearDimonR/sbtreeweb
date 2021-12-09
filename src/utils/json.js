import ev from "./json/events.json";
import ppl from "./json/people.json";
import evPpl from "./json/eventPerson.json";

const emulateApi = async (val, ms) => {
  return new Promise((resolve) => setTimeout(() => resolve(val), ms || 20));
  //return new Promise(resolve => resolve(val));
};

export const events = ev;
export const people = ppl;
export const eventPerson = evPpl;

export const access = [
  {
    email: "beardimon@gmail.com",
    password: "password",
    role: 1,
    token: "token",
    refresh: "refresh",
    userId: "8476365d-6a62-4a08-91c9-590dfdff82a5",
    username: "mem",
  },
];

export const getAccessCall = async (ms) => emulateApi(access, ms);
export const getEventsCall = async (ms) => emulateApi(events, ms);
export const getPeopleCall = async (ms) => emulateApi(people, ms);
export const getActivityCall = async (ms) => emulateApi(eventPerson, ms);
