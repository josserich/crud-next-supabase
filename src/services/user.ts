import { User } from "@/src/interface/User";
import apiInstance from "./api";

const createUser = async (req: User) => {
  const created = await apiInstance.post("/user", req, {
    headers: { "Content-Type": "application/json" },
  });
  return created;
};

const userAPI = {
  createUser,
};
export default userAPI;
