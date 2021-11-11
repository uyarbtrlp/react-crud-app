import { Button, IconButton, Snackbar, SnackbarOrigin } from "@mui/material";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import CloseIcon from "@mui/icons-material/Close";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { uiActions } from "../../store/ui-slice";
export interface State extends SnackbarOrigin {}
const Alert: React.FC<{}> = (props) => {
  const dispatch = useDispatch();
  const isOpen = useSelector((state: RootState) => state.ui.alertVisible);
  const [state, setState] = useState<State>({
    vertical: "bottom",
    horizontal: "right",
  });
  const message = useSelector((state: RootState) => state.ui.message);
  const type = useSelector((state: RootState) => state.ui.type);
  const { vertical, horizontal } = state;

  const handleClose = (
    event: React.SyntheticEvent | MouseEvent,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    dispatch(uiActions.closeNotification());
  };
  let successAlert = (
    <Snackbar
      anchorOrigin={{ vertical, horizontal }}
      autoHideDuration={3000}
      open={isOpen}
      onClose={handleClose}
      key={vertical + horizontal}
    >
      <MuiAlert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
        {message}
      </MuiAlert>
    </Snackbar>
  );
  let errorAlert = (
    <Snackbar
      anchorOrigin={{ vertical, horizontal }}
      open={isOpen}
      autoHideDuration={3000}
      onClose={handleClose}
      key={vertical + horizontal}
    >
      <MuiAlert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
        {message}
      </MuiAlert>
    </Snackbar>
  );
  return (
    <div>
      {type == "Success" && successAlert}
      {type == "Error" && errorAlert}
    </div>
  );
};
export default Alert;
