import callWebApi from "../helpers/webApiHelper";

export const login = async () => window.location.href = '/api/auth/login';

export const getCurrentUser = async () => {
  const response = await callWebApi({
    endpoint: `/api/auth/user`,
    type: 'GET',
  })
  return response.json();
}

