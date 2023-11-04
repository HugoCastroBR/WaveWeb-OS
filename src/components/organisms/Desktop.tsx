'use client'
import React from 'react'
import DesktopIcon from '../molecules/DesktopIcon'
import useStore from '@/hooks/useStore'
import { TasksSetIsMusicTaskMinimized, TasksSetIsMusicTaskOpen } from '@/store/actions'
import MusicApp from './MusicApp'

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
    }
  ]

  const {states, dispatch} = useStore()
  
  

  return (
    <div 
    className='
      w-full h-full
    '
    >
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