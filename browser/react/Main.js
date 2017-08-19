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
      selectedAlbum: initialAlbum
    }

    this.selectAlbum = this.selectAlbum.bind(this)
    this.resetSelectedAlbum = this.resetSelectedAlbum.bind(this)
    this.start = this.start.bind(this)
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

  start(audioUrl) {
    console.log("should start song!")
    // audio.src = 'https://learndotresources.s3.amazonaws.com/workshop/5616dbe5a561920300b10cd7/Dexter_Britain_-_03_-_The_Stars_Are_Out_Interlude.mp3';
    audio.src = audioUrl;
    audio.load();
    audio.play();
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
             />
            : <Albums
                albums={this.state.albums}
                handleClick={this.selectAlbum}
              />
          }
        <Footer />
        </div>
      </div>
    )
  }
}
