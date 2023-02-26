import axios from "axios";

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_DEV_BE_API,
});

export default instance;
