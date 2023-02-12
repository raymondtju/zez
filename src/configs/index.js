import axios from "axios";

const instance = axios.create({
  baseURL: process.env.BE_API,
});

export default instance;
