import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RestroService } from "./RestroService";

export const getAllRestro = createAsyncThunk("restaurant/get", async (thunkAPI) => {
  try {
    return await RestroService.getallRestro()
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message); // Access error message
  }
});
export const getRestroByLoc = createAsyncThunk("restaurant/getbyLoc", async (id, thunkAPI) => {
  try {
    return await RestroService.getRestroByLoc(id);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message); // Access error message
  }
});

const RestroState = {
  restaurant: "",
  restaurantbyLocId : "",
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: ""
};

export const RestroSlice = createSlice({
  name: "restaurant",
  initialState: RestroState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllRestro.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllRestro.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.restaurant = action.payload;
      })
      .addCase(getAllRestro.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload; // Corrected to access payload
      })
      .addCase(getRestroByLoc.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getRestroByLoc.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.restaurantbyLocId = action.payload;
      })
      .addCase(getRestroByLoc.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload; // Corrected to access payload
      });
  }
});

export default RestroSlice.reducer;
