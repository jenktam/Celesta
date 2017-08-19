import React from 'react'

const Footer = ({currentSong, isPlaying}, props) => {
  console.log("currentSong in footer", props)

  return (
    <div>
      <footer style={
        !currentSong.id
        ? { display: 'none'}
        : null}
      >
        <div className="pull-left">
          <button className="btn btn-default">
            <span className="glyphicon glyphicon-step-backward"></span>
          </button>
          <button className="btn btn-default">
            <span className="glyphicon glyphicon-play"></span>
          </button>
          <button className="btn btn-default">
            <span className="glyphicon glyphicon-step-forward"></span>
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
