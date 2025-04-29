import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counterSlice";
import feedbackReducer from "./feedbackSlice";

export const store = configureStore({
    reducer: {
        counter: counterReducer,
        feedback: feedbackReducer,
    },
});

export default store;
