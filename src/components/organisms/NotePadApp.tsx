'use client'
import React, { useEffect, useState } from 'react'
import CustomBox from '../molecules/CustomBox'
import useStore from '@/hooks/useStore'
import { TasksSetIsNotePadTaskMaximized, TasksSetIsNotePadTaskOpen, TasksSetIsNotePadTaskMinimized, AppHandlerNotification, SetNotification, AppSetConfirmed, FolderSetIsFolderOpen, NoteSetNotes, NoteSetIsEdit, NoteSetCurrentNote, AppSetAboutMenuOpen, AppSetFileMenuOpen } from '@/store/actions'
import CustomInput from '../atoms/CustomInput'

import CustomTextArea from '../atoms/CustomTextArea'
import useStorage from '@/hooks/useStorage'
import { NoteProps } from '@/types'
import CustomActionButton from '../atoms/CustomActionButton'


const NotePadApp = () => {

  
  const { states, dispatch } = useStore()
  const {fs} = useStorage()


  const [isSaveAsInputOpen, setIsSaveAsInputOpen] = useState(false)
  const [fileName, setFileName] = useState(states.Note.isEdit && states.Note.currentNote.title || '')
  const [fileContent, setFileContent] = useState(states.Note.isEdit && states.Note.currentNote.content || '')

  const [isFileMenuOpen, setIsFileMenuOpen] = useState(false)
  const [isAboutMenuOpen, setIsAboutMenuOpen] = useState(false)

  const handleSaveNote = async () => {
    if (states.Note.isEdit) {
      await fs?.writeFile(`/My Notes/${fileName}`, fileContent, (err) => {
        if(err){
          console.log(err)
        }else{
          console.log('File Saved')
        }
      })
      await setIsSaveAsInputOpen(false)
      await dispatch(AppSetAboutMenuOpen(false))
      await dispatch(AppSetFileMenuOpen(false))
      await dispatch(AppSetFileMenuOpen(true))
      await dispatch(AppSetFileMenuOpen(false))
      setIsAboutMenuOpen(false)
      setIsFileMenuOpen(false)
    } else {
      await fs?.writeFile(`/My Notes/${fileName}.txt`, fileContent, (err) => {
        if(err){
          console.log(err)
        }else{
          console.log('File Saved')
        }
      })
      await setIsSaveAsInputOpen(false)
      await dispatch(AppSetAboutMenuOpen(false))
      await dispatch(AppSetFileMenuOpen(false))
      setIsAboutMenuOpen(false)
      setIsFileMenuOpen(false)
    }
  }


  const handleDeleteNote = async () => {
    // const res = await removeNote(states.Note.currentNote.id)
    // dispatch(NoteSetNotes([...states.Note.Notes.filter(note => note.id !== res.id)]))
    await fs?.unlink(`/My Notes/${fileName}`, (err) => {
      if(err){
        console.log(err)
      }else{
        console.log('File Deleted')
      }
    })
    dispatch(NoteSetIsEdit(false))
    dispatch(NoteSetCurrentNote({
      id: 0,
      title: '',
      content: '',
      createdAt: '',
      updatedAt: ''
    }))
    setIsSaveAsInputOpen(false)
    dispatch(TasksSetIsNotePadTaskOpen(false))
    dispatch(TasksSetIsNotePadTaskMinimized(false))
    dispatch(AppSetAboutMenuOpen(false))
    dispatch(AppSetFileMenuOpen(false))
  }

  useEffect(() => {
    if (states.App.confirmed === true) {
      setIsSaveAsInputOpen(false)
      setFileName('')
      setFileContent('')
      dispatch(NoteSetIsEdit(false))
      dispatch(NoteSetCurrentNote({} as NoteProps))
      dispatch(TasksSetIsNotePadTaskMaximized(false))
      dispatch(TasksSetIsNotePadTaskOpen(false))
      dispatch(AppSetAboutMenuOpen(false))
      dispatch(AppSetFileMenuOpen(false))
      dispatch(SetNotification(false))
      dispatch(AppSetConfirmed(false))
    }
  }, [states.App.confirmed])

  useEffect(() => {
    setIsFileMenuOpen(false)
    setIsAboutMenuOpen(false)
    setFileName(states.Note.currentNote.title)
  }, [states.Note.currentNote.title])

  return (
    <CustomBox
      tittle={fileName|| 'New Note'}
      className={`
        absolute top-64 left-64 w-3/12 h-3/6 bg-gray-300
        mb-1 flex flex-col z-30
      `}
      icon={states.Tasks.NotePadTask.icon}
      withTaskBar
      saveOption={states.Note.isEdit}
      saveAsOption
      removeOption={states.Note.isEdit}
      onRemove={() => {
        handleDeleteNote()
      }}
      closed={!states.Tasks.NotePadTask.isOpen}
      minimized={states.Tasks.NotePadTask.isMinimized}
      maximized={states.Tasks.NotePadTask.isMaximized}
      resize
      fileMenuIsOpen={isFileMenuOpen}
      closeFileMenu={(is: boolean) => {
        setIsFileMenuOpen(is)
      }}
      aboutMenuIsOpen={isAboutMenuOpen}
      closeAboutMenu={(is: boolean) => {
        setIsAboutMenuOpen(is)
      }}
      setMaximized={() => {
        if (!states.Tasks.NotePadTask.isMaximized) {
          dispatch(TasksSetIsNotePadTaskMaximized(true))
        } else {
          dispatch(TasksSetIsNotePadTaskMaximized(false))
        }
      }}
      setClosed={() => {
        dispatch(AppHandlerNotification('NotePad', 'Are you sure you want to close NotePad?'))
      }}
      setMinimized={() => {
        dispatch(TasksSetIsNotePadTaskMinimized(true))
      }}
      onSaveAs={() => {
        setIsSaveAsInputOpen(true)
      }}
      onSave={() => {
        handleSaveNote()
      }}
      
    >
      {
        isSaveAsInputOpen &&
        <>
          <CustomBox
            tittle='Save'
            disableMaximize
            disableMinimize
            className='absolute top-12 left-12 flex flex-col w-80 !z-50 bg-gray-300'
            setClosed={() => {
              setIsSaveAsInputOpen(false)
            }}
          >
            <CustomInput
              className='w-full h-8 mb-2'
              label='File name:'
              value={states.Note.currentNote.title}
              onChange={(e) => {
                setFileName(String(e))
              }}
            />
            <div className='flex w-full justify-end items-end'>
              <CustomActionButton
                className='p-px px-1'
                onClick={handleSaveNote}
              >
                Save
              </CustomActionButton>
            </div>
          </CustomBox>
        </>
      }
      <CustomTextArea
        value={states.Note.currentNote.content}
        onChange={(e) => {
          setFileContent(String(e))
        }}
      />
    </CustomBox>
  )
}

export default NotePadApp