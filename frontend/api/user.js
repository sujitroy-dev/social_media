import axios from "@/utils/axios.js";

export const userApi = {
  fetchUser: async (id) => {
    try {
      const response = await axios.get(`/user/${id}`);
      return response.data;
    } catch (error) {
      throw new Error("Failed to fetch user");
    }
  },
  loginUser: async (identifier, password) => {
    try {
      const response = await axios.post("/user/login", {
        username: identifier,
        password,
      });
      return response.data;
    } catch (error) {
      throw new Error("Failed to login");
    }
  },
  registerUser: async (data) => {
    try {
      const response = await axios.post("/user/register", data);
      return response.data;
    } catch (error) {
      throw new Error("Failed to register");
    }
  },
};
