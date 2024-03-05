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
    loggedIn: false,
  },
  reducers: {
    loginUser(state, action) {
      const { token, user } = action.payload;
      const { user_id, first_name, last_name, username, email } = user;
      state.loggedIn = true;
      state.token = token;
      state.user = { user_id, first_name, last_name, username, email };
    },
    logoutUser(state, _) {
      state.loggedIn = false;
      state.token = null;
      state.user = {};
    },
  },
});

export const { loginUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;
