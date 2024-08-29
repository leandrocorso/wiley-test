import { Backdrop, CircularProgress } from "@mui/material";

interface LoadingProps {
  backdrop?: boolean;
  onClick?: () => void;
}

export const Loading = ({
  backdrop = false,
  onClick = () => {},
}: LoadingProps) => {
  return backdrop ? (
    <Backdrop
      open
      onClick={onClick}
      sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  ) : (
    <CircularProgress color="inherit" />
  );
};
