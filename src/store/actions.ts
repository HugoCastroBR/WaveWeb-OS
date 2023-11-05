
import { SpotifySearchMusic } from '@/api/spotify';
import { AppActions,AuthActions,TasksActions,MusicsActions } from './index';
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

export const MusicsSetSearch = (value: SpotifySearchMusic) => {
  return MusicsActions.SET_SEARCH(value)
}
export const MusicsSetTotal = (value: number) => {
  return MusicsActions.SET_TOTAL(value)
}
export const MusicsSetLimit = (value: number) => {
  return MusicsActions.SET_LIMIT(value)
}
export const MusicsSetCurrentSong = (value: string) => {
  return MusicsActions.SET_CURRENT_SONG(value)
}
export const MusicsSetCurrentSongLength = (value: number) => {
  return MusicsActions.SET_CURRENT_SONG_LENGTH(value)
}
export const MusicsSetSongTimer = (value: number) => {
  return MusicsActions.SET_SONG_TIMER(value)
}
export const MusicsSetSongIsPlaying = (value: boolean) => {
  return MusicsActions.SET_SONG_IS_PLAYING(value)
}
export const MusicsSetSongIsPaused = (value: boolean) => {
  return MusicsActions.SET_SONG_IS_PAUSED(value)
}
export const MusicsSetSongName = (value: string) => {
  return MusicsActions.SET_SONG_NAME(value)
}
export const MusicsSetVolume = (value: number) => {
  return MusicsActions.SET_VOLUME(value)
}
export const MusicsSetCurrentSongImage = (value: string) => {
  return MusicsActions.SET_CURRENT_SONG_IMAGE(value)
}
export const MusicsSetArtists = (value: {name:string}[]) => {
  return MusicsActions.SET_ARTISTS(value)
}
export const MusicsResetAll = () => {
  return MusicsActions.RESET_ALL()
}
export const MusicsSetMusicIndex = (value: number) => {
  return MusicsActions.SET_MUSIC_INDEX(value)
}
export const MusicsSetIsLocal = (value: boolean) => {
  return MusicsActions.SET_IS_LOCAL(value)
}