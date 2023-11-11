import React from 'react'
import CustomActionButton from '../atoms/CustomActionButton'
import Image from 'next/image'
import CustomText from '../atoms/CustomText'

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
      className='w-28 h-8 flex justify-between pr-1 ml-0.5 overflow-hidden items-center' 
      onClick={() => onClick && onClick(text)}
      
    >
      {/* <Image width="26" height="26" src="/assets/icons/task-bar-start.png" alt="vaporwave" /> */}
      {icon && <Image src={icon} alt={text} width="22" height="22" />}
      <CustomText
        className='
        text-sm font-medium
        '
        text={`${text.length > 8 ? text.slice(0, 8) + '...' : text}`}
      />
    </CustomActionButton>
  )
}

export default TaskBarItem