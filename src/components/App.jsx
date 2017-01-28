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
      game: ''
    }
  }

  componentWillMount() {
    const game = new Game(30,30)
    game.start()
    self = this
    // var interval = setInterval(function () {
    //   if (self.state.game.pause) {
    //     clearInterval(interval);
    //   }
    //   self.state.game.applyNextAliveState(self.state.game.board)
    //   self.state.game.runNextGeneration(self.state.game.board)
    //   self.state.game.counter++ 
    //   self.setState({ game: self.state.game })
    // }, 1000)
    this.setState({game: game})
  }

  pauseGame = () => {
    this.state.game.pause = true
    this.setState({ game: this.state.game })
  }

  resumeGame = () => {
    this.state.game.pause = false
    self = this
    var interval = setInterval(function () {
      if (self.state.game.pause) {
        clearInterval(interval);
      }
      self.state.game.applyNextAliveState(self.state.game.board)
      self.state.game.runNextGeneration(self.state.game.board)
      self.state.game.counter++ 
      self.setState({ game: self.state.game })
    }, 100)
  }

  render() {
    return (
      <div style={{
                  width: '50%',
                  margin: '0 auto'
              }}>
        <Controls pauseGame ={this.pauseGame} resumeGame ={this.resumeGame}/>
        <br></br>
        <p>Generation Count: {this.state.game.counter}</p>
        <br></br>
        <Board type="button" className="btn btn-default" board = {this.state.game.board}/>
      </div>

      )
    }
}

module.exports = App
