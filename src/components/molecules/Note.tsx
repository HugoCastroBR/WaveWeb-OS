'use client'
import React, { useEffect, useState } from 'react'
import Window from './WindowComponent'
import CustomTextArea from '../atoms/CustomTextArea'
import { processItemProps } from '@/store/reducers/process'
import useStorage from '@/hooks/useStorage'
import useStore from '@/hooks/useStore'
import { ProcessSetProcessItemContent, ProcessSetProcessItemIcon, ProcessSetProcessItemIsMaximized, ProcessSetProcessItemIsMinimized, ProcessSetProcessItemIsOpen } from '@/store/actions'



const Note = (props:processItemProps) => {

  const { states,dispatch } = useStore()
  const { fs } = useStorage()

  const [content, setContent] = useState('')

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
      icon={props?.icon || '/assets/icons/file.png'}
      className={`
        absolute top-64 left-64 w-3/12 h-3/6 bg-gray-300
        mb-1 flex flex-col z-30
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
      <CustomTextArea 
        value={content}
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