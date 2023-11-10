'use client'
import React, { useEffect, useState } from 'react'
import CustomBox from '../molecules/CustomBox'
import useStore from '@/hooks/useStore'
import { FolderSetIsFolderMaximized, FolderSetIsFolderOpen, FolderSetIsFolderMinimized, NoteSetCurrentNote, NoteSetIsEdit, TasksSetIsNotePadTaskOpen, TasksSetIsNotePadTaskMinimized, AppSetFocusedItem, AppSetFileMenuOpen } from '@/store/actions'
import DesktopIcon from '../molecules/DesktopIcon'
import useStorage from '@/hooks/useStorage'
import { formatDateToString } from '@/utils/date'




const NoteFolder = () => {

  const {states, dispatch} = useStore()
  const [notes, setNotes] = useState<string[] | undefined>([])
  const [key, setKey] = useState('')
  const [isFileMenuOpen, setIsFileMenuOpen] = useState(false)
  const [isAboutMenuOpen, setIsAboutMenuOpen] = useState(false)

  const {fs} = useStorage()
  


  const HandlerLoadFiles =  () => {
    fs?.readdir('/My Notes', (err, files) => {
      if(err){
        fs?.mkdir('/My Notes', (err) => {
          if(err){
            console.log(err)
          }else{
            console.log('Folder Created')
          }
        })
      }else{
        setNotes(files)
      }
    })
  }

  


  useEffect(() => {
    if(states.Folders.find(folder => folder.title === 'My Notes')?.isOpen) {
      HandlerLoadFiles()
    }

  }, [states.Folders.find(folder => folder.title === 'My Notes')?.isOpen])

  useEffect(() => {
    if(states.Folders.find(folder => folder.title === 'My Notes')?.isOpen) {
      setKey(Math.random().toString())
      HandlerLoadFiles()
    }
  }, [isFileMenuOpen,])



  const handlerLoadNote = async (note:string) => {
    await fs?.readFile(`/My Notes/${note}`, (err, data) => {
      const content = new TextDecoder('utf-8').decode(data)
      let createdAt = ''
      let updatedAt = ''

      fs.stat(`/My Notes/${note}`, (err, stats) => {
        createdAt = formatDateToString(stats?.atime)
        updatedAt = formatDateToString(stats?.mtime)
      })
      if(err){
        console.log(err)
      }else{
        dispatch(NoteSetCurrentNote({
          id: 0,
          title: note,
          content,
          createdAt,
          updatedAt,
        }))
        dispatch(AppSetFocusedItem(note))
        dispatch(NoteSetIsEdit(true))
        dispatch(TasksSetIsNotePadTaskOpen(true))
        dispatch(TasksSetIsNotePadTaskMinimized(false))
      }
    })
  }



  const RenderNotes = ({notes}:{notes:string[] | undefined}) => {
    return (notes?.map((note,index) => {
      return (
        <DesktopIcon
          key={index}
          imgSrc='/assets/icons/note-pad-task.png'
          text={String(note)}
          onClick={() => {
            handlerLoadNote(note)
          }}
        />
      )
    }))
  }
  

  return (
    <CustomBox
      tittle='My Notes'
      onClick={() => {
        HandlerLoadFiles()
      }}
      onMouseEnter={() => {
        HandlerLoadFiles()
      }}
      icon='/assets/icons/note-folder.png'
      customFocus={states.Note.currentNote.title}
      className={`
      absolute top-64 left-64 w-1/4 h-3/6 bg-gray-300
      mb-1 flex flex-col overflow-x-hidden overflow-y-auto
      `}
      closed={!states.Folders.find(folder => folder.title === 'My Notes')?.isOpen}
      minimized={states.Folders.find(folder => folder.title === 'My Notes')?.isMinimized}
      maximized={states.Folders.find(folder => folder.title === 'My Notes')?.isMaximized}
      setMaximized={() => {
        if(!states.Folders.find(folder => folder.title === 'My Notes')?.isMaximized) {
          dispatch(FolderSetIsFolderMaximized('My Notes',true))
        } else {
          dispatch(FolderSetIsFolderMaximized('My Notes',false))
        }
      }}
      setClosed={() => {
        dispatch(FolderSetIsFolderOpen('My Notes',false))
        dispatch(FolderSetIsFolderMinimized('My Notes',false))
      }}
      setMinimized={() => {
        dispatch(FolderSetIsFolderMinimized('My Notes',true))
      }}
      withTaskBar
      refreshOption
      newOption
      fileMenuIsOpen={isFileMenuOpen}
      closeFileMenu={(is:boolean) => {
        setIsFileMenuOpen(is)
      }}
      aboutMenuIsOpen={isAboutMenuOpen}
      closeAboutMenu={(is:boolean) => {
        setIsAboutMenuOpen(is)
      }}
      onRefresh={() => {
        HandlerLoadFiles()
      }}
      onNew={() => {
        dispatch(NoteSetIsEdit(false))
        dispatch(NoteSetCurrentNote({
          id: 0,
          title: '',
          content: '',
          createdAt: '',
          updatedAt: '',
        }))
        dispatch(TasksSetIsNotePadTaskOpen(true))
        dispatch(TasksSetIsNotePadTaskMinimized(false))
        setIsFileMenuOpen(false)
      }}

    >
      <div className='h-min  flex flex-wrap justify-start items-start'>
        <RenderNotes notes={notes} key={key}/>
      </div>
    </CustomBox>
  )
}

export default NoteFolder