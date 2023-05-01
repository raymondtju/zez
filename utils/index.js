import axios from "../configs";
import Cookies from "js-cookie";

export async function postData(url, payload) {
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

export async function fetchData(url, token) {
  if (!token) {
    token = process.env.NEXT_PUBLIC_GUEST_TOKEN;
  }

  try {
    return await axios.get(`${url}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    return error;
  }
}

export async function removeData(url) {
  const token = Cookies.get("token");
  if (!token) {
    return {
      redirect: {
        destination: "/signin",
        permanent: false,
      },
    };
  }
  try {
    return await axios.delete(`${url}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    return error;
  }
}
