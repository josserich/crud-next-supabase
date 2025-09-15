import axios from "axios";

const apiInstance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_SITE_URL}/api`,
  //   timeout: 1000,
  //   headers: { "X-Custom-Header": "foobar" },
});
export default apiInstance;
