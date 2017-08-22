const initialAlbum = {
  songs: []
}

const initialState = {
  albums: [],
  selectedAlbum: initialAlbum,
  currentSong: {},
  isPlaying: false,
  progress: 0,
  playedSongs: []
}

export default initialState
