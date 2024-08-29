import { AppDispatch, RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import { hideFeedback } from "@/store/feedbackSlice";
import { Alert, Snackbar } from "@mui/material";

export const FeedBack = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { isOpen, content, severity } = useSelector(
    (state: RootState) => state.feedback
  );

  const handleCloseFeedBack = () => dispatch(hideFeedback());

  return (
    <Snackbar
      open={isOpen}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      autoHideDuration={6000}
      onClose={handleCloseFeedBack}
    >
      <Alert
        severity={severity}
        variant="filled"
        sx={{ width: "100%" }}
        onClose={handleCloseFeedBack}
      >
        <div>{content}</div>
      </Alert>
    </Snackbar>
  );
};
