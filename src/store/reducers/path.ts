import { title } from 'process';
import { uuid } from './../../utils/files';
import { createSlice } from '@reduxjs/toolkit';


export type fileProps = {
  path: string,
  extension?: string,
  content?: string,
  isOpen?: boolean,
  isMinimized?: boolean,
  isMaximized?: boolean,
}

export type pathProps = {
  path: string,
  files: fileProps[]
}



const initialState = {
  paths : [] as pathProps[],
  selectedItems : [] as string[],
}


export const PathSlice = createSlice({
  name: "PathSlice",
  initialState: initialState,
  reducers: {
    SET_PATH(state,{payload}:{payload:pathProps[]}){
      state.paths = payload
    },
    SET_FILES(state,{payload}:{payload:{path:string,files:string[]}}){
      const pathIndex = state.paths.findIndex(path => path.path.includes(payload.path))
      state.paths[pathIndex].files = payload.files.map(file => {
        return {
          path: file,
          extension: file.split('.')[1],
          content: '',
          isOpen: false,
          isMinimized: false,
          isMaximized: false,
        }
      })
    },
    ADD_SELECTED_ITEM(state,{payload}:{payload:string}){
      state.selectedItems.push(payload)
    },
    REMOVE_SELECTED_ITEM(state,{payload}:{payload:string}){
      const index = state.selectedItems.findIndex(item => item === payload)
      state.selectedItems.splice(index,1)
    },
    CLEAR_SELECTED_ITEMS(state){
      state.selectedItems = []
    },
    SET_IS_OPEN(state,{payload}:{payload:{path:string,isOpen:boolean}}){
      const pathIndex = state.paths.findIndex(path => path.path.includes(payload.path))
      console.log(pathIndex)
      // state.paths[pathIndex].isOpen = payload.isOpen
    },
    
  }
});