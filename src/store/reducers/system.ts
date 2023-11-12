import { createSlice } from "@reduxjs/toolkit"


export type systemProps = {
  OS:{
    background?:string,
  },
  explorer: {
    isOpen: boolean,
    isMinimized: boolean,
    isMaximized: boolean,
    icon: string,
  },
  gallery: {
    isOpen: boolean,
    isMinimized: boolean,
    isMaximized: boolean,
    icon: string,
  },
}

export const SystemSlice = createSlice({
  name: "SystemSlice",
  initialState: {
    explorer: {
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      icon: '/assets/icons/folder.png',
    },
    gallery: {
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      icon: '/assets/icons/image-app.png',
      selectedItems: []
    },
    OS:{
      background:undefined
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
    SET_GALLERY_IS_OPEN(state,{payload}:{payload:boolean}){
      state.gallery.isOpen = payload
    },
    SET_GALLERY_IS_MINIMIZED(state,{payload}:{payload:boolean}){
      state.gallery.isMinimized = payload
    },
    SET_GALLERY_IS_MAXIMIZED(state,{payload}:{payload:boolean}){
      state.gallery.isMaximized = payload
    },
    SET_GALLERY_ICON(state,{payload}:{payload:string}){
      state.gallery.icon = payload
    },
    SET_OS_BACKGROUND(state,{payload}:{payload:string}){
      state.OS.background = payload
    },
  }
})