'use strict'

import React from 'react'
import update from 'immutability-helper'
import '../css/styles.scss'
import Controls from 'Controls'
import Board from 'Board'
import Game from '../modules/game.js'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      game: ''
    }
  }

  componentWillMount() {
    const game = new Game(10,10)
    game.start()
    this.setState({game: game})
  }

  pauseGame = () => {
    this.state.game.pause = true
    this.setState({ game: this.state.game })
  }

  gameUpdate = () => {
    self = this
    var interval = setInterval(function () {
      console.log(self)
      if (self.pause) {
        clearInterval(interval);
      }
      self.state.game.applyNextAliveState(self.state.game.board)
      self.state.game.runNextGeneration(self.state.game.board)
      self.state.game.counter++ 
      self.setState({ game: self.state.game })
    }, 1000)
  }

  render() {
    console.log(this.state.game.board[1][5].alive)
    return (
      <div style={{
                  width: '50%',
                  margin: '0 auto'
              }}>
        <h1>App component</h1>
        <button onClick={this.pauseGame}>Pause Game</button>
        <button onClick={this.gameUpdate}>Update Game</button>
        <p>Alive: {JSON.stringify(this.state.game.board[1][5].alive)}</p>
        <Controls />
        <Board />
      </div>

      )
    }
}

module.exports = App