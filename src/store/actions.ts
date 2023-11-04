
import { AppActions,AuthActions,TasksActions } from './index';
import { AppNotificationType } from './reducers/app';



export const SetNotification = (value: boolean) => {
  return AppActions.SET_NOTIFICATION(value)
}
export const SetNotificationMessage = (value: string) => {
  return AppActions.SET_NOTIFICATION_MESSAGE(value)
}
export const SetNotificationType = (value: AppNotificationType) => {
  return AppActions.SET_NOTIFICATION_TYPE(value)
}
export const AppHandlerNotification = (value: string, type: AppNotificationType) => {
  return AppActions.HANDLER_NOTIFICATION({value,type})
}

export const TasksSetIsMusicTaskOpen = (value: boolean) => {
  return TasksActions.SET_IS_MUSIC_TASK_OPEN(value)
}
export const TasksSetIsMusicTaskMinimized = (value: boolean) => {
  return TasksActions.SET_IS_MUSIC_TASK_MINIMIZED(value)
}
export const TasksSetIsMusicTaskMaximized = (value: boolean) => {
  return TasksActions.SET_IS_MUSIC_TASK_MAXIMIZED(value)
}