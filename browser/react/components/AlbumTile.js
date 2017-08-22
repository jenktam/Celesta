import React from 'react'

const AlbumTile = props => (
   <div className="col-xs-4" onClick={ () => props.onClick(props.album) } >
            <a className="thumbnail" href="#" >
              <img src={`${props.imageUrl}`} />
              <div className="caption">
                <h5>
                  <span>{ props.name }</span>
                </h5>
                <small>{ props.songs.length } Songs</small>
              </div>
            </a>
          </div>
)

export default AlbumTile


//line 4: really props.selectAlbum from main with props.album as the albu
