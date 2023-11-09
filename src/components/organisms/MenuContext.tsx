'use client'

import useSystem from "@/hooks/useSystem";
import RightMenuItem from "../molecules/RightMenuItem";


interface MenuContextProps {
  x: number
  y: number
}
const MenuContext = ({x,y}:MenuContextProps) => {

  const {
    CreateFolder,
    DeleteSelects,
  } = useSystem()
  
  return (
    <div
      className={`
      bg-gray-300 
        drop-shadow-sm shadow-sm shadow-gray-800 
        flex flex-col w-32
    `}
      style={{
        position: 'absolute',
        top: y,
        left: x,
        zIndex: 100,
      }}>
      <RightMenuItem
        text='New Folder'
        onClick={() => {
          CreateFolder('New Folder2')
        }}
      />
      <RightMenuItem
        text='Delete'
        onClick={() => {
          DeleteSelects()
        }}
      />
    </div>
  );
};

export default MenuContext;