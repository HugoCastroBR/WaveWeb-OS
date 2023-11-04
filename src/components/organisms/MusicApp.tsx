'use client'
import React from 'react'
import CustomBox from '../molecules/CustomBox'
import useStore from '@/hooks/useStore'
import { TasksSetIsMusicTaskMaximized, TasksSetIsMusicTaskMinimized, TasksSetIsMusicTaskOpen } from '@/store/actions'

const MusicApp = () => {

  const {states, dispatch} = useStore()

  return (
    <CustomBox
      tittle='Music'
      className={`
        absolute top-64 left-64 w-96 h-96 bg-gray-300

      `}
      closed={!states.Tasks.MusicTask.isOpen}
      minimized={states.Tasks.MusicTask.isMinimized}
      maximized={states.Tasks.MusicTask.isMaximized}
      setMaximized={() => {
        if(!states.Tasks.MusicTask.isMaximized) {
          dispatch(TasksSetIsMusicTaskMaximized(true))
        } else {
          dispatch(TasksSetIsMusicTaskMaximized(false))
        }
      }}
      setClosed={() => {
        dispatch(TasksSetIsMusicTaskOpen(false))
      }}
      setMinimized={() => {
        dispatch(TasksSetIsMusicTaskMinimized(true))
      }}
    >
      Music
    </CustomBox>
  )
}

export default MusicApp