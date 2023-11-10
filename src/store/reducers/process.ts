import { createSlice } from "@reduxjs/toolkit";
import React from "react";


export type processInstance = {
  id: number,
  tittle: string,
  type: string,
  content?: any,
  value?: any,
  path?: string,
  isOpen?: boolean,
  isMinimized?: boolean,
  isMaximized?: boolean,
}

export type Process ={
  totalInstances: number,
  instances: processInstance[],
}

const initialState: Process = {
  totalInstances: 0,
  instances: [],
}

export const ProcessSlice = createSlice({
  name: "ProcessSlice",
  initialState: initialState as Process,
  reducers: {
    ADD_PROCESS_INSTANCE(state,{payload}:{payload:processInstance}){
      const isProcessAlreadyOpen = state.instances.find((item) => item.id === payload.id);
      if (!isProcessAlreadyOpen) {
        state.instances.push(payload);
        state.totalInstances += 1;
      }
    },
    REMOVE_PROCESS_INSTANCE(state,{payload}:{payload:processInstance}){
      state.instances = state.instances.filter((item) => item.id !== payload.id);
      state.totalInstances -= 1;
    },
    CLOSE_PROCESS_INSTANCE(state,{payload}:{payload:processInstance}){
      const index = state.instances.findIndex((item) => item.id === payload.id);
      if (index !== -1) {
        state.instances[index].isOpen = false;
      }
    },
    MINIMIZE_PROCESS_INSTANCE(state,{payload}:{payload:processInstance}){
      const index = state.instances.findIndex((item) => item.id === payload.id);
      if (index !== -1) {
        state.instances[index].isMinimized = true;
      }
    },
    MAXIMIZE_PROCESS_INSTANCE(state,{payload}:{payload:processInstance}){
      const index = state.instances.findIndex((item) => item.id === payload.id);
      if (index !== -1) {
        state.instances[index].isMaximized = true;
      }
    },
    SET_CONTENT_PROCESS_INSTANCE(state,{payload}:{payload:processInstance}){
      const index = state.instances.findIndex((item) => item.id === payload.id);
      if (index !== -1) {
        state.instances[index].content = payload.content;
      }
    }
  }
})