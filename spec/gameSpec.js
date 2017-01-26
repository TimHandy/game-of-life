describe('game', function() {

  var game;
  var cell;
  var board;
  var rows = 100;
  var cols = 100;

  describe('board', function() {

    beforeEach(function() {
      game = new Game(rows, cols);
      board = game.board
      game.start()
    });

    it('should be an array', function() {
      expect ( Array.isArray(board) ).toBe(true)
    })

    it('should be a 100 x 100 array', function() {
      game = new Game(100, 100);
      expect ( game.board.length ).toBe(100)
      expect ( game.board[0].length ).toBe(100)
    })

    it('should contain a cell object', function() {
      expect ( typeof board[1][1]).toBe('object')
    })

    it('cell [1][5] is selected on by default', function() {
      expect (board[1][5].selected).toBe(true)
    })

    it('cell [1,4] default selected adjacent count is 1', function() {
      cell = game.board[1][4];
      expect (game.countSelectedAdjacents(cell)).toBe(1);
    })

    it('cell [0,0] default selected adjacent count is 0', function() {
      cell = game.board[0][0];
      expect (game.countSelectedAdjacents(cell)).toBe(0);
    })

  });

    describe('cell', function() {

      beforeEach(function() {
        game = new Game(rows, cols);
        game.start();
        cell = game.board[0][0];
      });

      it('can be selected on (true) or off (false)', function() {
        expect ( typeof cell.selected).toBe('boolean')
      })     

      it('[2,2] adjacent cells are [1,2],[3,2],[2,3],[2,1],[1,1],[3,3],[1,3],[3,1]', function() {
        cell = game.board[2][2];
        expect (JSON.stringify(cell.getAdjacents([2,2], cell.rows, cell.cols))).toBe(JSON.stringify([[1,2],[3,2],[2,3],[2,1],[1,1],[3,3],[1,3],[3,1]]));
      })

      it('[0,0] adjacent cells are [[1,0],[0,1],[1,1]]', function() {
        expect (JSON.stringify(cell.getAdjacents([0,0], cell.rows, cell.cols))).toBe(JSON.stringify([[1,0],[0,1],[1,1]]));
      })

    });

});