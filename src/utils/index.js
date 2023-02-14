import axios from "../configs";

export async function postData(url, payload, token) {
  return await axios.post(`${url}`, {
    ...payload,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export async function fetch(url, payload) {
  return await axios.get(`${url}`, payload);
}
