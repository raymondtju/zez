import axios from "../configs";
import Cookies from "js-cookie";

export async function postData(url, payload) {
  let token = Cookies.get("token");

  if (!token) {
    token = process.env.NEXT_PUBLIC_GUEST_TOKEN;
  }

  try {
    return await axios.post(`${url}`, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    return error;
  }
}

export async function fetch(url, payload) {
  return await axios.get(`${url}`, payload);
}
