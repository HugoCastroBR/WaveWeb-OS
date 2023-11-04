import React from 'react'
import CustomActionButton from '../atoms/CustomActionButton'

interface TaskBarItemProps {
  icon?: string
  text: string
  onClick?: (text:string) => void
}
const TaskBarItem = ({
  icon,
  text,
  onClick
}:TaskBarItemProps) => {
  return (
    <CustomActionButton 
      className='w-24 h-8 flex justify-between pr-1 ml-0.5' 
      onClick={() => onClick && onClick(text)}
    >
      {/* <Image width="26" height="26" src="/assets/icons/task-bar-start.png" alt="vaporwave" /> */}
      {text}
    </CustomActionButton>
  )
}

export default TaskBarItem