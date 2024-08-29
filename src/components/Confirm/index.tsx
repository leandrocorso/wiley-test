import { ReactNode } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";

interface ConfirmProps {
  open: boolean;
  title?: string;
  children: ReactNode;
  action: () => void;
  cancel: () => void;
  cancelLabel?: string;
  actionLabel?: string;
}

export const Confirm = ({
  open = false,
  title,
  children,
  cancelLabel = "Cancel",
  actionLabel = "OK",
  action,
  cancel,
}: ConfirmProps) => {
  const handleAction = () => action();

  const handleClose = () => cancel();

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      {title && <DialogTitle id="alert-dialog-title">{title}</DialogTitle>}
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {children}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>{cancelLabel}</Button>
        <Button onClick={handleAction} variant="contained" autoFocus>
          {actionLabel}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
