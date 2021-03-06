import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { checkAutoLogin, getUserTokenAction } from "../store/auth-actions";
import DataTable from './UI/Table'
import { authActions } from "../store/auth-slice";
import AddIcon from "@mui/icons-material/Add";
import * as React from "react";
import * as yup from "yup";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Icon,
  Paper,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import { useFormik } from "formik";
import { getNotesAction, SetNote, sendNoteAction } from "../store/note-actions";
import { noteActions } from "../store/note-slice";

const validationSchema = yup.object({
  title: yup.string().required("Title is required"),
  message: yup.string().required("Message of note is required"),
});

const Home: React.FC<{}> = () => {
  const dispatch: AppDispatch = useDispatch();
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    dispatch(checkAutoLogin());
    dispatch(getUserTokenAction());
  }, [dispatch]);

  useEffect(()=>{
      dispatch(getNotesAction())
  },[dispatch])

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClickClose = (resetForm:any) => {
    resetForm({})
    setOpen(false);
  };

  const formik = useFormik({
    initialValues: {
      title: "",
      message: "",
    },
    validationSchema: validationSchema,
    validateOnBlur: true,
    validateOnChange: true,
    onSubmit: (values, { resetForm }) => {
      const note: SetNote = {
        message: values.message,
        title: values.title,
      };
      dispatch(sendNoteAction(note));
      resetForm({});
      setOpen(false)
    },
  });

  return (
    <div>
      <Button
        variant="contained"
        style={{ float: "right" }}
        onClick={handleClickOpen}
      >
        <AddIcon style={{ marginRight: "3px" }} /> Create a new note
      </Button>
      <DataTable></DataTable>
      <Dialog open={open}>
        <DialogTitle>Write a note</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To add the note to this website, please enter your title of note and
            message here.
          </DialogContentText>
          <form id="SubmitForm" onSubmit={formik.handleSubmit}>
            <TextField
              autoFocus
              id="title"
              label="Title"
              type="text"
              value={formik.values.title}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.title && Boolean(formik.errors.title)}
              helperText={formik.touched.title && formik.errors.title}
              fullWidth
              variant="standard"
            />
            <TextField
              id="message"
              label="Message"
              multiline
              rows={4}
              value={formik.values.message}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.message && Boolean(formik.errors.message)}
              helperText={formik.touched.message && formik.errors.message}
              fullWidth
              variant="standard"
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClickClose.bind(null,formik.resetForm)}>Cancel</Button>
          <Button
            disabled={!(formik.isValid && formik.dirty)}
            form="SubmitForm"
            type="submit"
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Home;
