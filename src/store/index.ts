import { configureStore } from "@reduxjs/toolkit"
import { AppSlice } from "./reducers/app";
import { AuthSlice } from "./reducers/user";
import { TasksSlice } from "./reducers/tasks";
import { MusicsSlice } from "./reducers/musics";
import { TodoSlice } from "./reducers/todo";

const store = configureStore({
  reducer:{
    App:AppSlice.reducer,
    Auth:AuthSlice.reducer,
    Tasks:TasksSlice.reducer,
    Musics:MusicsSlice.reducer,
    Todo:TodoSlice.reducer,
  }
})

export default store;
export type RootState = ReturnType<typeof store.getState>

export const AppActions = AppSlice.actions
export const AuthActions = AuthSlice.actions
export const TasksActions = TasksSlice.actions
export const MusicsActions = MusicsSlice.actions
export const TodoActions = TodoSlice.actions
