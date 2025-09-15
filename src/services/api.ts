import axios from "axios";

const apiInstance = axios.create({
  baseURL: `/api`,
  //   timeout: 1000,
  //   headers: { "X-Custom-Header": "foobar" },
});
export default apiInstance;
