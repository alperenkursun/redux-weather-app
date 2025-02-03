import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCities = createAsyncThunk("cities/fetchCities", async () => {
  const response = await axios.get("https://turkiyeapi.dev/api/v1/provinces");
  return response.data.data.map((province) => province.name);
});

const citiesSlice = createSlice({
  name: "cities",
  initialState: {
    cities: [],
    selectedCity: "Adana",
    status: "idle",
    error: null,
  },
  reducers: {
    setSelectedCity: (state, action) => {
      state.selectedCity = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCities.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCities.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.cities = action.payload;
      })
      .addCase(fetchCities.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { setSelectedCity } = citiesSlice.actions;
export const selectCities = (state) => state.cities.cities;
export const selectSelectedCity = (state) => state.cities.selectedCity;
export const selectStatus = (state) => state.cities.status;

export default citiesSlice.reducer;
