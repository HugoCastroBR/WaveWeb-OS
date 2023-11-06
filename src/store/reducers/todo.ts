
import { SpotifySearchMusic } from "@/api/spotify";
import { createSlice } from "@reduxjs/toolkit";




export type TodoProps = {
  id: number;
  title: string;
  content: string;
  isDone: boolean;
  createdAt: string;
  updatedAt: string;
}

const initialState = {
  Todos : [] as TodoProps[],
  currentTodo: {} as TodoProps
}
export const TodoSlice = createSlice({
	name: "TodoSlice",
	initialState: initialState,
	reducers: {
    SET_TODOS(state,{payload}:{payload:TodoProps[]}){
      state.Todos = payload
    },
    SET_CURRENT_TODO(state,{payload}:{payload:TodoProps}){
      state.currentTodo = payload
    },
	},
});