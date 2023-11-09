import { createSlice } from "@reduxjs/toolkit";
import React from "react";


export type processInstance = {
  id: number,
  tittle: string,
  type: string,
  content: React.ReactNode,
  path?: string,
  isOpen?: boolean,
  isMinimized?: boolean,
  isMaximized?: boolean,
}

export type Process ={
  instances: processInstance[],
}

const initialState: Process = {
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
      }
    },
    REMOVE_PROCESS_INSTANCE(state,{payload}:{payload:processInstance}){
      state.instances = state.instances.filter((item) => item.id !== payload.id);
    },
    CLEAR_PROCESS_INSTANCE(state){
      state.instances = [];
    }
  }
})