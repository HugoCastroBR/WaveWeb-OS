import React, { useEffect } from 'react'
import { text } from 'stream/consumers'
import CustomText from '../atoms/CustomText'
import Image from 'next/image'
import { getExtensionFromFileName } from '@/utils/files'
import useSystemTasks from '@/hooks/useSystemTasks'
import useStore from '@/hooks/useStore'

interface SystemAppProps {
  id: number
  name: string
  onClick?: (id:number,name:string,selected) => void
  onDoubleClick?: (id:number,name:string) => void
}
const SystemApp = ({
  id,
  name,
  onClick,
  onDoubleClick,
}:SystemAppProps) => {

  const {states} = useStore()

  const [selected, setSelected] = React.useState(false)
  

  const extension = getExtensionFromFileName(name)
  const renderIcon = () => {
    switch (extension) {
      case 'txt':
        return '/assets/icons/note-pad-task.png'
      default:
        return '/assets/icons/folder.png'
    }
  }

  const HandlerOnClick = () => {
    onClick(id,name,selected)
  }
  
  useEffect(() => {
    if(states.System.selectedItems.some(item => item.id === id && name === name)){
      setSelected(true)
    }else{
      setSelected(false)
    }
  },[states.System.selectedItems])

  return (
    <div 
      className={`
      flex flex-col w-20 h-20 justify-center items-center mt-2 cursor-pointer z-20
      ${selected ? 'bg-gray-200' : ''}
      `}
      onClick={() => {
        HandlerOnClick()
      }}
      onDoubleClick={() => {
        onDoubleClick(id,name)
      }}
    >
      <Image src={renderIcon()} width={52} height={52} alt={`${name}`} />
      <CustomText
        className='text-sm -mt-0 font-semibold text-gray-800'
        text={`${name}`}
      />
    </div>
  )
}

export default SystemApp