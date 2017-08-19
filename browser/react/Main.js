import React, { Component } from 'react'
import Sidebar from './Sidebar'
import Footer from './Footer'
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
      isPlaying: false
    }

    this.selectAlbum = this.selectAlbum.bind(this)
    this.resetSelectedAlbum = this.resetSelectedAlbum.bind(this)
    this.start = this.start.bind(this)
    this.pause = this.pause.bind(this)
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

  start(audioUrl, song) {
    audio.src = audioUrl;
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
        <Footer
          currentSong={this.state.currentSong}
          isPlaying={this.state.isPlaying}
        />
        </div>
      </div>
    )
  }
}
