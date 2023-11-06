
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
  TodoTask: ItemTaskState,
  isStartMenuOpen?: boolean,
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
  TodoTask: {
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    name: "TodoTask",
    title: "Todo",
    icon: '/assets/icons/todo-task.png',
  },
  isStartMenuOpen: false,
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
    SET_IS_START_MENU_OPEN(state,{payload}:{payload:boolean}){
      state.isStartMenuOpen = payload
    },
    SET_IS_TODO_TASK_OPEN(state,{payload}:{payload:boolean}){
      state.TodoTask.isOpen = payload
    },
    SET_IS_TODO_TASK_MINIMIZED(state,{payload}:{payload:boolean}){
      state.TodoTask.isMinimized = payload
    },
    SET_IS_TODO_TASK_MAXIMIZED(state,{payload}:{payload:boolean}){
      state.TodoTask.isMaximized = payload
    },
	},
});