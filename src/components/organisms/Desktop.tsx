'use client'
import React from 'react'
import DesktopIcon from '../molecules/DesktopIcon'
import useStore from '@/hooks/useStore'
import { TasksSetIsMusicTaskMinimized, TasksSetIsMusicTaskOpen, TasksSetIsTodoTaskMinimized, TasksSetIsTodoTaskOpen } from '@/store/actions'
import MusicApp from './MusicApp'
import StartMenu from './StartMenu'
import TodoApp from './TodoApp'

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
    }
  ]

  const {states, dispatch} = useStore()
  
  

  return (
    <div 
    className='
      w-full h-full
    '
    >
      <TodoApp />
      <MusicApp />
      <StartMenu />
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