'use client'
import React, { useEffect } from 'react'
import CustomBox from '../molecules/CustomBox'
import useStore from '@/hooks/useStore'
import { TasksSetIsTodoTaskMaximized, TasksSetIsTodoTaskMinimized, TasksSetIsTodoTaskOpen, TodoSetTodos } from '@/store/actions'
import TodoItem from '../molecules/TodoItem'
import NewTodoItem from '../molecules/NewTodoItem'
import { getTodos } from '@/api'


const TodoApp = () => {

  const {states,dispatch} = useStore()

  const handlerLoadTodos = async() => {
    const response = await getTodos()
    dispatch(TodoSetTodos(response))
    return response
  }

  useEffect(() => {
    if(states.Tasks.TodoTask.isOpen){
      handlerLoadTodos()
    }
  }, [states.Tasks.TodoTask.isOpen])

  return (
    <CustomBox 
      tittle='Todo List'
      icon={states.Tasks.TodoTask.icon}
      className={`
        absolute top-64 left-64 w-2/6 h-4/6 bg-gray-300
        mb-1
      `}
      closed={!states.Tasks.TodoTask.isOpen}
      minimized={states.Tasks.TodoTask.isMinimized}
      maximized={states.Tasks.TodoTask.isMaximized}
      onMouseEnter={() => {
        handlerLoadTodos()
      }}
      setMaximized={() => {
        if(!states.Tasks.TodoTask.isMaximized) {
          dispatch(TasksSetIsTodoTaskMaximized(true))
        } else {
          dispatch(TasksSetIsTodoTaskMaximized(false))
        }
      }}
      setClosed={() => {
        dispatch(TasksSetIsTodoTaskMaximized(false))
        dispatch(TasksSetIsTodoTaskOpen(false))
      }}
      setMinimized={() => {
        dispatch(TasksSetIsTodoTaskMinimized(true))
      }}
    >
      <div className='h-full w-full flex flex-col pr-1 pb-4 overflow-y-auto'>
        <NewTodoItem />
        {/* <TodoItem
          title='Title'
          content='Content'
          createdAt='2021-08-31'
          updatedAt='2021-08-31'
          isDone={false}
          id={1}
        /> */}
        {states.Todo.Todos.map((item, index) => {
          return (
            <TodoItem
              key={index}
              title={item.title}
              content={item.content}
              createdAt={item.createdAt}
              updatedAt={item.updatedAt}
              isDone={item.isDone}
              id={item.id}
            />
          )
        })}
      </div>
    </CustomBox>
  )
}

export default TodoApp