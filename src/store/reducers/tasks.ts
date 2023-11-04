
import { createSlice } from "@reduxjs/toolkit";


interface ItemTaskState {
  isOpen: boolean,
  isMinimized: boolean,
  isMaximized?: boolean,
  name: string,
  title: string,
  icon: string,
}

interface TasksState {
  MusicTask: ItemTaskState,
}
const initialState: TasksState = {
  MusicTask: {
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    name: "MusicTask",
    title: "Music",
    icon: '/assets/icons/music-task.png',
  },
}

export const TasksSlice = createSlice({
	name: "TasksSlice",
	initialState: initialState as TasksState,
	reducers: {
    SET_IS_MUSIC_TASK_OPEN(state,{payload}:{payload:boolean}){
      state.MusicTask.isOpen = payload
    },
    SET_IS_MUSIC_TASK_MINIMIZED(state,{payload}:{payload:boolean}){
      state.MusicTask.isMinimized = payload
    },
    SET_IS_MUSIC_TASK_MAXIMIZED(state,{payload}:{payload:boolean}){
      state.MusicTask.isMaximized = payload
    },
	},
});