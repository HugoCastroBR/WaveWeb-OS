'use client'
import React, { useEffect, useState } from 'react'
import Window from './WindowComponent'
import CustomTextArea from '../atoms/CustomTextArea'
import { processItemProps } from '@/store/reducers/process'
import useStorage from '@/hooks/useStorage'
import useStore from '@/hooks/useStore'
import { PathSetPath, ProcessSetProcessItemContent, ProcessSetProcessItemIcon, ProcessSetProcessItemIsMaximized, ProcessSetProcessItemIsMinimized, ProcessSetProcessItemIsOpen } from '@/store/actions'
import CustomActionButton from '../atoms/CustomActionButton'
import CustomInput from '../atoms/CustomInput'
import CustomBox from './CustomBox'
import { removeExtension, verifyIfIsFile } from '@/utils/files'
import wait from '@/utils/wait'



const Note = (props:processItemProps) => {

  const { states,dispatch } = useStore()
  const { fs } = useStorage()

  const [content, setContent] = useState('')
  const [isFileMenuOpen, setIsFileMenuOpen] = useState(false)
  const [fileName, setFileName] = useState(removeExtension(props.title) || '')
  const [isSaveAsInputOpen, setIsSaveAsInputOpen] = useState(false)
  const [rewrite, setRewrite] = useState(false)

  const currentPath = states.Path.paths[0].path

  const reloadPath = async () => {
    await wait(500)
    console.log('reload')

    await fs?.readdir(currentPath, (err, files) => {
      if(err) console.log(err)
      else{
        dispatch(PathSetPath([{
          path: currentPath,
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

  useEffect(() => {
    fs?.readFile(props.path, 'utf-8', (err, data) => {
      if(err) console.log(err)
      dispatch(ProcessSetProcessItemContent({
        uuid: props.uuid,
        content: data
      }))
    })
  }, [fs])

  useEffect(() => {
    setContent(states.Process.items.find(item => item.uuid === props.uuid)?.content || '')
  }, [states.Process.items.find(item => item.uuid === props.uuid)?.content])

  useEffect(() => {
    dispatch(ProcessSetProcessItemIcon({
      uuid: props.uuid,
      icon: props?.icon || '/assets/icons/file.png'
    }))
  },[])

  return (
    <Window 
      withTaskBar
      fileMenuIsOpen={isFileMenuOpen}
      closeFileMenu={(is: boolean) => {
        setIsFileMenuOpen(is)
      }}
      saveOption={true}
      onSave={() => {
        fs?.writeFile(props.path, content, (err) => {
          if(err) console.log(err)
        })
        setIsFileMenuOpen(false)
      }}
      saveAsOption={true}
      onSaveAs={() => {
        setIsSaveAsInputOpen(true)
      
      }}
      icon={props?.icon || '/assets/icons/file.png'}
      className={`
        absolute top-64 left-64 w-3/12 h-3/6 bg-gray-300
        mb-1 flex flex-col 
      `}
      tittle={props.title}
      uuid={props.uuid} 
      setClosed={() => {
        dispatch(ProcessSetProcessItemIsOpen({
          uuid: props.uuid,
          isOpen: false
        }))
      }}
      closed={!props.isOpen}
      setMaximized={() => {
        dispatch(ProcessSetProcessItemIsMaximized({
          uuid: props.uuid,
          isMaximized: !props.isMaximized
        }))
      }}
      maximized={props.isMaximized}
      setMinimized={() => {
        dispatch(ProcessSetProcessItemIsMinimized({
          uuid: props.uuid,
          isMinimized: !props.isMinimized
        }))
      }}
      minimized={props.isMinimized}
      resize
    >
      {
        isSaveAsInputOpen &&
        <>
          <CustomBox
            tittle='Save'
            disableMaximize
            disableMinimize
            className='absolute top-12 left-12 flex flex-col w-80 !z-50 bg-gray-300'
            setClosed={() => {
              setIsSaveAsInputOpen(false)
            }}
          >
            <CustomInput
              className='w-full h-8 mb-2'
              label='File name:'
              value={removeExtension(props.title) || ''}
              onChange={(e) => {
                setFileName(String(e))
              }}
            />
            <div className='flex w-full justify-end items-end'>
              <CustomActionButton
                className='p-px px-1'
                onClick={() => {
                  const alreadyExist = () => {
                    let exist = false
                    states.Path.paths[0].files.forEach(file => {
                      if(`/${file.path}` === `${currentPath}/${fileName}.txt`.replaceAll('//','/')){
                        exist = true
                      }
                    })
                    return exist
                  }
                  
                  if(alreadyExist()){
                    setRewrite(true)
                  }
                  if(rewrite){
                    fs?.writeFile(`${currentPath}/${fileName}.txt`.replaceAll('//','/'), content, (err) => {
                      if(err) console.log(err)
                    })
                  }else{
                    fs?.writeFile(`${currentPath}/${fileName}_new.txt`.replaceAll('//','/'), content, (err) => {
                      if(err) console.log(err)
                    })
                    
                  }
                  setRewrite(false)
                  dispatch(ProcessSetProcessItemIsOpen({
                    uuid: props.uuid,
                    isOpen: false
                  }))
                  reloadPath()
                }}
              >
                
                Save
              </CustomActionButton>
            </div>
          </CustomBox>
        </>
      }
      <CustomTextArea 
        value={content}
        onClick={() => {
          setIsFileMenuOpen(false)
        }}
        onChange={(text) => {
          setContent(text)
          dispatch(ProcessSetProcessItemContent({
            uuid: props.uuid,
            content: text
          }))
        }}
        className='w-full h-full'
      />
    </Window>
  )
}

export default Note