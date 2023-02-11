import axios from "../configs";

export async function postData(url, payload) {
  return await axios.post(`${url}`, payload);
}

export async function fetch(url, payload) {
  return await axios.get(`${url}`, payload);
}
