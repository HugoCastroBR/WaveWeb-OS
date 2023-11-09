import { RightMenuItemProps } from '@/types'
import React from 'react'
import CustomActionButton from '../atoms/CustomActionButton'
import CustomText from '../atoms/CustomText'

const RightMenuItem = ({
  text,
  onClick,
}: RightMenuItemProps) => {
  return (
    <CustomActionButton
      onClick={onClick}
      className='px-1 py-px'
    >
      <CustomText
        text={text}
      />
    </CustomActionButton>
  )
}

export default RightMenuItem