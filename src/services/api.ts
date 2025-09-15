import axios from "axios";

const apiInstance = axios.create({
  baseURL: "http://localhost:3000/api",
  //   timeout: 1000,
  //   headers: { "X-Custom-Header": "foobar" },
});
export default apiInstance;
