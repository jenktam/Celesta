import React, { Component } from 'react'

const Sidebar = props => {
  return (
    <div>
      <div className="col-xs-2">
        <sidebar>
          <img src="celesta.png" className="logo" />
          <section>
            <h4 className="menu-item active">
              <a href="#" onClick={() => props.handleClick()}>ALBUMS</a>
            </h4>
          </section>
        </sidebar>
      </div>
    </div>
  )
}

export default Sidebar
