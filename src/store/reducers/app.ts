
import { createSlice } from "@reduxjs/toolkit";


export type AppNotificationType = {
	notificationType: 'success' | 'error' | 'warning' | 'info' ;
}

type IAppSlice =  AppNotificationType &{
	isNotificationOpen: boolean;
	notificationMessage: string;
	notificationType: 'success' | 'error' | 'warning' | 'info' ;
}


export const AppSlice = createSlice({
	name: "AppSlice",
	initialState: {
		isNotificationOpen: false,
		notificationMessage: '',
		notificationType: 'success',
	} as IAppSlice,
	reducers: {
		SET_NOTIFICATION(state,{payload}:{payload:boolean}){
			state.isNotificationOpen = payload
		},
		SET_NOTIFICATION_MESSAGE(state,{payload}:{payload:string}){
			state.notificationMessage = payload
		},
		SET_NOTIFICATION_TYPE(state,{payload}:{payload:AppNotificationType}){
			state.notificationType = payload.notificationType
		},
		HANDLER_NOTIFICATION(state,{payload}:{payload:{value:string,type:AppNotificationType}}){
			state.isNotificationOpen = true
			state.notificationMessage = payload.value
			state.notificationType = payload.type.notificationType
		},
	},
});