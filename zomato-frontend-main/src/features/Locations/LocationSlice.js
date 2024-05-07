import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { LocationService } from "./LocationService";

export const getLocations = createAsyncThunk("locations/get",async(thunkAPI)=>{
    try {
        return await LocationService.getLocations();
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

const locationState = {
    location :"",
    isError : false,
    isSuccess : false,
    isLoading : false,
    message : ""
};

export const LocationSlice = createSlice({
    name : "location",
    initialState : locationState,
    reducers:{},
    extraReducers : (builder)=>{
        builder.addCase(getLocations.pending,(state)=>{
            state.isLoading = true;
        }).addCase(getLocations.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.location = action.payload;
        }).addCase(getLocations.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError=true;
            state.isSuccess=false;
            state.message=action.error;
        })
    }
})

export default LocationSlice.reducer;