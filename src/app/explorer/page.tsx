import Desktop from '@/components/organisms/Desktop'
import SystemManager from '@/components/organisms/SystemManager'
import TaskBar from '@/components/organisms/TaskBar'
import React from 'react'

const Page = () => {
  return (
    <section className='w-screen h-screen overflow-hidden flex flex-col justify-end'>
      {/* <Desktop  /> */}
      <SystemManager />
      <TaskBar />
    </section>
  )
}

export default Page