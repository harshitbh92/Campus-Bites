import { configureStore } from '@reduxjs/toolkit';
import LocationReducer from '../features/Locations/LocationSlice'
import RestaurantReducer from '../features/Restraunts/RestroSlice'
export const store = configureStore({
  reducer: {
    locations : LocationReducer,
    restaurants : RestaurantReducer
  },
});