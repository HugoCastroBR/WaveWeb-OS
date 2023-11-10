'use client'
import React, { use, useEffect, useState } from 'react'
import DesktopIcon from '../molecules/DesktopIcon'
import useStore from '@/hooks/useStore'
import { FolderSetIsFolderMinimized, FolderSetIsFolderOpen, PathClearSelectedItems, PathSetPath, ProcessAddProcessItem, TasksSetIsMusicTaskMinimized, TasksSetIsMusicTaskOpen, TasksSetIsNotePadTaskOpen, TasksSetIsTodoTaskMinimized, TasksSetIsTodoTaskOpen } from '@/store/actions'
import MusicApp from './MusicApp'
import TodoApp from './TodoApp'
import NotePadApp from './NotePadApp'
import NoteFolder from './NoteFolder'
import CustomAlert from './CustomAlert'
import useStorage from '@/hooks/useStorage'
import CustomActionButton from '../atoms/CustomActionButton'
import { getExtension, uuid, verifyIfIsFile } from '@/utils/files'
import CustomBox from '../molecules/CustomBox'
import RightMenuItem from '../molecules/RightMenuItem'
import NoContent from '../molecules/NoContent'
import WindowComponent from '../molecules/WindowComponent'
import Note from '../molecules/Note'
import { processItemProps } from '@/store/reducers/process'


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
        {/* <NoteFolder /> */}
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


  const [isRightMenuOpen, setIsRightMenuOpen] = useState(false)
  const [x, setX] = useState(0)
  const [y, setY] = useState(0)

  const MenuContext = () => {
    return (
      <div
        className={`
        bg-gray-300 
          drop-shadow-sm shadow-sm shadow-gray-800 
          flex flex-col w-32 z-40
      `}
        style={{
          position: 'absolute',
          top: y,
          left: x,
          zIndex: 100,
        }}>
        <RightMenuItem
          text='New Text File'
          onClick={() => {
            // CreateTxtFile('text')
          }}
        />
        <RightMenuItem
          text='New Folder'
          onClick={() => {
            // CreateFolder('New Folder2')
          }}
        />
        <RightMenuItem
          text='Delete'
          onClick={() => {
            // DeleteSelects()
          }}
        />
      </div>
    );
  };


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
    console.log(states.Path.paths)
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

  useEffect(() => {
    readPath(currentPath)
    console.log("load fs")
  }, [fs])

  const handlerFileType = (item:processItemProps) => {
    switch(item.extension){
      case 'txt':
        return <Note {...item} icon='/assets/icons/note-pad-task.png' />
      default:
        return <>text</>
    }
  }



  

  return (
    <div 
    onContextMenu={(e) => {
      e.preventDefault()
      setX(e.pageX)
      setY(e.pageY)
      setIsRightMenuOpen(true)
    }}
    onClick={() => {

      setIsRightMenuOpen(false)
    }}
    className='
      w-full h-full flex flex-col
    '
    >
      {
        isRightMenuOpen &&
        <MenuContext />
      }
      {DesktopOpenItems()}
    
    <div className='flex w-full h-10 bg-white items-center '>
    <CustomActionButton
        onClick={() => {
          readPath(currentPath)
        }}
        className='
          w-20 h-full bg-gray-300
        '
      >
        Load
      </CustomActionButton>
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
      {
        states.Process.items.length > 0 && 
        states.Process.items.map((item) => {
          if(item.isOpen){
            return(
              handlerFileType(item)
            )
          }
        })

      }
      {states.Path.paths.map((path, index) => {
        return (
          <div key={index}>
            {path.files.map((file, index) => {
              return (
                <DesktopIcon
                  key={index}
                  file={file.path}
                  onDoubleClick={(filename) => {
                    console.log(`path: ${currentPath}/${filename}`.replaceAll('//','/'))
                    const itemUuid = uuid(6)
                    if(verifyIfIsFile(file.path)){
                      
                      dispatch(ProcessAddProcessItem({
                        uuid: itemUuid,
                        name: filename,
                        title: filename,
                        path: `${currentPath}/${filename}`.replaceAll('//','/'),
                        extension: getExtension(filename),
                        isOpen: true,
                        isMinimized: false,
                      }))
                      // dispatch(PathSetIsOpen(`${currentPath}/${filename}`.replaceAll('//','/'),true))
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