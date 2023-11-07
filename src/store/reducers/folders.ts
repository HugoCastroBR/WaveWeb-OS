
import { createSlice } from "@reduxjs/toolkit";

interface ItemInFolder{
  id: string,
  type: 'note' ,
  title: string,
}

interface FolderState {
  title: string,
  icon: string,
  content:  ItemInFolder[],
  isOpen: boolean,
  isMinimized: boolean,
  isMaximized: boolean,
}


const initialState: FolderState[] = [
  {
    title: "My Notes",
    icon: '/assets/icons/note-folder.png',
    content: [],
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
  }
]

export const FoldersSlice = createSlice({
	name: "FoldersSlice",
	initialState: initialState,
	reducers: {
    SET_FOLDER_CONTENT(state,{payload}:{payload:{folderName:string, content:ItemInFolder[]}}){
      const folder = state.find(folder => folder.title === payload.folderName)
      if(folder){
        folder.content = payload.content
      }
    },
    SET_IS_FOLDER_OPEN(state,{payload}:{payload:{folderName:string, isOpen:boolean}}){
      const folder = state.find(folder => folder.title === payload.folderName)
      if(folder){
        folder.isOpen = payload.isOpen
      }
    },
    SET_IS_FOLDER_MINIMIZED(state,{payload}:{payload:{folderName:string, isMinimized:boolean}}){
      const folder = state.find(folder => folder.title === payload.folderName)
      if(folder){
        folder.isMinimized = payload.isMinimized
      }
    },
    SET_IS_FOLDER_MAXIMIZED(state,{payload}:{payload:{folderName:string, isMaximized:boolean}}){
      const folder = state.find(folder => folder.title === payload.folderName)
      if(folder){
        folder.isMaximized = payload.isMaximized
      }
    },
    ADD_FOLDER(state,{payload}:{payload:FolderState}){
      state.push(payload)
    }
	},
});