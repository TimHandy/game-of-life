'use strict'

import React from 'react'
import update from 'immutability-helper'
import '../css/styles.scss'
import Controls from 'Controls'
import Board from 'Board'
import Game from '../modules/game.js'
import {Button} from 'react-bootstrap'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      cellsStatus: '',
      pause: false,
      counter: 0,
      game: ''
    }
  }

  componentWillMount() {
    const game = new Game(50,50)
    game.start()
    var self = this
    var interval = setInterval(function() {
      if (self.state.pause) {
        clearInterval(interval);
        self.setState({
          game: game
        })
      }
      game.applyNextAliveState(game.board)
      game.runNextGeneration(game.board)
      self.setState({ 
        cellsStatus: game.cellStatusArray(game.board),
        counter: self.state.counter + 1
         })
    }, 10)
    this.setState({
      cellsStatus: game.cellStatusArray(game.board),
      game: game
    })
  }

  pauseGame = () => {
    this.setState({
      // cellsStatus: game.cellStatusArray(game.board),
      pause: true
      })
  }

  resumeGame = (cellsStatus) => {
    this.state.pause = false

    var self = this
    var interval = setInterval(function() {
      if (self.state.pause) {
        clearInterval(interval);
        // self.setState({
        //   game: game
        // })
      }
      self.state.game.applyNextAliveState(self.state.game.board)
      self.state.game.runNextGeneration(self.state.game.board)
      self.setState({ 
        cellsStatus: self.state.game.cellStatusArray(self.state.game.board),
        counter: self.state.counter + 1
         })
    }, 10)
  }



  render() {
    return (
      <div style={{
                  width: '50%',
                  margin: '0 auto'
              }}>
        <Controls pauseGame ={this.pauseGame} resumeGame ={this.resumeGame}/>
        <br></br>
        <p>Generation Count: {this.state.counter}</p>
        <br></br>
        <Board type="button" className="btn btn-default" cellsStatus={this.state.cellsStatus}/>
      </div>

      )
    }
}

module.exports = App
