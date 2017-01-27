'use strict'

import React from 'react'
import '../css/styles.scss'
import Controls from 'Controls'
import Board from 'Board'

class App extends React.Component {
render() {
      
  return (
    <div>
      <h1>App component</h1>
      <Controls />
      <Board />
    </div>

    )
  }
}

module.exports = App