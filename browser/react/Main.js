import React, { Component } from 'react'
import Sidebar from './Sidebar'
import Player from './Player'
import Albums from './Albums'
import SingleAlbum from './SingleAlbum'
import axios from 'axios'

const logErr = console.error.bind(console)
const audio = document.createElement('audio');

const initialAlbum = {
  songs: []
}

export default class Main extends Component{
  constructor(props) {
    super(props)

    this.state = {
      albums: [],
      selectedAlbum: initialAlbum,
      currentSong: {},
      isPlaying: false,
      progress: 0
    }

    this.selectAlbum = this.selectAlbum.bind(this)
    this.resetSelectedAlbum = this.resetSelectedAlbum.bind(this)
    this.start = this.start.bind(this)
    this.pause = this.pause.bind(this)
    this.previous = this.previous.bind(this)
    this.next = this.next.bind(this)
  }

  componentDidMount() {
    axios.get('api/albums')
    .then(res => res.data)
    .then(backendAlbum => {

      backendAlbum = backendAlbum.map(album => {
        album.imageUrl = `/api/albums/${album.id}/image`
        return album
      })

      this.setState({
        albums: backendAlbum
      })
    })
    .catch(logErr)


    audio.addEventListener('ended', () => {
      this.next()
    })

    audio.addEventListener('timeupdate', () => {
      this.setState({
        progress: 100 * audio.currentTime / audio.duration
      })
    })
  }


  selectAlbum(album){
    axios.get(`api/albums/${album.id}`)
    .then(res => res.data)
    .then(backendAlbum => {
      this.setState({
        selectedAlbum: backendAlbum
      })
    })
    .catch(logErr)
  }

  resetSelectedAlbum(){
    this.setState({
      selectedAlbum: initialAlbum
    })
  }

  start(song) {
    audio.src = song.audioUrl;
    this.setState({
      currentSong: song,
      isPlaying: true
    })
    audio.load();
    audio.play();
  }

  pause() {
    this.setState({
      isPlaying: false
    })
    audio.pause();
  }

  previous(){
    let currentSongIndex = this.findCurrentSongIndex()
    let previousSong

    if(currentSongIndex === 0) {
      previousSong = this.state.selectedAlbum.songs[this.state.selectedAlbum.songs.length - 1]
    } else {
      previousSong = this.state.selectedAlbum.songs[currentSongIndex - 1]
    }

    this.start(previousSong)
  }

  next(){
    let currentSongIndex = this.findCurrentSongIndex()
    let nextSong


    if(currentSongIndex === this.state.selectedAlbum.songs.length - 1) {
      nextSong = this.state.selectedAlbum.songs[0]
    } else {
      nextSong = this.state.selectedAlbum.songs[currentSongIndex + 1]
    }

    this.start(nextSong)
  }

  findCurrentSongIndex(){
    let currentSongIndex;
    for(let i = 0; i < this.state.selectedAlbum.songs.length; i++) {
      if(this.state.currentSong.id === this.state.selectedAlbum.songs[i].id){
        currentSongIndex = i
      }
    }
    return currentSongIndex
  }


  render() {

    return (
      <div>
        <Sidebar handleClick={ this.resetSelectedAlbum } />
        <div className="col-xs-10">
          {
            this.state.selectedAlbum.hasOwnProperty("id")
            ? <SingleAlbum
                album={this.state.selectedAlbum}
                start={this.start}
                pause={this.pause}
                currentSong={this.state.currentSong}
                isPlaying={this.state.isPlaying}
             />
            : <Albums
                albums={this.state.albums}
                handleClick={this.selectAlbum}
              />
          }
        <Player
          start={this.start}
          pause={this.pause}
          previous={this.previous}
          next={this.next}
          currentSong={this.state.currentSong}
          isPlaying={this.state.isPlaying}
          selectedAlbum={this.state.selectedAlbum}
          progress={this.state.progress}
        />
        </div>
      </div>
    )
  }
}
