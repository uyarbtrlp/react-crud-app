import store, { AppDispatch, RootState } from ".";
import { noteActions } from "./note-slice";
import { uiActions } from "./ui-slice";

export interface GetNote {
  id: string | null;
  title: string;
  message: string;
}
export interface SetNote {
  title: string;
  message: string;
}

export const sendNoteAction = (note: SetNote) => {
  return async (dispatch: AppDispatch, getState: any) => {
    var token = getState().auth.token;
    fetch(
      `https://react-api-test-e9e82-default-rtdb.europe-west1.firebasedatabase.app/notes.json?auth=${token}`,
      {
        method: "POST",
        body: JSON.stringify({
          message: note.message,
          title: note.title,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then((res) => {
      if (res.ok) {
        res.json().then((data) => {
          var noteItem: GetNote = {
            id: data.name,
            message: note.message,
            title: note.title,
          };
          dispatch(noteActions.addNote({ noteItem: noteItem }));
          dispatch(
            uiActions.showNotification({
              type: "Success",
              message: "Note successfully saved to database.",
            })
          );
        });
      } else {
        return res.json().then((data) => {
          dispatch(
            uiActions.showNotification({
              type: "Error",
              message: "An error occured: " + data.error.message,
            })
          );
        });
      }
    });
  };
};
export const getNotesAction = () => {
  return async (dispatch: AppDispatch, getState: any) => {
    var token = getState().auth.token;
    fetch(
      `https://react-api-test-e9e82-default-rtdb.europe-west1.firebasedatabase.app/notes.json?auth=${token}`
    ).then((res) => {
      if (res.ok) {
        res.json().then((data) => {
          dispatch(noteActions.setNotes({ notes: data }));
        });
      } else {
        return res.json().then((data) => {
          dispatch(
            uiActions.showNotification({
              type: "Error",
              message: "An error occured: " + data.error.message,
            })
          );
        });
      }
    });
  };
};
export const deleteNoteAction = (id: string | null) => {
  return async (dispatch: AppDispatch, getState: any) => {
    var token = getState().auth.token;
    fetch(
      `https://react-api-test-e9e82-default-rtdb.europe-west1.firebasedatabase.app/notes/${id}.json?auth=${token}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then((res) => {
      if (res.ok) {
        res.json().then((data) => {
          dispatch(noteActions.deleteNote({ id: id }));
          dispatch(
            uiActions.showNotification({
              type: "Success",
              message: "Item successfully removed from database.",
            })
          );
        });
      } else {
        return res.json().then((data) => {
          dispatch(
            uiActions.showNotification({
              type: "Error",
              message: "An error occured: " + data.error.message,
            })
          );
        });
      }
    });
  };
};
