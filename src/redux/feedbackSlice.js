import { createSlice } from "@reduxjs/toolkit";

export const feedbackSlice = createSlice({
    name: "feedback",
    initialState: { reviews: [] },
    reducers: {
        addReview: (state, action) => {
            state.reviews.push(action.payload);
        },
        setReviews: (state, action) => {
            state.reviews = action.payload;
        },
        removeReview: (state, action) => {
            state.reviews = state.reviews.filter(review => review.id !== action.payload);
        },
    },
});

export const { addReview, setReviews, removeReview } = feedbackSlice.actions;
export default feedbackSlice.reducer;