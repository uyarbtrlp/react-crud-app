import {
  Button,
  Menu,
  MenuProps,
  MenuItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContentText,
  TextField,
  DialogContent,
  DialogActions,
  Grid,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import store, { AppDispatch, RootState } from "../../store";
import { alpha, styled } from "@mui/system";
import { noteActions } from "../../store/note-slice";
import { deleteNoteAction, editNoteAction, getNoteAction, SetNote } from "../../store/note-actions";
import { useFormik } from "formik";
import * as yup from "yup"

const validationSchema = yup.object({
  title: yup.string().required("Title is required"),
  message: yup.string().required("Message of note is required"),
});

const DataTable: React.FC<{}> = () => {
  const dispatch = useDispatch<AppDispatch>()
  const [id,setId] = useState<string>("")
  const open = useSelector((state:RootState)=>state.note.editModalOpen)
  const deleteItemHandler = (id: string | null) => {
    dispatch(deleteNoteAction(id))
  };
  const editItemHandler = (id: string | null) => {
    dispatch(getNoteAction(id,formik))
    setId(id as string)
    
  };
  const handleClickClose = (resetForm: any) => {
    resetForm({})
    dispatch(noteActions.setModalOpen(false))
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
      dispatch(editNoteAction(note,id));
      resetForm({});
      // setOpen(false)
    },
  });

  const notes = useSelector((state: RootState) => state.note.notes);
  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Message</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {notes.map((row) => (
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell>{row.title}</TableCell>
                <TableCell style={{ wordBreak: "break-word" }}>{row.message}</TableCell>
                <TableCell component="th" scope="row">
                  <Grid container spacing={3}>
                    <Grid item xs={3}>
                      <IconButton onClick={() => deleteItemHandler(row.id)} aria-label="delete" color="error" size="large">
                        <DeleteIcon />
                      </IconButton>
                    </Grid>
                    <Grid item xs={3}>
                      <IconButton onClick={() => editItemHandler(row.id)} aria-label="delete" color="info" size="large">
                        <EditIcon />
                      </IconButton>
                    </Grid>
                  </Grid>

                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
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
          <Button onClick={handleClickClose.bind(null, formik.resetForm)}>Cancel</Button>
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
export default DataTable;
