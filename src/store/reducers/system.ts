import { createSlice } from "@reduxjs/toolkit"


export type systemProps = {
  explorer: {
    isOpen: boolean,
    isMinimized: boolean,
    isMaximized: boolean,
    icon: string,
  }
}

export const SystemSlice = createSlice({
  name: "SystemSlice",
  initialState: {
    explorer: {
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      icon: '/assets/icons/folder.png',
    }
  } as systemProps,
  reducers: {
    SET_EXPLORER_IS_OPEN(state,{payload}:{payload:boolean}){
      state.explorer.isOpen = payload
    },
    SET_EXPLORER_IS_MINIMIZED(state,{payload}:{payload:boolean}){
      state.explorer.isMinimized = payload
    },
    SET_EXPLORER_IS_MAXIMIZED(state,{payload}:{payload:boolean}){
      state.explorer.isMaximized = payload
    },
    SET_EXPLORER_ICON(state,{payload}:{payload:string}){
      state.explorer.icon = payload
    },
  }
})