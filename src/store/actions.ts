
import { SpotifySearchMusic } from '@/api/spotify';
import { ProcessActions, AppActions,AuthActions,TasksActions,MusicsActions, TodoActions,FoldersActions, NoteActions, SystemActions } from './index';
import { TodoProps } from './reducers/todo';
import { NoteProps } from '@/types';
import { SystemTask } from '@/hooks/useSystemTasks';
import { processInstance } from './reducers/process';



export const SystemAddSelectedItem = (value: SystemTask) => {
  return SystemActions.ADD_SELECTED_ITEM(value)
}
export const SystemRemoveSelectedItem = (value: SystemTask) => {
  return SystemActions.REMOVE_SELECTED_ITEM(value)
}
export const SystemClearSelectedItems = () => {
  return SystemActions.CLEAR_SELECTED_ITEMS()
}

export const ProcessAddProcessInstance = (value:processInstance) => {
  return ProcessActions.ADD_PROCESS_INSTANCE(value)
}
export const ProcessRemoveProcessInstance = (value:processInstance) => {
  return ProcessActions.REMOVE_PROCESS_INSTANCE(value)
}
export const ProcessClearProcessInstance = () => {
  return ProcessActions.CLEAR_PROCESS_INSTANCE()
}


export const SetNotification = (value: boolean) => {
  return AppActions.SET_NOTIFICATION(value)
}
export const SetNotificationMessage = (value: string) => {
  return AppActions.SET_NOTIFICATION_MESSAGE(value)
}
export const AppHandlerNotification = (title:string,message:string) => {
  return AppActions.HANDLER_NOTIFICATION({title,message})
}
export const AppSetConfirmed = (value: boolean) => {
  return AppActions.SET_CONFIRMED(value)
}
export const AppSetFocusedItem = (value: string) => {
  return AppActions.SET_FOCUSED_ITEM(value)
}
export const AppSetFileMenuOpen = (value: boolean) => {
  return AppActions.SET_FILE_MENU_OPEN(value)
}
export const AppSetAboutMenuOpen = (value: boolean) => {
  return AppActions.SET_ABOUT_MENU_OPEN(value)
}


export const FolderSetNoteFolderContent = (
  folderName: string, 
  content: {id:string,
    type:'note',
    title:string
  }[]
  ) => {
  return FoldersActions.SET_FOLDER_CONTENT({folderName,content})
}
export const FolderSetIsFolderOpen = (folderName: string, isOpen: boolean) => {
  return FoldersActions.SET_IS_FOLDER_OPEN({folderName,isOpen})
}
export const FolderSetIsFolderMinimized = (folderName: string, isMinimized: boolean) => {
  return FoldersActions.SET_IS_FOLDER_MINIMIZED({folderName,isMinimized})
}
export const FolderSetIsFolderMaximized = (folderName: string, isMaximized: boolean) => {
  return FoldersActions.SET_IS_FOLDER_MAXIMIZED({folderName,isMaximized})
}
export const FolderAddFolder = (value: {
  title: string,
  icon: string,
  content:  {
    id:string,
    type:'note',
    title:string
  }[],
  isOpen: boolean,
  isMinimized: boolean,
  isMaximized: boolean,
}) => {
  return FoldersActions.ADD_FOLDER(value)
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

export const TasksSetIsTodoTaskOpen = (value: boolean) => {
  return TasksActions.SET_IS_TODO_TASK_OPEN(value)
}
export const TasksSetIsTodoTaskMinimized = (value: boolean) => {
  return TasksActions.SET_IS_TODO_TASK_MINIMIZED(value)
}
export const TasksSetIsTodoTaskMaximized = (value: boolean) => {
  return TasksActions.SET_IS_TODO_TASK_MAXIMIZED(value)
}

export const TasksSetIsNotePadTaskOpen = (value: boolean) => {
  return TasksActions.SET_IS_NOTEPAD_TASK_OPEN(value)
}
export const TasksSetIsNotePadTaskMinimized = (value: boolean) => {
  return TasksActions.SET_IS_NOTEPAD_TASK_MINIMIZED(value)
}
export const TasksSetIsNotePadTaskMaximized = (value: boolean) => {
  return TasksActions.SET_IS_NOTEPAD_TASK_MAXIMIZED(value)
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
export const SetIsStartMenuOpen = (value: boolean) => {
  return TasksActions.SET_IS_START_MENU_OPEN(value)
}


export const TodoSetTodos = (value: TodoProps[]) => {
  return TodoActions.SET_TODOS(value)
}
export const TodoSetCurrentTodo = (value: TodoProps) => {
  return TodoActions.SET_CURRENT_TODO(value)
}


export const NoteSetNotes = (value: NoteProps[]) => {
  return NoteActions.SET_NOTES(value)
}
export const NoteSetCurrentNote = (value: NoteProps) => {
  return NoteActions.SET_CURRENT_NOTES(value)
}
export const NoteSetIsEdit = (value: boolean) => {
  return NoteActions.SET_IS_EDIT(value)
}