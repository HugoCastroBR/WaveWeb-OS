
import { NoteProps } from "@/types";
import { createSlice } from "@reduxjs/toolkit";



const initialState = {
  Notes : [] as NoteProps[],
  currentNote: {} as NoteProps,
  isEdit: false,
}
export const NoteSlice = createSlice({
	name: "NoteSlice",
	initialState: initialState,
	reducers: {
    SET_NOTES(state,{payload}:{payload:NoteProps[]}){
      state.Notes = payload
    },
    SET_CURRENT_NOTES(state,{payload}:{payload:NoteProps}){
      state.currentNote = payload
    },
    SET_IS_EDIT(state,{payload}:{payload:boolean}){
      state.isEdit = payload
    }
	},
});