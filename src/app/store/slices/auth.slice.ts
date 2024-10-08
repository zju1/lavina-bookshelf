import { createSlice } from "@reduxjs/toolkit";
import { User } from "../../../hooks/useAuth";

interface IAuthSlice {
  user: null | User;
}

const initialState: IAuthSlice = {
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    signOut: () => initialState,
  },
});

export default authSlice.reducer;

export const { setUser, signOut } = authSlice.actions;
