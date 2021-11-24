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
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import store, { AppDispatch, RootState } from "../../store";
import { alpha, styled } from "@mui/system";
import { noteActions } from "../../store/note-slice";
import { deleteNoteAction } from "../../store/note-actions";

const DataTable: React.FC<{}> = () => {
  const dispatch = useDispatch<AppDispatch>()
  const deleteItemHandler = (id: string | null) => {
    dispatch(deleteNoteAction(id))
  };

  const notes = useSelector((state: RootState) => state.note.notes);
  return (
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
              <TableCell style={{wordBreak:"break-word"}}>{row.message}</TableCell>
              <TableCell component="th" scope="row">
                <IconButton onClick={()=> deleteItemHandler(row.id)} aria-label="delete" color="error" size="large">
                  <DeleteIcon/>
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
export default DataTable;
