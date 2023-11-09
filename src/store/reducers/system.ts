
import { SystemTask } from "@/hooks/useSystemTasks";
import { createSlice } from "@reduxjs/toolkit";


type ISystemSlice = {
	selectedItems: SystemTask[];
}


export const SystemSlice = createSlice({
	name: "SystemSlice",
	initialState: {
		selectedItems: [] as SystemTask[],
	} as ISystemSlice,
	reducers: {
    ADD_SELECTED_ITEM(state,{payload}:{payload:SystemTask}){
      const isItemAlreadySelected = state.selectedItems.find((item) => item.id === payload.id);
      if (!isItemAlreadySelected) {
        state.selectedItems.push(payload);
      }
    },
    REMOVE_SELECTED_ITEM(state,{payload}:{payload:SystemTask}){
      state.selectedItems = state.selectedItems.filter((item) => item.id !== payload.id);
    },
    CLEAR_SELECTED_ITEMS(state){
      state.selectedItems = [];
    }
  }
})