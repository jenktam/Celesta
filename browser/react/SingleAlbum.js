import React from 'react'

const SingleAlbum = ({ album, start }) => {
  console.log("album", album)
  console.log("start", start)

  return (
    <div className="album">
      <div>
        <h3>{album.name}</h3>
        <img src={album.imageUrl} className="img-thumbnail" />
      </div>
      <table className='table'>
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Artists</th>
            <th>Genre</th>
          </tr>
        </thead>
        <tbody>
          { album.songs.map(song => (
            <tr key={ song.id }>
              <td>
                <button
                  className="btn btn-default btn-xs"
                  onClick={() => start(song.audioUrl)}
                >
                  <span className="glyphicon glyphicon-play"></span>
                </button>
              </td>
              <td>{ song.name }</td>
              <td>{ song.artists
                ? song.artists.map( artist => artist.name).join(',')
                : null
                }</td>
              <td>{ song.genre }</td>
            </tr>
            ))
          }

        </tbody>
      </table>
    </div>
  )
}

export default SingleAlbum
