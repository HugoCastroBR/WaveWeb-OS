'use client'
import { Accordion } from '@mantine/core'
import { title } from 'process'
import React from 'react'
import CustomActionButton from '../atoms/CustomActionButton'
import CustomText from '../atoms/CustomText'
import CustomInput from '../atoms/CustomInput'
import wait from '@/utils/wait'
import { TodoSetTodos } from '@/store/actions'
import useStore from '@/hooks/useStore'
import CustomTextArea from '../atoms/CustomTextArea'
import { getTodos, postTodo } from '@/api'

const NewTodoItem = () => {

  const [title, setTitle] = React.useState('')
  const [content, setContent] = React.useState('')
  const {states, dispatch} = useStore()

  const handlerLoadTodos = async() => {
    const response = await getTodos()
    dispatch(TodoSetTodos(response))
    return response
  }

  const handlerAddTodo = async () => {
    const res = await postTodo(title, content)
    console.log(res)
    setTitle('')
    setContent('')
    handlerLoadTodos()
  }

  return (
    <Accordion
      transitionDuration={100}
      disableChevronRotation
      chevronPosition='left'
      styles={
        {
          root: {
            marginBottom: '2px',
          },
          label: {
            padding: '0px',
            marginRight: '-8px',
            overflow: 'visible',
          },
          control: {
            border: 0,
            padding: '0px',
            borderRadius: '0px',
            backgroundColor: '#D1D5DB',
            borderTop: '2px solid #e3e3e3',
            borderLeft: '1px solid #e3e3e3',
            borderRight: '2px solid #333333',
            borderBottom: '2px solid #333333',
          },
          chevron: {
            width: '32px',
            height: '32px',
            borderTop: '1px solid #e3e3e3',
            borderLeft: '1px solid #e3e3e3',
            borderRight: '1px solid #333333',
            flex: 'row',
            marginLeft: '0px',
            justifyContent: 'center',
            alignItems: 'center',
            display: 'hidden',
          },
          item: {
            borderRight: '2x solid #333333',
          },
          panel: {
            border: 0,
            padding: '0px',
            borderRadius: '0px',
          },
          content: {
            padding: '0px',
            borderRadius: '0px',
            marginTop: '1px',
            borderTop: '2px solid #e3e3e3',
            borderLeft: '2px solid #e3e3e3',
            borderRight: '2px solid #333333',
            borderBottom: '2px solid #333333',
          },
        }
      }>
      <Accordion.Item value={'New Todo Item'}>
        <Accordion.Control>
          <div className='flex w-full justify-between -ml-2 items-center'>
            <CustomText
              text={'New Todo Item'}
              className='font-semibold text-lg'
            />
          </div>
        </Accordion.Control>
        <Accordion.Panel>
            <div
              className={`top-1/4
            bg-gray-300 
              z-20
              border-t-2 border-t-gray-100 border-l-2 border-l-gray-100
              border-r-2 border-r-gray-800 border-b-2 border-b-gray-800
              drop-shadow-sm shadow-sm shadow-gray-800  !overflow-hidden
              `}
            >
            <div className='p-1 w-full h-full '>
              <CustomInput 
                label='Title'
                value={title}
                onChange={(value) => {
                  setTitle(value as string)
                }}
              />
              <CustomTextArea 
                label='Description' 
                value={content}
                className='w-full' 
                onChange={(value) => {
                  setContent(value as string)
                }}
              />
              <CustomActionButton 
                className='w-full mt-2'
                onClick={handlerAddTodo}
              >
                Add
              </CustomActionButton>
            </div>
          </div>
        </Accordion.Panel>
      </Accordion.Item>
    </Accordion>

  )
}

export default NewTodoItem
