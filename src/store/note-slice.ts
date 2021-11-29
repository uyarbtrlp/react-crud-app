import { createSlice } from "@reduxjs/toolkit";
import { GetNote } from "./note-actions";
interface NotesState {
  notes: GetNote[];
  editModalOpen:boolean;
}
const initialState: NotesState = {
  notes: [],
  editModalOpen:false
};

const noteSlice = createSlice({
  name: "note",
  initialState: initialState,
  reducers: {
    setNotes: (state, action) => {
      const notes = action.payload.notes;
      const loadedNotes:GetNote[] = []
      for (let key in notes) {
        loadedNotes.push({
          id:key,
          title: notes[key].title,
          message: notes[key].message,
        });
      }
      state.notes = loadedNotes
    },
    addNote:(state,action) => {
      var notes = state.notes
      notes.push(action.payload.noteItem)
      state.notes = notes;
    },
    deleteNote:(state,action) => {
      var notes = state.notes
      var deletedId = action.payload.id
      state.notes = notes.filter(item=>item.id != deletedId)
    },
    setModalOpen:(state,action) => {
      state.editModalOpen = action.payload
    }
  },
});

export const noteActions = noteSlice.actions;

export default noteSlice;
