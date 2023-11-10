import React, { useEffect } from 'react'
import useStore from './useStore'
import useStorage from './useStorage'
import { ProcessSetContentProcessInstance, SystemClearSelectedItems } from '@/store/actions'
import { verifyIfIsFile } from '@/utils/files'
import { processInstance } from '@/store/reducers/process'


const usePath = () => {
  const { states, dispatch } = useStore()
  const { fs } = useStorage()

  const [mainPath, setMainPath] = React.useState<string[]>([])
  const [mainPathLoaded, setMainPathLoaded] = React.useState<boolean>(false)
  const [currentPath, setCurrentPath] = React.useState<string>('')
  const [contentOfCurrentPath, setContentOfCurrentPath] = React.useState<string[]>([])

  useEffect(() => {
    LoadMainPath()
  }, [])



  const LoadMainPath = async () => {
    dispatch(SystemClearSelectedItems())

    fs?.readdir('/', (err, files) => {
      if (err) {
        throw err;
      }
      if (!mainPathLoaded) {
        setContentOfCurrentPath(files)
        setCurrentPath('/')
      }

      setMainPathLoaded(true)
    })

  }

  const LoadCurrentPath = async () => {
    dispatch(SystemClearSelectedItems())

    fs?.readdir(`/${currentPath}`, (err, files) => {
      if (err) {
        throw err;
      }
      setContentOfCurrentPath(files)
    })
  }

  const CreateFolder = async (folderName: string) => {
    dispatch(SystemClearSelectedItems())
    if (currentPath === '/') {
      fs?.mkdir(`${folderName}`, (err) => {
        if (err) {
          throw err;
        }

        LoadCurrentPath()
      })
      return;
    }
    fs?.mkdir(`${currentPath}/${folderName}`, (err) => {
      if (err) {
        throw err;
      }
      LoadCurrentPath()
    })
  }

  const CreateTxtFile = async (fileName: string) => {
    dispatch(SystemClearSelectedItems())
    if (currentPath === '/') {
      fs?.writeFile(`${fileName}.txt`, '', (err) => {
        if (err) {
          throw err;
        }
        LoadCurrentPath()
      })
      return;
    }
    fs?.writeFile(`${currentPath}/${fileName}.txt`, '', (err) => {
      if (err) {
        throw err;
      }
      LoadCurrentPath()
    })
  }

  const NavigateTo = async (path: string) => {
    dispatch(SystemClearSelectedItems())
    fs?.readdir(`/${path}`, (err, files) => {
      if (err) {
        throw err;
      }
      setContentOfCurrentPath(files)
      setCurrentPath(path)
    })
    LoadCurrentPath()
  }

  const goBack = async () => {
    dispatch(SystemClearSelectedItems())
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
      setContentOfCurrentPath(files);
      setCurrentPath(parentPath);
    });
  };



  const DeleteSelects = async () => {
    states.System.selectedItems.forEach((item) => {
      if (verifyIfIsFile(item.path)) {
        fs?.unlink(`${item.path}`, (err) => {
          if (err) {
            throw err;
          }
          LoadCurrentPath()
        })
      } else {
        fs?.rmdir(`${item.path}`, (err) => {
          if (err) {
            throw err;
          }
          LoadCurrentPath()
        })
      }
    })
  }

  interface ReadFileProps {
    data: string
  }
  const ReadFile =  async (path: string,temp:processInstance):Promise<any>=> {
    // TODO : achar item no process e setar o content

    let res = ''
    await fs?.readFile(path, 'utf8', async (err, data) => {
      if (err) {
        throw err;
      }else{
        const result = await data
        console.log(temp.id+2)
        await dispatch(ProcessSetContentProcessInstance({
          id:temp.id + 2,
          ...temp,
          content: result
        }))
      }
    })

    return res
  }

  const SaveFile = (path: string, data: string) => {
    fs?.writeFile(path, data, (err) => {
      if (err) {
        console.log(err)
        throw err;
      }else{
        console.log('The file has been saved!')
        console.log(data)
      }
    })
  }

  return {
    fs,
    CreateTxtFile,
    SaveFile,
    ReadFile,
    DeleteSelects,
    goBack,
    currentPath,
    contentOfCurrentPath,
    mainPath,
    CreateFolder,
    LoadMainPath,
    NavigateTo
  }

}

export default usePath