
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