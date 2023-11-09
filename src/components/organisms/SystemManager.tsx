'use client'
import React, { useEffect, useState } from 'react'
import CustomActionButton from '../atoms/CustomActionButton'
import CustomText from '../atoms/CustomText'
import useSystem from '@/hooks/useSystem'
import SystemApp from '../molecules/SystemApp'
import useSystemTasks, { SystemTask } from '@/hooks/useSystemTasks'
import useStore from '@/hooks/useStore'
import { RightMenuItemProps } from '@/types'


const SystemManager = () => {

  const {
    mainPath,
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

  const { states, dispatch } = useStore()

  useEffect(() => {
    console.log("load")
    LoadMainPath()
  }, [])



  const [isRightMenuOpen, setIsRightMenuOpen] = useState(false)
  const [x, setX] = useState(0)
  const [y, setY] = useState(0)



  const RightMenuItem = ({
    text,
    onClick,
  }: RightMenuItemProps) => {
    return (
      <CustomActionButton
        onClick={onClick}
        className='px-1 py-px'
      >
        <CustomText
          text={text}
        />
      </CustomActionButton>
    )
  }
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

                // console.log(selectedItems)
              }}
              onDoubleClick={(id, name) => {
                const itemPath = `${currentPath}/${item}`.replaceAll('//', '/')
                console.log("navigate to ", itemPath)
                NavigateTo(itemPath)
              }}
            />
          )
        })}
      </div>
    </div>
  )
}

export default SystemManager