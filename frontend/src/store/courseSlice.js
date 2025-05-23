import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Helper function for handling errors
const handleAsyncError = (error) => {
  if (error.response) {
    throw new Error(error.response.data.message || "Something went wrong");
  } else {
    throw new Error(error.message || "Network error");
  }
};

// Categories APIs
export const createCategories = createAsyncThunk(
  "create/category",
  async (name, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `http://localhost:8000/api/v1/category/create-category`,
        { name },
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(handleAsyncError(error));
    }
  }
);

export const getAllCategories = createAsyncThunk(
  "getAll/categories",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/v1/category/get-all-category`,
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(handleAsyncError(error));
    }
  }
);

export const updateCategories = createAsyncThunk(
  "update/category",
  async ({ id, editValue }, { rejectWithValue }) => {
    try {
      const response = await axios.patch(
        `http://localhost:8000/api/v1/category/update-category/${id}`,
        { name: editValue },
        { withCredentials: true }
      );
      return { id, updatedCategory: response.data.category };
    } catch (error) {
      return rejectWithValue(handleAsyncError(error));
    }
  }
);

export const deleteCategory = createAsyncThunk(
  "delete/category",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(
        `http://localhost:8000/api/v1/category/delete-category/${id}`,
        { withCredentials: true }
      );
      return id;
    } catch (error) {
      return rejectWithValue(handleAsyncError(error));
    }
  }
);

///=================
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
    category: null,
    isSuccess: false,
    isError: false,
    isLoading: false,
    errorMessage: "",
  },

  reducers: {
    resetCourseState: (state) => {
      state.isSuccess = false;
      state.isError = false;
      state.errorMessage = "";
    },
  },

  extraReducers: (builder) => {
    // Create Category
    builder.addCase(createCategories.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
      state.errorMessage = "";
    });
    builder.addCase(createCategories.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      // Add the new category to the existing list
      if (state.category?.categories) {
        state.category.categories.push(action.payload.category);
      }
    });
    builder.addCase(createCategories.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.errorMessage =
        action.payload?.message || "Failed to create category";
    });

    // Get All Categories
    builder.addCase(getAllCategories.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(getAllCategories.fulfilled, (state, action) => {
      state.isLoading = false;
      state.category = action.payload;
    });
    builder.addCase(getAllCategories.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.errorMessage =
        action.payload?.message || "Failed to fetch categories";
    });

    // Update Category
    builder.addCase(updateCategories.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(updateCategories.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      // Update the category in the list
      if (state.category?.categories) {
        const index = state.category.categories.findIndex(
          (cat) => cat._id === action.payload.id
        );
        if (index !== -1) {
          state.category.categories[index].name =
            action.payload.updatedCategory.name;
        }
      }
    });
    builder.addCase(updateCategories.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.errorMessage =
        action.payload?.message || "Failed to update category";
    });

    // Delete Category
    builder.addCase(deleteCategory.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(deleteCategory.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      // Remove the deleted category from the list
      if (state.category?.categories) {
        state.category.categories = state.category.categories.filter(
          (cat) => cat._id !== action.payload
        );
      }
    });
    builder.addCase(deleteCategory.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.errorMessage =
        action.payload?.message || "Failed to delete category";
    });

    // ... (keep your existing course-related cases)
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
