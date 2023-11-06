
import { SpotifySearchMusic } from "@/api/spotify";
import { createSlice } from "@reduxjs/toolkit";




type MusicsProps = {
	search: SpotifySearchMusic;
	total: number;
	limit: number;
	currentSong?: string;
	currentSongLength?: number;
	songTimer?: number;
	songIsPlaying?: boolean;
	songIsPaused?: boolean;
	songName: string;
	volume: number;
	artists: {name:string}[];
	currentSongImage: string;
	musicIndex: number;
	isLocal: boolean;
}

const initialState: MusicsProps = {
	search: {} as SpotifySearchMusic,
	musicIndex: 0,
	total: 0,
	limit: 0,
	currentSong: "",
	currentSongLength: 0,
	songName: "",
	songTimer: 0,
	songIsPlaying: false,
	songIsPaused: false,
	volume: 100,
	artists: [],
	currentSongImage: "",
	isLocal: false
}

export const MusicsSlice = createSlice({
	name: "MusicsSlice",
	initialState: initialState,
	reducers: {
		SET_SEARCH(state,{payload}:{payload:SpotifySearchMusic}){
			state.search = payload
		},
		SET_TOTAL(state,{payload}:{payload:number}){
			state.total = payload
		},
		SET_LIMIT(state,{payload}:{payload:number}){
			state.limit = payload
		},
		SET_CURRENT_SONG(state,{payload}:{payload:string}){
			state.currentSong = payload
		},
		SET_CURRENT_SONG_LENGTH(state,{payload}:{payload:number}){
			state.currentSongLength = payload
		},
		SET_SONG_TIMER(state,{payload}:{payload:number}){
			state.songTimer = payload
		},
		SET_SONG_IS_PLAYING(state,{payload}:{payload:boolean}){
			state.songIsPlaying = payload
		},
		SET_SONG_IS_PAUSED(state,{payload}:{payload:boolean}){
			state.songIsPaused = payload
		},
		SET_SONG_NAME(state,{payload}:{payload:string}){
			state.songName = payload
		},
		SET_VOLUME(state,{payload}:{payload:number}){
			state.volume = payload
		},
		SET_ARTISTS(state,{payload}:{payload:{name:string}[]}){
			state.artists = payload
		},
		SET_CURRENT_SONG_IMAGE(state,{payload}:{payload:string}){
			state.currentSongImage = payload
		},
		RESET_ALL(state){
			state.search = {} as SpotifySearchMusic
			state.total = 0
			state.limit = 0
			state.songIsPlaying = false
			state.songIsPaused = true
			state.volume = 100
			state.musicIndex = 0
		},
		SET_MUSIC_INDEX(state,{payload}:{payload:number}){
			state.musicIndex = payload
		},
		SET_IS_LOCAL(state,{payload}:{payload:boolean}){
			state.isLocal = payload
		}
	},
});