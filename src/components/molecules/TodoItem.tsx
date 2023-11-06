
'use client'
import { Accordion } from '@mantine/core'
import React, { useEffect } from 'react'
import CustomActionButton from '../atoms/CustomActionButton'
import CustomText from '../atoms/CustomText'
import { TodoProps } from '@/store/reducers/todo'
import { getTodos, updateTodo } from '@/api'
import { TodoSetTodos } from '@/store/actions'
import { useStore } from 'react-redux'
import wait from '@/utils/wait'

const TodoItem = ({
  content,
  createdAt,
  id,
  isDone,
  title,
  updatedAt,
}: TodoProps) => {

  const {states, dispatch} = useStore()

  const [done, setDone] = React.useState(isDone)
  

  const handlerLoadTodos = async() => {
    const response = await getTodos()
    wait(1000)
    dispatch(TodoSetTodos(response))
    return response
  }

  const handlePatchTodo = async () => {
    const res = await updateTodo(id, title, content, done)
    handlerLoadTodos()
    console.log(res)
    
    return res
  }

  useEffect(() => {
    handlePatchTodo()
  }, [done])


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
      <Accordion.Item value={String(id)}>
        <Accordion.Control>
          <div className='flex w-full justify-between -ml-2 items-center'>
            <CustomText
              text={isDone ? `✓ ${title}` : title}
              className={`font-semibold text-lg`}
            />
          </div>
        </Accordion.Control>
        <Accordion.Panel>
          <div className='flex flex-col w-full h-full overflow-hidden'>
            <div className='p-1 pb-2'>
              <CustomText
                text={content || ''}
              />
            </div>
            <div className='w-full h-full flex items-end justify-between pt-1'>
              <CustomText
                className='mr-1 text-xs italic text-gray-800'
                text={`Created at ${createdAt}`}
              />
              <div className='flex items-center justify-end p-px'>
                <CustomText
                  className='mr-1'
                  text='Done:'
                />
                <CustomActionButton 
                  className='h-8 w-8 '
                  onClick={() => {
                    setDone(!done)
                  }}
                >
                  {
                  isDone
                  ? 
                  '✓'
                  :
                  'X'
                  }
                </CustomActionButton>
              </div>
            </div>
          </div>
        </Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  )
}

export default TodoItem