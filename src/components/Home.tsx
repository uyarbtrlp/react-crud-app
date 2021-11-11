import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { checkAutoLogin } from "../store/auth-actions";
import { authActions } from "../store/auth-slice";
import AddIcon from '@mui/icons-material/Add';
import * as React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Icon,
  TextField,
} from "@mui/material";

const Home: React.FC<{}> = () => {
  const dispatch: AppDispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  useEffect(() => {
    checkAutoLogin(dispatch);
    dispatch(authActions.getUserToken());
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClickClose = () => {
    setOpen(false);
  };

  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setOpen(false);
  };

  return (
    <div>
      <Button
      variant="contained"
        style={{ float: "right" }}
        onClick={handleClickOpen}
      >
       <AddIcon style={{marginRight:"3px"}} /> Create a new note
      </Button>
      <Dialog open={open}>
        <DialogTitle>Write a note</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To add the note to this website, please enter your title of note and message here.
          </DialogContentText>
          <form id="SubmitForm" onSubmit={submitHandler}>
            <TextField
              autoFocus
              id="title"
              label="Title"
              type="text"
              fullWidth
              variant="standard"
            />
            <TextField
              id="note"
              label="Note"
              multiline
              rows={4}
              fullWidth
              defaultValue=""
              variant="standard"
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClickClose}>Cancel</Button>
          <Button form="SubmitForm" type="submit">
            Subscribe
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Home;
