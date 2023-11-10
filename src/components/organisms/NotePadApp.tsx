'use client'
import React, { useEffect, useState } from 'react'
import CustomBox from '../molecules/CustomBox'
import useStore from '@/hooks/useStore'
import { TasksSetIsNotePadTaskMaximized, TasksSetIsNotePadTaskOpen, TasksSetIsNotePadTaskMinimized, AppHandlerNotification, SetNotification, AppSetConfirmed, FolderSetIsFolderOpen, NoteSetNotes, NoteSetIsEdit, NoteSetCurrentNote, AppSetAboutMenuOpen, AppSetFileMenuOpen } from '@/store/actions'
import CustomInput from '../atoms/CustomInput'

import CustomTextArea from '../atoms/CustomTextArea'
import useStorage from '@/hooks/useStorage'
import { NoteProps, WindowProcessProps } from '@/types'
import CustomActionButton from '../atoms/CustomActionButton'
import Window from '../molecules/Window'
import { processInstance } from '@/store/reducers/process'
import AppTaskBar from '../molecules/AppTaskBar'
import usePath from '@/hooks/usePath'


type notePadProcess = WindowProcessProps & {
  onChange?: (value:string) => void
}

const NotePadApp = ({
  id,
  title,
  uniqueId,
  onChange,
  path,
}:notePadProcess) => {

  
  const { states, dispatch } = useStore()
  const { fs } = useStorage()
  


  const [fileContent, setFileContent] = useState('')
  const [isFileMenuOpen, setIsFileMenuOpen] = useState(false)




  const saveFile = async () => {
    console.log("saveFile",fs)
    await fs?.writeFile(`${path}`, fileContent, (err) => {
      if(err){
        console.log(err)
      }else{
        console.log('File Saved')
      }
    })
  }

  useEffect(() => {
    // if(states.Process.instances[id].content){
    //   setFileContent(states.Process.instances[id].content)
    // }
    console.log("states.Process.instances[id].content",states.Process.instances[id].content)
  },[states.Process.instances[id].content])

  useEffect(() => {},)



  return (
    <>
      <AppTaskBar
        saveOption
        fileMenuIsOpen={isFileMenuOpen}
        closeFileMenu={setIsFileMenuOpen}
        onSave={() => {
          saveFile()
        }}
      />
      <CustomTextArea
        className='mt-1'
        value={fileContent}
        onChange={(e) => {
          onChange && onChange(e)
          setFileContent(String(e))
        }}
      />
    </>
  )
}

export default NotePadApp