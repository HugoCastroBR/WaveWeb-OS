import { RightMenuItemProps } from '@/types'
import React from 'react'
import CustomActionButton from '../atoms/CustomActionButton'
import CustomText from '../atoms/CustomText'

const RightMenuItem = ({
  text,
  onClick,
  disabled,
}: RightMenuItemProps) => {
  return (
    <div
      onClick={onClick}
      className={`
      px-1 py-px cursor-pointer hover:bg-gray-200
      bg-opacity-0 hover:bg-opacity-30 duration-100 transition-all
      ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
      `}
      
    >
      <CustomText
        className='
        font-sans font-semibold text-base text-gray-900
        '
        text={text}
      />
    </div>
  )
}

export default RightMenuItem