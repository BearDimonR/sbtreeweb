import ev from './json/events.json';
import ppl from './json/people.json'
import evPpl from './json/eventPerson.json';

const emulateApi = async (val, ms) => {
    return new Promise(resolve => setTimeout(() => resolve(val), ms || 1000))
};

export const events = ev;
export const people = ppl;
export const eventPerson = evPpl;

export const access = [
    {
        email: 'beardimon@gmail.com',
        password: 'password',
        role: 1,
        token: 'token',
        refresh: 'refresh',
        userId: '1',
    }
]

export const users = [
    {
        id: '1',
        name: 'Дмитро',
        surname: 'Мєдвєдєв',
        parental: 'Романович',
        status: 'Братчик',
        email: 'beardimon@gmail.com',
        tel: '0980211121',
        yearIn: '2018',
        about: 'Студент ІПЗ, одним словом - ФІшник. Може допомогти з будь-якими тех. питаннями. Висвячений 20.01.2020',
        avatar: '',
        nickname: 'mem',
    }
];

export const getUsersCall = async (ms) => emulateApi(users, ms);
export const getAccessCall = async (ms) => emulateApi(access, ms);
export const getEventsCall = async (ms) => emulateApi(events, ms);
export const getPeopleCall = async (ms) => emulateApi(people, ms);
export const getActivityCall = async (ms) => emulateApi(eventPerson, ms);

