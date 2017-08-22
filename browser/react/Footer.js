import React from 'react'

const Footer = ({currentSong, isPlaying, start, pause, selectedAlbum, next, previous}, props) => {
  console.log("currentSong in footer", currentSong)

  return (
    <div>
      <footer style={
        !currentSong.id
        ? { display: 'none'}
        : null}
      >
        <div className="pull-left">
          <button className="btn btn-default">
            <span className="glyphicon glyphicon-step-backward"
              onClick = { () => previous() }
            ></span>
          </button>
          <button className="btn btn-default"
            onClick={
              (isPlaying === true && currentSong.id)
              ? () => pause()
              : () => start(currentSong.audioUrl, currentSong)
            }
          >
            <span className={
              (isPlaying === true && currentSong.id)
              ? "glyphicon glyphicon-pause"
              : "glyphicon glyphicon-play"
            }
            >
            </span>
          </button>
          <button className="btn btn-default">
            <span className="glyphicon glyphicon-step-forward"
              onClick={
                () => next()
              }
            ></span>
          </button>
        </div>
        <div className="bar">
          <div className="progress">
            <div className="progress-bar"></div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Footer
