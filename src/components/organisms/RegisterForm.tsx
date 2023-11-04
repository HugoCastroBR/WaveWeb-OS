import React from 'react'
import CustomActionButton from '../atoms/CustomActionButton'
import CustomInput from '../atoms/CustomInput'
import CustomBox from '../molecules/CustomBox'

interface RegisterFormProps {
  onSubmit?: (username: string, password: string) => void
  onClosed?: () => void
  closed?: boolean
}
const RegisterForm = ({
  onSubmit,
  onClosed,
  closed
}:RegisterFormProps) => {
  return (
    <CustomBox
      className="absolute top-1/2 w-64 h-80 z-50 flex flex-col "
      tittle="Register"
      disableMaximize
      disableMinimize
      setClosed={onClosed}
      closed={closed}
    >
      <div className='flex flex-col  w-full h-full items-start justify-between'>
        <div className='flex flex-col w-10/12 '>
          <CustomInput label='Username'/>
          <CustomInput label='Email'/>
          <CustomInput label='Password'/>
          <CustomInput label='Confirm Password'/>
        </div>
        <div className='flex  w-full justify-end'>
          <CustomActionButton className='w-24'>
            Register
          </CustomActionButton>
        </div>
      </div>
    </CustomBox>
  )
}

export default RegisterForm