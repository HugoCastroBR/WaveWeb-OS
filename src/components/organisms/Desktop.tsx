'use client'
import React, { use, useEffect, useState } from 'react'
import DesktopIcon from '../molecules/DesktopIcon'
import useStore from '@/hooks/useStore'
import { FolderSetIsFolderMinimized, FolderSetIsFolderOpen, PathClearSelectedItems, PathSetPath, ProcessAddProcessItem, ProcessSetProcessItemIsFocused, SystemExplorerSetIsOpen, TasksSetIsMusicTaskMinimized, TasksSetIsMusicTaskOpen, TasksSetIsNotePadTaskOpen, TasksSetIsTodoTaskMinimized, TasksSetIsTodoTaskOpen } from '@/store/actions'
import MusicApp from './MusicApp'
import TodoApp from './TodoApp'
import NotePadApp from './NotePadApp'
import NoteFolder from './NoteFolder'
import CustomAlert from './CustomAlert'
import useStorage from '@/hooks/useStorage'
import CustomActionButton from '../atoms/CustomActionButton'
import { getExtension, uuid, verifyIfIsFile } from '@/utils/files'
import CustomBox from '../molecules/CustomBox'
import RightMenuItem from '../molecules/RightMenuItem'
import NoContent from '../molecules/NoContent'
import WindowComponent from '../molecules/WindowComponent'
import Note from '../molecules/Note'
import { processItemProps } from '@/store/reducers/process'
import wait from '@/utils/wait'


interface DesktopItemProps {
  onClick?: () => void
  imgSrc: string
  text: string
}


const Desktop = () => {


  const { fs } = useStorage()

  // Window Items
  const DesktopOpenItems = () => {
    return (
      <>
        <CustomAlert />
        {/* <NoteFolder /> */}
        <NotePadApp />
        <TodoApp />
        <MusicApp />
      </>
    )
  }


  // Desktop Icons
  const DesktopItemProps: DesktopItemProps[] = [
    {
      imgSrc: '/assets/icons/music-task.png',
      text: 'Music',
      onClick() {
        dispatch(TasksSetIsMusicTaskOpen(true))
        dispatch(TasksSetIsMusicTaskMinimized(false))
      },
    },
    {
      imgSrc: '/assets/icons/todo-task.png',
      text: 'Todo List',
      onClick() {
        dispatch(TasksSetIsTodoTaskOpen(true))
        dispatch(TasksSetIsTodoTaskMinimized(false))
      }
    },
    // {
    //   imgSrc: '/assets/icons/note-pad-task.png',
    //   text: 'Notepad',
    //   onClick() {
    //     dispatch(TasksSetIsNotePadTaskOpen(true))
    //     dispatch(TasksSetIsTodoTaskMinimized(false))
    //   }
    // },
    // {
    //   imgSrc: '/assets/icons/note-folder.png',
    //   text: 'My Notes',
    //   onClick() {
    //     dispatch(FolderSetIsFolderOpen('My Notes', true))
    //     dispatch(FolderSetIsFolderMinimized('My Notes', false))
    //   }
    // },
  ]


  const [isRightMenuOpen, setIsRightMenuOpen] = useState(false)
  const [x, setX] = useState(0)
  const [y, setY] = useState(0)


  const reloadPath = async () => {
    await wait(100)
    console.log('reload')

    await fs?.readdir(currentPath, (err, files) => {
      if (err) console.log(err)
      else {
        dispatch(PathSetPath([{
          path: currentPath,
          files: files.map((file) => {
            return {
              path: file,
              isFile: verifyIfIsFile(file),
            }
          })
        }]))
      }
    })
  };



  const MenuContext = () => {
    return (
      <div
        className={`
        bg-gray-300 
          drop-shadow-sm shadow-sm shadow-gray-800 
          flex flex-col w-32 z-40
      `}
        style={{
          position: 'absolute',
          top: y,
          left: x,
          zIndex: 100,
        }}>
        <RightMenuItem
          text='New Text File'
          onClick={() => {
            fs?.writeFile(`${currentPath}/New Text File.txt`, '', (err) => {
              if (err) console.log(err)
              else {
                console.log('File created')
              }
            })
            reloadPath()
            dispatch(PathClearSelectedItems())
          }}
        />
        <RightMenuItem
          text='New Folder'
          onClick={() => {
            fs?.mkdir(`${currentPath}/Desktop`, (err) => {
              if (err) console.log(err)
              else {
                console.log('Folder created')
              }
            })
            reloadPath()
            dispatch(PathClearSelectedItems())
          }
          }
        />
        <RightMenuItem
          text='Delete'
          onClick={() => {

            states.Path.selectedItems.forEach((item) => {
              const itemToDelete = `${currentPath}/${item}`.replaceAll('//', '/')

              if (verifyIfIsFile(itemToDelete)) {
                fs?.unlink(itemToDelete, (err) => {
                  if (err) console.log(err)
                  else {
                    console.log('Deleted: ' + itemToDelete)
                  }
                })
              } else {
                fs?.rmdir(itemToDelete, (err) => {
                  if (err) console.log(err)
                  else {
                    console.log('Deleted: ' + itemToDelete)
                  }
                })
              }
            })
            reloadPath()
            dispatch(PathClearSelectedItems())
            // DeleteSelects()
          }}
        />
      </div>
    );
  };


  const { states, dispatch } = useStore()


  const [currentPath, setCurrentPath] = useState('/')

  const readPath = async (path: string) => {
    fs?.readdir(path, (err, files) => {
      if (err) console.log(err)
      else {
        dispatch(PathSetPath([{
          path,
          files: files.map((file) => {
            return {
              path: file,
              isFile: verifyIfIsFile(file),
            }
          })
        }]))
      }
    })
  };


  const goBack = async () => {
    dispatch(PathClearSelectedItems())
    if (currentPath === '/') {
      // Você já está na raiz, não pode voltar mais.
      return;
    }

    const pathSegments = currentPath.split('/').filter(Boolean);
    const parentPath = `/${pathSegments.slice(0, -1).join('/')}`;

    fs?.readdir(parentPath, (err, files) => {
      if (err) {
        throw err;
      }
      dispatch(PathSetPath([{
        path: parentPath,
        files: files.map((file) => {
          return {
            path: file,
            isFile: verifyIfIsFile(file),
          }
        })
      }]))
      setCurrentPath(parentPath);
    });
  };

  useEffect(() => {
    dispatch(PathClearSelectedItems())
    readPath(currentPath)
  }, [currentPath])

  useEffect(() => {
    readPath(currentPath)
    // console.log("load fs")
  }, [fs])

  const handlerFileType = (item: processItemProps) => {
    switch (item.extension) {
      case 'txt':
        return <Note {...item} icon='/assets/icons/note-pad-task.png' />
      default:
        return <>text</>
    }
  }

  const [IsExplorerOpen, setIsExplorerOpen] = useState(true)

  type FileItem = {
    path: string;
    isFile: boolean;
  };

  const [DesktopFiles, setDesktopFiles] = useState<FileItem[]>([])

  // const loadDesktopFolder = async () => {
  //   let resFiles:FileItem[] = []
  //   await fs?.readdir('/Desktop', (err, files) => {
  //     console.log(files)
  //     console.log(1)
  //     if (err) console.log(err)
  //     else {
  //       files.forEach((file) => {
  //         resFiles.push({
  //           path: file,
  //           isFile: verifyIfIsFile(file),
  //         })
  //       })
  //     }
  //   })
  //   console.log(resFiles)
  // }

  // useEffect(
  //   () => {
  //     loadDesktopFolder()
  //   }
  // ,[fs])

  return (
    <div
      onContextMenu={(e) => {
        e.preventDefault()
        setX(e.pageX)
        setY(e.pageY)
        setIsRightMenuOpen(true)
      }}
      onClick={() => {

        setIsRightMenuOpen(false)
      }}
      className='
      w-full h-full flex flex-col
    '
    >
      {
        isRightMenuOpen &&
        <MenuContext />
      }
      {DesktopOpenItems()}


      {
        states.Process.items.length > 0 &&
        states.Process.items.map((item) => {
          if (item.isOpen) {
            return (
              handlerFileType(item)
            )
          }
        })
      }


  


      <DesktopIcon
        file={'Explorer'}
        pathname={`/`.replaceAll('//', '/')}
        onDoubleClick={() => {
          dispatch(SystemExplorerSetIsOpen(true))
        }}
      />

      {DesktopItemProps.map((item, index) => {
        return (
          <DesktopIcon
            img={item.imgSrc}
            deprecated
            key={index}
            file={item.text}
            pathname={`/`.replaceAll('//', '/')}
            onDoubleClick={() => {
              item.onClick()
            }}
          />
        )
          })
      }


      {/* {loadDesktopFolder()}  */}



      {states.Path.paths.map((path, index) => {
        return (
          <>
            <WindowComponent
              uuid={'explorer'}
              tittle='Explorer'
              key={index}
              className='bg-gray-100 w-5/6 h-4/6'
              closed={!states.System.explorer.isOpen}
              setClosed={() => {
                dispatch(SystemExplorerSetIsOpen(!states.System.explorer.isOpen))
              }}
            >
              <div className='
              flex w-full mb-2 h-10 bg-gray-300 items-center 
              border-b-2 border-b-gray-800 border-l-2 border-l-gray-100
              border-r-2 border-r-gray-800 border-t-2 border-t-gray-100
              overflow-hidden
              '>
                <CustomActionButton
                  onClick={() => {
                    readPath(currentPath)
                  }}
                  className='
                    w-20 h-12 -ml-1 bg-gray-300
                  '
                >
                  Load
                </CustomActionButton>
                <CustomActionButton
                  onClick={() => {
                    goBack()
                  }}
                  className='
                    w-20 h-12 bg-gray-300
                  '
                >
                  Go Back
                </CustomActionButton>
                <span className='p-1 '>{currentPath}</span>
              </div>
              {path.files.map((file, index) => {
                return (
                  <DesktopIcon
                    key={index}
                    file={file.path}
                    pathname={`${currentPath}/${file.path}`.replaceAll('//', '/')}
                    onDoubleClick={(filename) => {
                      // console.log(`path: ${currentPath}/${filename}`.replaceAll('//','/'))
                      const itemUuid = uuid(6)
                      if (verifyIfIsFile(file.path)) {
                        dispatch(ProcessAddProcessItem({
                          uuid: itemUuid,
                          name: filename,
                          title: filename,
                          path: `${currentPath}/${filename}`.replaceAll('//', '/'),
                          extension: getExtension(filename),
                          isOpen: true,
                          isMinimized: false,
                        }))
                        dispatch(ProcessSetProcessItemIsFocused({
                          uuid: itemUuid,
                          isFocused: true
                        }))
                      } else {
                        setCurrentPath(`${currentPath}/${filename}`.replaceAll('//', '/'))
                      }
                    }}
                  />
                )
              })}
            </WindowComponent>
          </>
        )
      })}

    </div>
  )
}

export default Desktop