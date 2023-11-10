'use client'
import React, { use, useEffect, useState } from 'react'
import DesktopIcon from '../molecules/DesktopIcon'
import useStore from '@/hooks/useStore'
import { FolderSetIsFolderMinimized, FolderSetIsFolderOpen, PathClearSelectedItems, PathSetIsOpen, PathSetPath, TasksSetIsMusicTaskMinimized, TasksSetIsMusicTaskOpen, TasksSetIsNotePadTaskOpen, TasksSetIsTodoTaskMinimized, TasksSetIsTodoTaskOpen } from '@/store/actions'
import MusicApp from './MusicApp'
import TodoApp from './TodoApp'
import NotePadApp from './NotePadApp'
import NoteFolder from './NoteFolder'
import CustomAlert from './CustomAlert'
import useStorage from '@/hooks/useStorage'
import CustomActionButton from '../atoms/CustomActionButton'
import { verifyIfIsFile } from '@/utils/files'
import CustomBox from '../molecules/CustomBox'


interface DesktopItemProps {
  onClick?: () => void
  imgSrc: string
  text: string
}


const Desktop = () => {


  const { fs } = useStorage()


  // Window Items
  const DesktopOpenItems = () => {
    return (
      <>
        <CustomAlert />
        <NoteFolder />
        <NotePadApp />
        <TodoApp />
        <MusicApp />
      </>
    )
  }


  // Desktop Icons
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
  
  
  const [currentPath, setCurrentPath] = useState('/')

  const readPath = async (path:string) => {
    fs?.readdir(path, (err, files) => {
      if(err) console.log(err)
      else{
        dispatch(PathSetPath([{
          path,
          files: files.map((file) => {
            return {
              path: file,
              isFile: verifyIfIsFile(file),
            }
          })
        }]))
      }
    })
  };




  const goBack = async () => {
    dispatch(PathClearSelectedItems())
    if (currentPath === '/') {
      // Você já está na raiz, não pode voltar mais.
      return;
    }

    const pathSegments = currentPath.split('/').filter(Boolean);
    const parentPath = `/${pathSegments.slice(0, -1).join('/')}`;

    fs?.readdir(parentPath, (err, files) => {
      if (err) {
        throw err;
      }
      dispatch(PathSetPath([{
        path: parentPath,
        files: files.map((file) => {
          return {
            path: file,
            isFile: verifyIfIsFile(file),
          }
        })
      }]))
      setCurrentPath(parentPath);
    });
  };

  useEffect(() => {
    readPath(currentPath)
  }, [currentPath])

  return (
    <div 
    onMouseEnter={() => {
      readPath(currentPath)
    }}
    className='
      w-full h-full flex flex-col
    '
    >
      {DesktopOpenItems()}
    {/* {states.Path.paths.map((path, index) => {
      if(path.isOpen){
        return (
          <CustomBox
            tittle={path.path}
            key={index}
          >
            {path?.content || 'No Content'}
          </CustomBox>
        )

      }
    })} */}
    <div className='flex w-full h-10 bg-white items-center '>
      <CustomActionButton
        onClick={() => {
          goBack()
        }}
        className='
          w-20 h-full bg-gray-300
        '
      >
        Go Back
      </CustomActionButton>
      <span className='p-1 '>{currentPath}</span>
    </div>
      {states.Path.paths.map((path, index) => {
        return (
          <div key={index}>
            {path.files.map((file, index) => {
              return (
                <DesktopIcon
                  key={index}
                  file={file.path}
                  onDoubleClick={(filename) => {
                    console.log(`filename: ${filename}`)
                    if(verifyIfIsFile(file.path)){
                      console.log('is file')
                    }else{
                      setCurrentPath(`${currentPath}/${filename}`.replaceAll('//','/'))
                    }
                  }}
                />
              )
            })}
          </div>
        )
      })}

    </div>
  )
}

export default Desktop