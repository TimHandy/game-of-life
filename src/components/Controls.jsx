'use strict'

import React from 'react'
import ReactDOM from 'react-dom'
import {Button} from 'react-bootstrap'
import '../css/styles.scss'

class Controls extends React.Component {

  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
        <div>
          <button type="button" className="btn btn-default" onClick={this.props.pauseGame}>Pause Game</button>
          <button type="button" className="btn btn-default" onClick={this.props.resumeGame}>Resume Game</button>
        </div>
      )
  }
}



module.exports = Controls