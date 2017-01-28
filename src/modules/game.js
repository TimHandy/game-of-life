import Cell from './cell.js'

var Game = function (rows, cols) {
  this.board = this.setUpBoard(rows, cols);
  this.pause = false;
  this.counter = 0
}

Game.prototype.runNextGeneration = function (board) {

  for (var i = 0; i < board.length - 1; i++) {
    for (var j = 0; j < board[0].length - 1; j++) {
      this.countAliveAdjacents(board[i][j])
      this.evaluateNextGeneration(board[i][j])
    }
  }
}

Game.prototype.applyNextAliveState = function (board) {

  for (var i = 0; i < board.length - 1; i++) {
    for (var j = 0; j < board[0].length - 1; j++) {
      board[i][j].alive = board[i][j].nextGenerationAliveStatus
    }
  }
}

// creates multi-dimensional array
Game.prototype.setUpBoard = function (rows, cols) {
  var arr = [];

  for (var i = 0; i < rows; i++) {
    arr.push([]);
    arr[i].push(new Array(cols));

    for (var j = 0; j < cols; j++) {
      arr[i][j] = new Cell([
        i, j
      ], rows, cols);
    }
  }
  return arr;
}

Game.prototype.presets = function () {
  this.board[14][13].alive = true
  this.board[14][14].alive = true
  this.board[15][12].alive = true
  this.board[15][13].alive = true
  this.board[16][13].alive = true


  this.board[0][1].alive = true
  this.board[1][1].alive = true
  this.board[2][1].alive = true
  this.board[1][3].alive = true
  // this.board[1][4].alive = true
  this.board[2][2].alive = true
  this.board[2][3].alive = true

  this.board[1][5].alive = true
  this.board[5][5].alive = true
  this.board[5][6].alive = true
  this.board[6][6].alive = true
}

Game.prototype.evaluateNextGeneration = (cell) => {

  switch (true) {
    case(cell.countAliveAdjacents < 2 && cell.alive):
      cell.nextGenerationAliveStatus = false
      break
    case((cell.countAliveAdjacents === 2 || cell.countAliveAdjacents === 3) && cell.alive):
      cell.nextGenerationAliveStatus = true
      break
    case(cell.countAliveAdjacents > 3 && cell.alive):
      cell.nextGenerationAliveStatus = false
      break
    case(cell.countAliveAdjacents === 3 && !cell.alive):
      cell.nextGenerationAliveStatus = true
      break
  }
  // decide whether nex gen should be dead/alive store that in
  // nextGenerationAliveStatus
}

// pre-populates board with alive cells and starts game TODO: this function is
// not tested yet!!!
Game.prototype.start = function () {
  this.presets()
  this.runNextGeneration(this.board)
  var board = this.board
  var self = this
  // this.interval()
}

Game.prototype.interval = function () {
  var self = this
    var interval = setInterval(function () {
    if (self.pause) {
      clearInterval(interval);
    }
    self.applyNextAliveState(self.board)
    self.runNextGeneration(self.board)
    self.counter++ 
  }, 1000)
}

Game.prototype.countAliveAdjacents = function (cell) {
  var board = this.board
  var result = cell
    .adjacents
    .filter(function (value) {
      return board[value[0]][value[1]].alive
    })
    .length
  cell.countAliveAdjacents = result
  return result
}

module.exports = Game
