'use strict'

import React from 'react'
import ReactDOM from 'react-dom'
import '../css/styles.scss'
import {Button} from 'react-bootstrap'

class Board extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const cells = this.props.cellsStatus
    

    return ( 
      <div className = "btn-group btn-matrix" > {
        cells
        .map(function (cell, index) {return <button id = 'matrix' className = {(cell ? 'btn btn-success btn-xs' : 'btn btn-default btn-xs')} key = {index} > 
        {cell ? '' : ''} < /button>;
        })
      } 
      </div>
    )
  }
}

module.exports = Board