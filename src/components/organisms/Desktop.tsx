'use client'
import React, { useEffect } from 'react'
import DesktopIcon from '../molecules/DesktopIcon'
import useStore from '@/hooks/useStore'
import { FolderSetIsFolderMinimized, FolderSetIsFolderOpen, TasksSetIsMusicTaskMinimized, TasksSetIsMusicTaskOpen, TasksSetIsNotePadTaskOpen, TasksSetIsTodoTaskMinimized, TasksSetIsTodoTaskOpen } from '@/store/actions'
import MusicApp from './MusicApp'
import TodoApp from './TodoApp'
import NotePadApp from './NotePadApp'
import NoteFolder from './NoteFolder'
import CustomAlert from './CustomAlert'


interface DesktopItemProps {
  onClick?: () => void
  imgSrc: string
  text: string
}


const Desktop = () => {



  const DesktopItemProps: DesktopItemProps[] = [
    {
      imgSrc: '/assets/icons/music-task.png',
      text: 'Music',
      onClick() {
        dispatch(TasksSetIsMusicTaskOpen(true))
        dispatch(TasksSetIsMusicTaskMinimized(false))
      },
    },
    {
      imgSrc: '/assets/icons/todo-task.png',
      text: 'Todo List',
      onClick() {
        dispatch(TasksSetIsTodoTaskOpen(true))
        dispatch(TasksSetIsTodoTaskMinimized(false))
      }
    },
    {
      imgSrc: '/assets/icons/note-pad-task.png',
      text: 'Notepad',
      onClick() {
        dispatch(TasksSetIsNotePadTaskOpen(true))
        dispatch(TasksSetIsTodoTaskMinimized(false))
      }
    },
    {
      imgSrc: '/assets/icons/note-folder.png',
      text: 'My Notes',
      onClick() {
        dispatch(FolderSetIsFolderOpen('My Notes',true))
        dispatch(FolderSetIsFolderMinimized('My Notes',false))
      }
    },
  ]

  const {states, dispatch} = useStore()
  

  
  return (
    <div 
    className='
      w-full h-full
    '
    >
      <CustomAlert />
      <NoteFolder />
      <NotePadApp />
      <TodoApp />
      <MusicApp />
      {DesktopItemProps.map((item, index) => {
        return (
          <DesktopIcon
            key={index}
            imgSrc={item.imgSrc}
            text={item.text}
            onClick={item.onClick}
          />
        )
      })}
    </div>
  )
}

export default Desktop