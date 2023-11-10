'use client'
import React from 'react'
import CustomActionButton from '../atoms/CustomActionButton'
import Image from 'next/image'
import CustomBox from '../molecules/CustomBox'
import useStore from '@/hooks/useStore'
import DesktopIcon from '../molecules/DesktopIcon'
import TaskBarItem from '../molecules/TaskBarItem'
import { TasksSetIsMusicTaskOpen, TasksSetIsMusicTaskMinimized, TasksSetIsMusicTaskMaximized, SetIsStartMenuOpen, TasksSetIsTodoTaskMinimized, TasksSetIsTodoTaskOpen, TasksSetIsNotePadTaskMinimized, TasksSetIsNotePadTaskOpen, FolderSetIsFolderMinimized, FolderSetIsFolderOpen, ProcessSetProcessItemIsMinimized } from '@/store/actions'
import { useDisclosure } from '@mantine/hooks'
import { Drawer } from '@mantine/core'
import { removeExtension } from '@/utils/files'
const TaskBar = () => {

  const [time, setTime] = React.useState('')

  const { states, dispatch } = useStore()

  const [opened, { open, close }] = useDisclosure(false);


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


  const HandlerOnClick = (text: string) => {
    switch (text) {
      case 'Music':
        if (states.Tasks.MusicTask.isMinimized) {
          dispatch(TasksSetIsMusicTaskMinimized(false))
          break;
        }
        dispatch(TasksSetIsMusicTaskOpen(true))
        dispatch(TasksSetIsMusicTaskMinimized(true))
        // dispatch(TasksSetIsMusicTaskMaximized(false))
        break;
      case 'Todo List':
        if (states.Tasks.TodoTask.isMinimized) {
          dispatch(TasksSetIsTodoTaskMinimized(false))
          break;
        }
        dispatch(TasksSetIsTodoTaskOpen(true))
        dispatch(TasksSetIsTodoTaskMinimized(true))
        // dispatch(TasksSetIsTodoTaskMaximized(false))
        break;
      case 'Notepad':
        if (states.Tasks.NotePadTask.isMinimized) {
          dispatch(TasksSetIsNotePadTaskMinimized(false))
          break;
        }
        dispatch(TasksSetIsNotePadTaskOpen(true))
        dispatch(TasksSetIsNotePadTaskMinimized(true))
        // dispatch(TasksSetIsNotePadTaskMaximized(false))
        break;
      case 'My Notes':
        if (states.Folders.find(folder => folder.title === 'My Notes')?.isMinimized) {
          dispatch(FolderSetIsFolderMinimized('My Notes', false))
          break;
        }
        dispatch(FolderSetIsFolderOpen('My Notes', true))
        dispatch(FolderSetIsFolderMinimized('My Notes', true))
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
        <Drawer
          opened={opened}
          onClose={close}
          withCloseButton={false}
          size={'sm'}
          position='left'
          overlayProps={{ backgroundOpacity: 0.0, blur: 0 }}
          transitionProps={{ transition: 'pop-bottom-left', duration: 50, timingFunction: 'linear' }}
          styles={{
            content: {
              marginTop: '24.2%',
              backgroundColor: '#bdc3cd',
              height: '50%',
              borderTop: '2px solid white',
              borderLeft: '2px solid black',
              borderRight: '2px solid black',
              "boxShadow": "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
            }
          }}
        >
          StartMenu
        </Drawer>

        <CustomActionButton
          className='w-20 h-8 flex justify-between pr-1'
          onClick={() => {
            open()
          }}
        >
          <Image width="26" height="26" src="/assets/icons/task-bar-start.png" alt="vaporwave" />
          Start
        </CustomActionButton>

        {states.Process.items.map(item => {
          if (item?.isOpen) {
            return <TaskBarItem
              text={removeExtension(item.title)}
              icon={item?.icon || '/assets/icons/file.png'}
              onClick={() => {
                dispatch(ProcessSetProcessItemIsMinimized({
                  uuid: item.uuid,
                  isMinimized: !item.isMinimized
                }))
              }}
            />
          }
        })}

        {/* {
        states.Tasks.MusicTask.isOpen 
        && 
        <TaskBarItem 
        text='Music' 
        icon={states.Tasks.MusicTask.icon} 
        onClick={HandlerOnClick}/>
        }
        {
        states.Tasks.TodoTask.isOpen
        &&
        <TaskBarItem
        text='Todo List'
        icon={states.Tasks.TodoTask.icon}
        onClick={HandlerOnClick} />
        }
        {
        states.Tasks.NotePadTask.isOpen
        &&
        <TaskBarItem
        text='Notepad'
        icon={states.Tasks.NotePadTask.icon}
        onClick={HandlerOnClick} />
        }
        { */}


      </div>
      <CustomActionButton className='w-16  h-8 flex justify-center pr-1' >
        {time}
      </CustomActionButton>
    </div>
  )
}

export default TaskBar