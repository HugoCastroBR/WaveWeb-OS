'use client'
import React, { useEffect, useState } from 'react'
import CustomActionButton from '../atoms/CustomActionButton'
import CustomText from '../atoms/CustomText'
import SystemApp from '../molecules/SystemApp'
import useSystemTasks from '@/hooks/useSystemTasks'
import { getExtensionFromFileName, verifyIfIsFile } from '@/utils/files'
import RightMenuItem from '../molecules/RightMenuItem'
import NotePadApp from './NotePadApp'
import useStore from '@/hooks/useStore'
import usePath from '@/hooks/usePath'
import useSystemProcess from '@/hooks/useSystemProcess'
import Window from '../molecules/Window'
import { generateRandomText } from '@/utils/process'
import { Input } from 'postcss'
import { ProcessCloseProcessInstance, ProcessSetContentProcessInstance } from '@/store/actions'
import CustomBox from '../molecules/CustomBox'
import { processInstance } from '@/store/reducers/process'

const SystemManager = () => {

  const {
    LoadMainPath,
    CreateFolder,
    currentPath,
    NavigateTo,
    contentOfCurrentPath,
    goBack,
    DeleteSelects,
    ReadFile,
    CreateTxtFile,
  } = usePath()

  const {
    AddSelectedItem,
    RemoveSelectedItem,
  } = useSystemTasks()

  const { CreateProcess } = useSystemProcess()

  const { states, dispatch } = useStore()

  const { fs } = usePath()


  const [isRightMenuOpen, setIsRightMenuOpen] = useState(false)
  const [x, setX] = useState(0)
  const [y, setY] = useState(0)




  const [_temp, setTemp] = useState<processInstance>()
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
            CreateTxtFile('text')
          }}
        />
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

  const handleReadFile = async (path: string) => {
    console.log(path)
    console.log('string')
    const res = await ReadFile(path,_temp)
    const data = await res
    return data
  }

  useEffect(() => {

    console.log("load")
  }, [])

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
      z-10 
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
      <div className='flex bg-gray-300 w-full h-9 items-center z-10'>
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
        {
          states.Process.instances.filter(item => item).map((item, index) => {
            const uniqueId = generateRandomText(10)
            switch (item.type) {
              case 'txt':
                
                return (
                  <Window
                    key={item.id}
                    id={item.id}
                    tittle={`${item.id}, ${item.tittle}`}
                    uniqueId={uniqueId}
                    closed={!item.isOpen}
                    resize
                    setClosed={(value) => {
                      dispatch(ProcessCloseProcessInstance(item))
                    }}
                  >
                    {item.type === 'txt' &&
                      <NotePadApp
                        id={item.id}
                        title={item.tittle}
                        path={item.path}
                        uniqueId={uniqueId}
                        onChange={(value) => {
                          console.log(value)
                        }}
                      />
                    }
                  </Window>
                )
              default:
                return (
                  <CustomBox tittle='Error'>
                    <CustomText
                      text='No content'
                    />
                  </CustomBox>
                )
            }
          })
        }
        {contentOfCurrentPath && contentOfCurrentPath.map((item, index) => {
          return (
            <SystemApp
              key={index}
              id={index}
              name={item}
              onClick={(id, name, selected) => {
                const loadFile = async () => {
                  fs?.readFile(`${currentPath}/${item}`.replaceAll('//', '/'), (err, data) => {
                    if (err) {
                      console.log('Error reading the file:', err);
                    } else {
                      const content = new TextDecoder('utf-8').decode(data);
                      dispatch(ProcessSetContentProcessInstance({
                        id: id,
                        content,
                        tittle: name,
                        type: getExtensionFromFileName(name),
                      }))
                    }
                  });
                };
                loadFile()
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
              onDoubleClick={async (id, name) => {
                const itemPath = `${currentPath}/${item}`.replaceAll('//', '/')
                if (verifyIfIsFile(name)) {
                  console.log(itemPath)
                  setTemp({
                    id: states.Process.instances.length,
                    tittle: name,
                    type: getExtensionFromFileName(name),
                    path: itemPath,
                    isOpen: true,
                  })
                  const _id = states.Process.instances.length
                  const content = await handleReadFile(itemPath)
                  console.log(content)
                  CreateProcess({
                    id: _id,
                    tittle: name,
                    type: getExtensionFromFileName(name),
                    path: itemPath,
                    content: content,
                    isOpen: true,
                  })
                } else {
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