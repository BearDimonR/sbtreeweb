import * as queryString from 'query-string';

const getFetchUrl = args => {
  return args.endpoint + (args.query ? `?${queryString.stringify(args.query)}` : '');
}

const getFetchArgs = args => {
  const headers = {};
  if (!args.attachment) {
    headers['Content-Type'] = 'application/json';
    headers.Accept = 'application/json';
  }
  const token = localStorage.getItem('token');
  if (token && !args.skipAuthorization) {
    headers.Authorization = `Bearer ${token}`;
  }
  let body;
  if (args.attachment) {
    if (args.type === 'GET') {
      throw new Error('GET request does not support attachments.');
    }
    const formData = new FormData();
    formData.append('image', args.attachment);
    body = formData;
  } else if (args.request) {
    if (args.type === 'GET') {
      throw new Error('GET request does not support request body.');
    }
    body = JSON.stringify(args.request);
  }
  return {
    method: args.type,
    headers,
    signal: args.ct,
    ...(args.request === 'GET' ? {} : { body })
  };
}

export const throwIfResponseFailed = async res => {
  if (!res.ok) {
    let parsedException = 'Something went wrong with request!';
    try {
      parsedException = await res.json();
    } catch (err) {
      console.log(err)
    }
    throw parsedException;
  }
}

const callWebApi = async args => {
  const res = await fetch(
    getFetchUrl(args),
    getFetchArgs(args)
  );
  await throwIfResponseFailed(res);
  return res;
}

export default callWebApi;
