'use client'
import React, { useEffect } from 'react'
import CustomBox from '../molecules/CustomBox'
import useStore from '@/hooks/useStore'
import { TasksSetIsNotePadTaskMaximized, TasksSetIsNotePadTaskOpen, TasksSetIsNotePadTaskMinimized, AppHandlerNotification, SetNotification, AppSetConfirmed, FolderSetIsFolderOpen, NoteSetNotes, NoteSetIsEdit, NoteSetCurrentNote, AppSetAboutMenuOpen, AppSetFileMenuOpen } from '@/store/actions'
import AppTaskBar from '../molecules/AppTaskBar'
import CustomInput from '../atoms/CustomInput'
import CustomActionButton from '../atoms/CustomActionButton'
import { NoteProps, postNote, removeNote, updateNote } from '@/api'
import wait from '@/utils/wait'
import CustomTextArea from '../atoms/CustomTextArea'


const NotePadApp = () => {

  const { states, dispatch } = useStore()

  const [isSaveInputOpen, setIsSaveInputOpen] = React.useState(false)
  const [fileName, setFileName] = React.useState(states.Note.isEdit && states.Note.currentNote.title || '')
  const [fileContent, setFileContent] = React.useState(states.Note.isEdit && states.Note.currentNote.content || '')

  const handleSaveNote = async () => {
    if (states.Note.isEdit) {
      updateNote(states.Note.currentNote.id, fileName, fileContent)
    } else {
      const res = await postNote(fileName, fileContent)
      dispatch(NoteSetNotes([...states.Note.Notes, res]))
      dispatch(NoteSetIsEdit(true))
      dispatch(NoteSetCurrentNote({
        id: res.id,
        title: res.title,
        content: res.content,
        createdAt: res.createdAt,
        updatedAt: res.updatedAt
      }))
    }
    setIsSaveInputOpen(false)
    dispatch(AppSetAboutMenuOpen(false))
    dispatch(AppSetFileMenuOpen(false))
  }

  const handleDeleteNote = async () => {
    const res = await removeNote(states.Note.currentNote.id)
    dispatch(NoteSetNotes([...states.Note.Notes.filter(note => note.id !== res.id)]))
    dispatch(NoteSetIsEdit(false))
    dispatch(NoteSetCurrentNote({
      id: 0,
      title: '',
      content: '',
      createdAt: '',
      updatedAt: ''
    }))
    setIsSaveInputOpen(false)
    dispatch(TasksSetIsNotePadTaskOpen(false))
    dispatch(TasksSetIsNotePadTaskMinimized(false))
    dispatch(AppSetAboutMenuOpen(false))
    dispatch(AppSetFileMenuOpen(false))
  }

  useEffect(() => {
    if (states.App.confirmed === true) {
      setIsSaveInputOpen(false)
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
      saveOption
      removeOption={states.Note.isEdit}
      onRemove={() => {
        handleDeleteNote()
      }}
      closed={!states.Tasks.NotePadTask.isOpen}
      minimized={states.Tasks.NotePadTask.isMinimized}
      maximized={states.Tasks.NotePadTask.isMaximized}
      resize
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
      onSave={() => {
        setIsSaveInputOpen(true)
      }}
      
    >
      {
        isSaveInputOpen &&
        <>
          <CustomBox
            tittle='Save'
            disableMaximize
            disableMinimize
            className='absolute top-12 left-12 flex flex-col w-80 !z-50 bg-gray-300'
            setClosed={() => {
              setIsSaveInputOpen(false)
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