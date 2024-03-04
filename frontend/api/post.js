import axios from "@/utils/axios.js";

export const postsApi = {
  fetchPosts: async () => {
    try {
      const response = await axios.get("/posts");
      return response.data;
    } catch (error) {
      throw new Error("Failed to fetch posts");
    }
  },
  updatePosts: async (id, content) => {
    try {
      const response = await axios.patch(`/posts/${id}`, { content });
      return response.data;
    } catch (error) {
      throw new Error("Failed to fetch posts");
    }
  },
  deletePosts: async (id) => {
    try {
      const response = await axios.delete(`/posts/${id}`);
      return response.data;
    } catch (error) {
      throw new Error("Failed to fetch posts");
    }
  },
};
