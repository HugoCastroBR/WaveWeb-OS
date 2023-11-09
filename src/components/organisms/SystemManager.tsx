'use client'
import React, { useState } from 'react'
import CustomActionButton from '../atoms/CustomActionButton'
import CustomText from '../atoms/CustomText'
import useSystem from '@/hooks/useSystem'
import SystemApp from '../molecules/SystemApp'
import useSystemTasks from '@/hooks/useSystemTasks'
import { verifyIfIsFile } from '@/utils/files'
import RightMenuItem from '../molecules/RightMenuItem'
import NotePadApp from './NotePadApp'


const SystemManager = () => {

  const {
    LoadMainPath,
    CreateFolder,
    currentPath,
    NavigateTo,
    contentOfCurrentPath,
    goBack,
    DeleteSelects,
  } = useSystem()

  const {
    AddSelectedItem,
    RemoveSelectedItem,
  } = useSystemTasks()


  const [isRightMenuOpen, setIsRightMenuOpen] = useState(false)
  const [x, setX] = useState(0)
  const [y, setY] = useState(0)


  
  const MenuContext = () => {
    return (
      <div
        className={`
        bg-gray-300 
          drop-shadow-sm shadow-sm shadow-gray-800 
          flex flex-col w-32
      `}
        style={{
          position: 'absolute',
          top: y,
          left: x,
          zIndex: 100,
        }}>
        <RightMenuItem
          text='New Folder'
          onClick={() => {
            CreateFolder('New Folder2')
          }}
        />
        <RightMenuItem
          text='Delete'
          onClick={() => {
            DeleteSelects()
          }}
        />
      </div>
    );
  };


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
      onMouseEnter={() => {
        LoadMainPath()
      }}
      className=' h-full p-2 flex flex-col overflow-clip
      '
      style={{
        width: 'calc(100% - 8px)',
        height: 'calc(100% - 40px)',
        position: 'absolute',
        top: '4px',
        left: '4px',
      }}
    >
      {
        isRightMenuOpen &&
        <MenuContext />
      }
      <div className='flex bg-gray-300 w-full h-9 items-center'>
        <CustomActionButton
          onClick={() => {
            goBack()
          }}
        >
          <CustomText
            className='m-1'
            text={`go back`}
          />
        </CustomActionButton>
        <CustomText
          className='m-2'
          text={`path: ${currentPath}`}
        />
      </div>
      <div className='w-min max-h-full flex flex-col flex-wrap'
        style={{
          height: 'calc(100% - 20px)',
        }}
      >
        <div className='absolute bg-red-100 w-full h-full z-10'>
          <NotePadApp/>
        </div>
        {contentOfCurrentPath && contentOfCurrentPath.map((item, index) => {
          return (
            <SystemApp
              key={index}
              id={index}
              name={item}
              onClick={(id, name, selected) => {
                // NavigateTo(name)
                const itemPath = `${currentPath}/${item}`.replaceAll('//', '/')
                if (!selected) {
                  AddSelectedItem({
                    id,
                    path: itemPath,
                  })
                } else {
                  RemoveSelectedItem({
                    id,
                    path: itemPath,
                  })
                }
              }}
              onDoubleClick={(id, name) => {
                const itemPath = `${currentPath}/${item}`.replaceAll('//', '/')
                if(verifyIfIsFile(name)){
                  console.log("open file",name)
                }else{
                  NavigateTo(itemPath)
                }
              }}
            />
          )
        })}
      </div>
    </div>
  )
}

export default SystemManager