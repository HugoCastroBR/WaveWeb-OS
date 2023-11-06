import React from 'react'
import CustomActionButton from '../atoms/CustomActionButton'
import Image from 'next/image'

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
      className='w-32 h-8 flex justify-between pr-1 ml-0.5' 
      onClick={() => onClick && onClick(text)}
    >
      {/* <Image width="26" height="26" src="/assets/icons/task-bar-start.png" alt="vaporwave" /> */}
      {icon && <Image src={icon} alt={text} width="26" height="26" />}
      {text}
    </CustomActionButton>
  )
}

export default TaskBarItem