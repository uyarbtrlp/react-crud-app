
import { AppDispatch, RootState } from ".";

export interface Note {
    title:string,
    message:string
}


export const sendNoteAction = (note:Note,token:string) => {
  return async (dispatch:AppDispatch,getState:any) => {
    fetch("https://react-api-test-e9e82-default-rtdb.europe-west1.firebasedatabase.app/notes.json?auth="+token, {
      method: "POST",
      body: JSON.stringify({
        message: note.message,
        title: note.title,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      })
        .then((res) => {
          if (res.ok) {
            res.json().then(data=>{
              
            })
          } else {
            return res.json().then((data) => {
            //   dispatch(uiActions.showNotification({
            //     type:"Error",
            //     message:"Login could not be done: "+data.error.message
            //   }))

            });
          }
        })
  };
}
export const getNotesAction = (token:string) => {
  return async (dispatch:AppDispatch,getState:any) => {
    fetch("https://react-api-test-e9e82-default-rtdb.europe-west1.firebasedatabase.app/notes.json?auth="+token)
        .then((res) => {
          if (res.ok) {
            res.json().then(data=>{
              console.log(data)
            })
          } else {
            return res.json().then((data) => {
            //   dispatch(uiActions.showNotification({
            //     type:"Error",
            //     message:"Login could not be done: "+data.error.message
            //   }))

            });
          }
        })
  };
}

