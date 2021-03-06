import React, { Component } from 'react'
import Sidebar from '../components/Sidebar'
import Player from '../components/Player'
import Albums from '../components/Albums'
import SingleAlbum from '../components/SingleAlbum'
import axios from 'axios'
import initialState from '../initialState'

const logErr = console.error.bind(console)
const audio = document.createElement('audio');

export default class Main extends Component{
  constructor(props) {
    super(props)

    this.state = initialState

    this.selectAlbum = this.selectAlbum.bind(this)
    this.resetSelectedAlbum = this.resetSelectedAlbum.bind(this)
    this.start = this.start.bind(this)
    this.pause = this.pause.bind(this)
    this.previous = this.previous.bind(this)
    this.next = this.next.bind(this)
    this.shuffle = this.shuffle.bind(this)
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
      selectedAlbum: initialState.selectedAlbum
    })
  }

  start(song) {
    audio.src = song.audioUrl;
    this.setState({
      currentSong: song,
      isPlaying: true,
      playedSongs: this.state.playedSongs.concat([song]) //concatenate already played songs so these don't replay when clicking shuffle button
    })
    audio.load();
    audio.play();

    this.resetPlayedSongsTracker()
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

  shuffle(){
    let currentSongIndex = this.findCurrentSongIndex()
    let totalSongs = this.state.selectedAlbum.songs.length
    let nextRandomSongIndex
    let nextSong;

    nextRandomSongIndex = Math.floor(Math.random(totalSongs) * totalSongs)
    nextSong = this.state.selectedAlbum.songs[nextRandomSongIndex]

    //recursively calls shuffle if nextSong chosen is the currentSong playing
    if(nextSong === this.state.currentSong) this.shuffle()

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

  resetPlayedSongsTracker(){
     //reset playedSongs
    if(this.state.selectedAlbum.songs.length === this.state.playedSongs.length) {
      this.setState({
        playedSongs: [this.state.currentSong]
      })
    }
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
          shuffle={this.shuffle}
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
