import { configureStore } from "@reduxjs/toolkit";
import citiesSlice from "./citiesSlice/citiesSlice";
import weatherSlice from "./weatherSlice/weatherSlice";

export const store = configureStore({
  reducer: {
    cities: citiesSlice,
    weather: weatherSlice,
  },
});
