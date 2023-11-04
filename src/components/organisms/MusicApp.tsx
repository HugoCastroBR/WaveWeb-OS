'use client'
import React from 'react'
import CustomBox from '../molecules/CustomBox'
import useStore from '@/hooks/useStore'
import { TasksSetIsMusicTaskMaximized, TasksSetIsMusicTaskMinimized, TasksSetIsMusicTaskOpen } from '@/store/actions'
import MusicPlayerBar from '../molecules/MusicPlayerBar'
import { Divider } from '@mantine/core'
import MusicPlayerContent from '../molecules/MusicPlayerContent'

const MusicApp = () => {

  const {states, dispatch} = useStore()

  return (
    <CustomBox
      tittle='Music'
      className={`
        absolute top-64 left-64 w-2/6 h-4/6 bg-gray-300
        mb-1
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
      <div className='flex flex-col w-full h-5/6  justify-end 
      
      '>
        <div className='w-full h-full'>
          <MusicPlayerContent />
        </div>
        <Divider color='gray'/>
        <div className=' flex h-16 w-full -mb-20 mt-2  '>
          <MusicPlayerBar />
        </div>
      </div>
      
    </CustomBox>
  )
}

export default MusicApp