import React from 'react'
import CustomActionButton from '../atoms/CustomActionButton'
import CustomText from '../atoms/CustomText'
import CustomBox from '../molecules/CustomBox'
import CustomInput from '../atoms/CustomInput'

interface LoginFormProps {
  onSubmit: (username: string, password: string) => void
  onOpenRegisterForm: () => void
}

const LoginForm = ({
  onSubmit,
  onOpenRegisterForm
}:LoginFormProps) => {
  return (
    <CustomBox
      className="absolute top-1/2 w-64 h-64 z-40 flex flex-col "
      tittle="Login"
      disableMaximize
      disableMinimize
      disableClose
    >
      <div className='flex flex-col  w-full h-full items-start justify-between'>
        <div className='flex flex-col w-10/12 '>
          <CustomInput label='Username'/>
          <CustomInput label='Password'/>
        </div>
        <div className='flex  w-full justify-end'>
          <CustomActionButton className='w-24' onClick={onOpenRegisterForm}>
            Register
          </CustomActionButton>
          <CustomActionButton href={'/explorer'} className='w-24 ml-1' onClick={() => {}}>
            Login
          </CustomActionButton>
        </div>
      </div>
    </CustomBox>
  )
}

export default LoginForm