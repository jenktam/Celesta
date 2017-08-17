import React, { Component } from 'react'
import Sidebar from './Sidebar'
import Footer from './Footer'
import Albums from './Albums'
import SingleAlbum from './SingleAlbum'
import axios from 'axios'

const logErr = console.error.bind(console)

export default class Main extends Component{
  constructor(props) {
    super(props)

    this.state = {
      albums: [],
      selectedAlbum: {
        songs: []
      },
    }

    this.selectAlbum = this.selectAlbum.bind(this)
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
    console.log("clicked select album:", album)

    axios.get(`api/albums/${album.id}`)
    .then(res => res.data)
    .then(backendAlbum => {
      this.setState({
        selectedAlbum: backendAlbum
      })
    })
    .catch(logErr)
  }


  render() {

    return (
      <div className="test">
        <Sidebar />
        <div className="col-xs-10">
          <SingleAlbum album={this.state.selectedAlbum} />
          <Albums
            albums={this.state.albums}
            handleClick={this.selectAlbum} />
        <Footer />
        </div>
      </div>
    )
  }
}
