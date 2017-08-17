import React, { Component } from 'react'

export default class Sidebar extends Component {

  render(){
    return (
      <div>
        <div className="col-xs-2">
          <sidebar>
            <img src="celesta.png" className="logo" />
            <section>
              <h4 className="menu-item active">
                <a href="#">ALBUMS</a>
              </h4>
            </section>
          </sidebar>
        </div>
      </div>

    )
  }
}
