import { configureStore } from "@reduxjs/toolkit";
import personReducers from "../slices/personSlice";

export const store = configureStore({
    reducer: {
        persons: personReducers
    },
})