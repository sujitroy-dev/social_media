import axios from "@/utils/axios.js";

export const postsApi = {
  fetchRecentPosts: async () => {
    try {
      const response = await axios.get("/posts/recent");
      return response.data;
    } catch (error) {
      throw new Error("Failed to fetch posts");
    }
  },
  fetchFriendsPosts: async () => {
    try {
      const response = await axios.get("/posts/friends");
      return response.data;
    } catch (error) {
      throw new Error("Failed to fetch posts");
    }
  },
  fetchPopularPosts: async () => {
    try {
      const response = await axios.get("/posts/popular");
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
      throw new Error("Failed to delete the post");
    }
  },
  likePost: async (id) => {
    try {
      const response = await axios.post(`/posts/like/${id}`);
      return response.data;
    } catch (error) {
      throw new Error("Failed to like the post");
    }
  },
};
