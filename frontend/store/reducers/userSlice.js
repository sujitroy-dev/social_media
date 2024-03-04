import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: {
      user_id: null,
      first_name: null,
      last_name: null,
      username: null,
      email: null,
    },
    token: null,
    isLoggedIn: false,
    tokenVerified: false,
  },
  reducers: {
    fetchUserSuccess(state, action) {
      return { ...state, user: action.payload };
    },
  },
});

export const { fetchUserSuccess } = userSlice.actions;
export default userSlice.reducer;
