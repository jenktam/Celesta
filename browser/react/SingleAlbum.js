import React from 'react'

const SingleAlbum = ({ album, start, pause, currentSong, isPlaying }) => {

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
            <tr
              key={ song.id }
              className={ song.id === currentSong.id ? 'active' : '' }
            >
              <td onClick={
                (isPlaying === true && song.id === currentSong.id)
                ? () => pause()
                : () => start(song.audioUrl, song)
              }>
                <button className="btn btn-default btn-xs">

                  <span className={
                    (isPlaying === true && song.id === currentSong.id)
                    ? "glyphicon glyphicon-pause"
                    : "glyphicon glyphicon-play"
                  }>
                  </span>
                </button>
              </td>
              <td>{ song.name }</td>
              <td>
                {
                  song.artists
                  ? song.artists.map( artist => artist.name).join(',')
                  : null
                }
              </td>
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
