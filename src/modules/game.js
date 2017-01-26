
var Game = function(rows, cols){
  this.board = this.setUpBoard(rows, cols);
  this.hello = 1;
}

Game.prototype.cycleThroughBoard = function(board) {
  
  for(var i=0; i < board.length - 1; i++){
      for(var j=0; j < board[0].length - 1; j++){
        this.countAliveAdjacents(board[i][j])
        this.evaluateNextGeneration(board[i][j])
      }
  }
  // set all live values
  // increment a counter
}

// creates multi-dimensional array
Game.prototype.setUpBoard = function (rows, cols) {
  var arr = [];

  for(var i=0; i < rows; i++){
      arr.push([]);
      arr[i].push( new Array(cols));

      for(var j=0; j < cols; j++){
        arr[i][j] = new Cell([i, j], rows, cols);
      }
  }
  return arr;
}

Game.prototype.evaluateNextGeneration = (cell) => {

  switch(true) {
    case (cell.countAliveAdjacents < 2 && cell.alive): 
      cell.nextGenerationAliveStatus = false
    break
    case ((cell.countAliveAdjacents === 2 || cell.countAliveAdjacents === 3) && cell.alive): 
      cell.nextGenerationAliveStatus = true
    break
    case (cell.countAliveAdjacents > 3 && cell.alive): 
      cell.nextGenerationAliveStatus = false
    break
    case (cell.countAliveAdjacents === 3 && !cell.alive): 
      cell.nextGenerationAliveStatus = true
    break
    default:
      console.log('error with cases')
  }
  // decide whether nex gen should be dead/alive
  // store that in nextGenerationAliveStatus
}

// pre-populates board with alive cells and starts game 
Game.prototype.start = function() {
  this.board[1][5].alive = true
  this.board[5][5].alive = true
  this.board[5][6].alive = true
  this.board[6][6].alive = true
  //evaluateNextGeneration(this.board)
  var board = this.board
  this.cycleThroughBoard(board)
}

Game.prototype.countAliveAdjacents = function(cell) {
  var board = this.board
  var result = cell.adjacents.filter(function (value) {return board[value[0]][value[1]].alive}).length
  cell.countAliveAdjacents = result
  return result
}

//cell class
var Cell = function(location, rows, cols){
  this.alive = false
  this.nextGenerationAliveStatus = null
  this.rows = rows; this.cols = cols;
  this.location = location;
  this.adjacents = this.getAdjacents(location);
  this.countAliveAdjacents = null
}

Cell.prototype.isCellOnGrid = function(cell) {
    var x = cell[0], 
        y = cell[1];
    return x >= 0 && x <= this.rows && y >= 0 && y <= this.cols;
}

Cell.prototype.getAdjacents = function(cell) {
    var x = cell[0], 
        y = cell[1],
        //[[W], [E], [S], [N], [NW], [ES], [EN], [NE]]
        adjacents = [[x-1,y],[x+1,y],[x,y+1],[x,y-1],[x-1,y-1],[x+1,y+1],[x-1,y+1],[x+1,y-1]]; 
    return adjacents.filter(this.isCellOnGrid.bind(this));
}

