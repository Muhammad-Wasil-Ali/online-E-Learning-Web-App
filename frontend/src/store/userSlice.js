import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const signUp = createAsyncThunk("user/signup", async (formData) => {
  try {
    const response = await axios.post(
      `http://localhost:8000/api/v1/user/register`,
      formData,
      { withCredentials: true }
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

//Verify Email

export const emailVerify = createAsyncThunk(
  "user/emailVerify",
  async ({ email, verificationCode }) => {
    console.log(email, verificationCode);
    try {
      const response = await axios.post(
        `http://localhost:8000/api/v1/user/verify-email`,
        { email, code: verificationCode },
        { withCredentials: true }
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data); // 👈 Reject properly
    }
  }
);

//login thunk

export const login = createAsyncThunk(
  "user/login",
  async ({ email, password, role }) => {
    console.log(email, password, role);
    try {
      const response = await axios.post(
        `http://localhost:8000/api/v1/user/login`,
        { email, password, role },
        { withCredentials: true }
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

//logout thunk

export const logout = createAsyncThunk("user/logout", async () => {
  try {
    console.log("before");
    const response = await axios.get(
      `http://localhost:8000/api/v1/user/logout`,

      { withCredentials: true }
    );
    console.log("after");

    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});
const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    isLoading: false,
    isError: false,
    isSuccess: false,
  },

  //reducers
  reducers: {
    isSuccessFalse: (state, action) => {
      state.isSuccess = false;
      state.isError = false;
    },
  },

  //extra reducers

  //======== For SignUp========
  extraReducers: (builder) => {
    builder.addCase(signUp.pending, (state) => {
      state.isLoading = true;
      state.isError = null;
    });
    builder.addCase(signUp.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.user = action.payload;
    });
    builder.addCase(signUp.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = action.payload;
    });

    ////=========For Email Verficaion=============

    builder.addCase(emailVerify.pending, (state) => {
      state.isLoading = true;
      state.isError = null;
    });
    builder.addCase(emailVerify.fulfilled, (state) => {
      state.isLoading = false;
      state.isSuccess = true;
    });
    builder.addCase(emailVerify.rejected, (state, action) => {
      state.isLoading = false;

      state.isError = true;
    });

    ////=========For Login=============

    builder.addCase(login.pending, (state) => {
      state.isLoading = true;
      state.isError = null;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.user = action.payload;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.isLoading = false;

      state.isError = true;
    });

    //logout extra reducer

    builder.addCase(logout.pending, (state) => {
      state.isLoading = true;
      state.isError = null;
    });
    builder.addCase(logout.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = null;
      state.isSuccess = true;
      localStorage.clear();
    });
    builder.addCase(logout.rejected, (state) => {
      state.isError = true;
    });
  },
});

export const { isSuccessFalse } = userSlice.actions;

export default userSlice.reducer;
