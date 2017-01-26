
var Game = function(rows, cols){
  this.board = this.setUpBoard(rows, cols);
  this.hello = 1;
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

// pre-populates board with selected cells and starts game 
Game.prototype.start = function() {
  this.board[1][5].selected = true
}

Game.prototype.countSelectedAdjacents = function(cell) {
  var board = this.board
  return cell.adjacents.filter(function (value) {return board[value[0]][value[1]].selected}).length
}

//cell class
var Cell = function(location, rows, cols){
  this.selected = false
  this.rows = rows; this.cols = cols;
  this.location = location;
  this.adjacents = this.getAdjacents(location);
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

