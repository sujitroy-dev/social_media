import axios from "@/utils/axios.js";

export const authApi = {
  emailSingin: async (data) => {
    const { first_name, last_name, username, email, password } = data;
    const body = {
      first_name,
      last_name,
      username,
      email,
      password,
    };
    try {
      const response = await axios.post("/auth/email", body);
      return response.data;
    } catch (error) {
      throw new Error("Failed to login");
    }
  },
};
