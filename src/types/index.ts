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

export type RightMenuItemProps = {
  text: string
  onClick: () => void
}
