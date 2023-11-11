import { createSlice } from '@reduxjs/toolkit';
import { uuid } from './../../utils/files';


export type processItemProps = {
  uuid: string,
  name: string,
  title: string,
  extension: string,
  path?: string,
  content?: any,
  isOpen?: boolean,
  isMinimized?: boolean,
  isMaximized?: boolean,
  isRunning?: boolean,
  icon?: string,
}

export type processProps = {
  items: processItemProps[]
  focusedItem?: string // uuid
}

export const ProcessSlice = createSlice({
  name: "ProcessSlice",
  initialState: {
    items: [] as processItemProps[],
    focusedItem: '',
  } as processProps,
  reducers: {
    ADD_PROCESS_ITEM(state,{payload}:{payload:processItemProps}){
      state.items.push(payload)
    },
    REMOVE_PROCESS_ITEM(state,{payload}:{payload:string}){
      const index = state.items.findIndex(item => item.uuid === payload)
      state.items.splice(index,1)
    },
    SET_PROCESS_ITEM(state,{payload}:{payload:processItemProps}){
      const index = state.items.findIndex(item => item.uuid === payload.uuid)
      state.items[index] = payload
    },
    SET_PROCESS_ITEM_CONTENT(state,{payload}:{payload:{uuid:string,content:any}}){
      const index = state.items.findIndex(item => item.uuid === payload.uuid)
      state.items[index].content = payload.content
    },
    SET_PROCESS_ITEM_IS_OPEN(state,{payload}:{payload:{uuid:string,isOpen:boolean}}){
      const index = state.items.findIndex(item => item.uuid === payload.uuid)
      state.items[index].isOpen = payload.isOpen
    },
    SET_PROCESS_ITEM_IS_MINIMIZED(state,{payload}:{payload:{uuid:string,isMinimized:boolean}}){
      const index = state.items.findIndex(item => item.uuid === payload.uuid)
      state.items[index].isMinimized = payload.isMinimized
    },
    SET_PROCESS_ITEM_IS_MAXIMIZED(state,{payload}:{payload:{uuid:string,isMaximized:boolean}}){
      const index = state.items.findIndex(item => item.uuid === payload.uuid)
      state.items[index].isMaximized = payload.isMaximized
    },
    SET_PROCESS_ITEM_IS_RUNNING(state,{payload}:{payload:{uuid:string,isRunning:boolean}}){
      const index = state.items.findIndex(item => item.uuid === payload.uuid)
      state.items[index].isRunning = payload.isRunning
    },
    SET_PROCESS_ITEM_IS_FOCUSED(state,{payload}:{payload:{uuid:string,isFocused:boolean}}){
      state.focusedItem = payload.uuid
    },
    SET_PROCESS_ITEM_ICON(state,{payload}:{payload:{uuid:string,icon:string}}){
      const index = state.items.findIndex(item => item.uuid === payload.uuid)
      state.items[index].icon = payload.icon
    },
    CLEAR_FOCUSED_ITEMS(state){
      state.focusedItem = undefined
    }
  }
});