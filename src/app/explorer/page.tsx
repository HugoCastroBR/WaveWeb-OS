import Desktop from '@/components/organisms/Desktop'
import TaskBar from '@/components/organisms/TaskBar'
import React from 'react'

const Page = () => {
  return (
    <section className='w-screen h-screen overflow-hidden flex flex-col justify-end'>
      <Desktop  />
      <TaskBar />
    </section>
  )
}

export default Page