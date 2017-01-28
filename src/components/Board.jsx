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
    var cells = []
    for (var i = 0; i < this.props.board.length; i++) {
      var cell = this.props.board[i];
      for (var j = 0; j < cell.length; j++) {
        cells.push(cell[j].alive);
      }
    }

    return ( 
      <div className = "btn-group btn-matrix" > {
        cells
        .map(function (cell, index) {return <button id = 'matrix' type = "button" className = {(cell ? 'btn btn-success btn-xs' : 'btn btn-default btn-xs')} key = {index} > 
        {cell ? '' : ''} < /button>;
        })
      } 
      </div>
    )
  }
}

module.exports = Board