export type NoteProps = {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export type MusicProps = {
  id: number;
  title: string;
  artist: string;
  musicUrl: string;
  coverUrl: string;
  createdAt: string;
  updatedAt: string;
}

export interface MultiTaskType {
  isOpen: boolean,
  id: number,
}

export type RightMenuItemProps = {
  text: string
  onClick: () => void
}

export type WindowProcessProps = {
  id: number,
  uniqueId: string,
  title?: string,
  path?: string,
  
}