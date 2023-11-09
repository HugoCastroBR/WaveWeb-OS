import { configureStore } from "@reduxjs/toolkit"
import { AppSlice } from "./reducers/app";
import { AuthSlice } from "./reducers/user";
import { TasksSlice } from "./reducers/tasks";
import { MusicsSlice } from "./reducers/musics";
import { TodoSlice } from "./reducers/todo";
import { FoldersSlice } from "./reducers/folders";
import { NoteSlice } from "./reducers/notes";
import { SystemSlice } from "./reducers/system";
import { ProcessSlice } from "./reducers/process";

const store = configureStore({
  reducer:{
    System:SystemSlice.reducer,
    Process:ProcessSlice.reducer,
    App:AppSlice.reducer,
    Auth:AuthSlice.reducer,
    Tasks:TasksSlice.reducer,
    Folders:FoldersSlice.reducer,
    Musics:MusicsSlice.reducer,
    Todo:TodoSlice.reducer,
    Note:NoteSlice.reducer,
  }
})

export default store;
export type RootState = ReturnType<typeof store.getState>

export const AppActions = AppSlice.actions
export const AuthActions = AuthSlice.actions
export const TasksActions = TasksSlice.actions
export const FoldersActions = FoldersSlice.actions
export const MusicsActions = MusicsSlice.actions
export const TodoActions = TodoSlice.actions
export const NoteActions = NoteSlice.actions
export const SystemActions = SystemSlice.actions
export const ProcessActions = ProcessSlice.actions