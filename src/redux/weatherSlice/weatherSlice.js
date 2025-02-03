import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_KEY = "f8578e9caedc016e50ce4843f7de645a";

export const fetchWeather = createAsyncThunk(
  "weather/fetchWeather",
  async (city) => {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`
    );
    return response.data;
  }
);

const weatherSlice = createSlice({
  name: "weather",
  initialState: {
    data: {},
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeather.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchWeather.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchWeather.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const selectWeather = (state) => state.weather.data;
export const selectStatus = (state) => state.weather.status;

export default weatherSlice.reducer;
