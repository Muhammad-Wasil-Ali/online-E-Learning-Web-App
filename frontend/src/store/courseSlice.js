import axios from "axios";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

//getAllCourses
export const getAllCourses = createAsyncThunk("courses/getall", async () => {
  try {
    const response = await axios.get(
      `http://localhost:8000/api/v1/course/get-all-course`,
      { withCredentials: true }
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    return rejectedWithValue(error.response.data);
  }
});

//get Single Course Using Id For Course Details

export const getSingleCourseById = createAsyncThunk(
  "courses/getsinglecourse",
  async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/v1/course/get-single-course/${id}`,
        { withCredentials: true }
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      return rejectedWithValue(error.response.data);
    }
  }
);

const courseSlice = createSlice({
  name: "course",
  initialState: {
    courses: null,
    singleCourse: null,
    isSuccess: false,
    isError: false,
    isLoading: false,
  },

  reducers: {
    resetCourseState: (state) => {
      state.isSuccess = false;
    },
  },

  extraReducers: (builder) => {
    // ============= For get All COurse==============

    builder.addCase(getAllCourses.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
    });

    builder.addCase(getAllCourses.fulfilled, (state, action) => {
      (state.isLoading = false),
        (state.isError = false),
        (state.courses = action.payload);
      state.isSuccess = true;
    });

    builder.addCase(getAllCourses.rejected, (state) => {
      state.isError = true;
      state.isLoading = false;
    });

    // ============= For get Single COurse==============

    builder.addCase(getSingleCourseById.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
    });

    builder.addCase(getSingleCourseById.fulfilled, (state, action) => {
      (state.isLoading = false),
        (state.isError = false),
        (state.singleCourse = action.payload);
      state.isSuccess = true;
    });

    builder.addCase(getSingleCourseById.rejected, (state) => {
      state.isError = true;
      state.isLoading = false;
    });
  },
});
export const { resetCourseState } = courseSlice.actions;
export default courseSlice.reducer;
