
import { createSlice } from "@reduxjs/toolkit";




type IAppSlice = {
	isNotificationOpen: boolean;
	notificationMessage: string;
	notificationTitle: string;
	confirmed: boolean | null;
	focusedItem?: string;
	isFileMenuOpen?: boolean;
	isAboutMenuOpen?: boolean;
}


export const AppSlice = createSlice({
	name: "AppSlice",
	initialState: {
		isNotificationOpen: false,
		notificationMessage: '',
		notificationTitle: '',
		confirmed: null,
		focusedItem: undefined,
		isFileMenuOpen: false,
		isAboutMenuOpen: false,
		
	} as IAppSlice,
	reducers: {
		SET_NOTIFICATION(state,{payload}:{payload:boolean}){
			state.isNotificationOpen = payload
		},
		SET_NOTIFICATION_MESSAGE(state,{payload}:{payload:string}){
			state.notificationMessage = payload
		},
		SET_NOTIFICATION_TITLE(state,{payload}:{payload:string}){
			state.notificationTitle = payload
		},
		HANDLER_NOTIFICATION(state,{payload}:{payload: {title:string,message:string}}){
			state.isNotificationOpen = true
			state.notificationMessage = payload.message
			state.notificationTitle = payload.title
		},
		SET_CONFIRMED(state,{payload}:{payload:boolean}){
			state.confirmed = payload
		},
		SET_FOCUSED_ITEM(state,{payload}:{payload:string}){
			state.focusedItem = payload
		},
		SET_FILE_MENU_OPEN(state,{payload}:{payload:boolean}){
			state.isFileMenuOpen = payload
		},
		SET_ABOUT_MENU_OPEN(state,{payload}:{payload:boolean}){
			state.isAboutMenuOpen = payload
		},
	},
});