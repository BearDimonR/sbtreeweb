import callWebApi from "../helpers/webApiHelper";

export const uploadImage = async (file) => {
  const response = await callWebApi({
    endpoint: `/api/image`,
    type: "POST",
    attachment: file,
  });
  return response.json();
};
