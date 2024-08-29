import { ReactNode } from "react";
import { AlertColor } from "@mui/material";
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";

// Definindo a interface do estado
interface FeedbackState {
  content: ReactNode;
  severity?: AlertColor;
  isOpen: boolean;
}

const initialState: FeedbackState = {
  content: "",
  severity: "success",
  isOpen: false,
};

// Slice
const feedbackSlice = createSlice({
  name: "feedback",
  initialState,
  reducers: {
    showSuccess: (state, action) => {
      state.content = action.payload;
      state.severity = "success";
      state.isOpen = true;
    },
    showError: (state, action) => {
      state.content = action.payload;
      state.severity = "error";
      state.isOpen = true;
    },
    showFeedback: (state) => {
      state.isOpen = true;
    },
    hideFeedback: (state) => {
      state.isOpen = false;
    },
  },
});

export const { showSuccess, showError, showFeedback, hideFeedback } =
  feedbackSlice.actions;
export const selectFeedback = (state: RootState) => state.feedback;

export default feedbackSlice.reducer;
