'use client'
import React from 'react'
import CustomActionButton from '../atoms/CustomActionButton'
import Image from 'next/image'
import CustomBox from '../molecules/CustomBox'
import useStore from '@/hooks/useStore'
import DesktopIcon from '../molecules/DesktopIcon'
import TaskBarItem from '../molecules/TaskBarItem'
import { TasksSetIsMusicTaskOpen, TasksSetIsMusicTaskMinimized, TasksSetIsMusicTaskMaximized } from '@/store/actions'
const TaskBar = () => {

  const [time, setTime] = React.useState('')
  
  const {states, dispatch} = useStore()

  function getCurrentTimeEveryMinute() {
    function getCurrentTime() {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');
      return `${hours}:${minutes}`;
    }
    function displayCurrentTime() {
      const currentTime = getCurrentTime();
      setTime(currentTime);
    }
    displayCurrentTime();
    setInterval(displayCurrentTime, 60000); 
  }

  React.useEffect(() => {
    getCurrentTimeEveryMinute()
  }, [])

  React.useEffect(() => {
    getCurrentTimeEveryMinute()
  }, [time])


  const HandlerOnClick = (text:string) => {
    switch (text) {
      case 'Music':
        if(states.Tasks.MusicTask.isMinimized) {
          dispatch(TasksSetIsMusicTaskMinimized(false))
          break;
        }
        dispatch(TasksSetIsMusicTaskOpen(true))
        dispatch(TasksSetIsMusicTaskMinimized(true))
        // dispatch(TasksSetIsMusicTaskMaximized(false))
        break;
      default:
        break;
    }
  }


  return (
    <div className='
      h-8  py-3 flex items-center w-full bg-gray-300 
      border-t-2 border-t-gray-400
      justify-between z-30
    '>
      <div className='flex h-full  items-start pb-8'>
        <CustomActionButton className='w-20 h-8 flex justify-between pr-1' >
          <Image width="26" height="26" src="/assets/icons/task-bar-start.png" alt="vaporwave"/>
            Start
        </CustomActionButton>
        {states.Tasks.MusicTask.isOpen && <TaskBarItem text='Music' onClick={HandlerOnClick}/>}
      </div>
      <CustomActionButton className='w-16  h-8 flex justify-center pr-1' >
        {time}
      </CustomActionButton>
    </div>
  )
}

export default TaskBar