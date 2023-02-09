import axios from "../configs";

export async function postData(url, payload) {
  return await axios.post(`${url}`, payload);
}
