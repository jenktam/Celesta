import React from 'react'
import AlbumTile from './AlbumTile'

const Albums = props => {
  return (
      <div className="albums">
        <h3>Albums</h3>
        <div className="row">
        { props.albums.map( album => (
            <AlbumTile
              album = {album}
              onClick={ props.handleClick }
              key={ album.id }
              name={ album.name }
              songs={ album.songs }
              imageUrl={ album.imageUrl }
            />
          ))
        }

        </div>
      </div>
  )
}

export default Albums
