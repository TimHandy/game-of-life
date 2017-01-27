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
      game.board[1][5].alive = true
      game.board[5][5].alive = true
      game.board[5][6].alive = true
      game.board[6][6].alive = true
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

    it('cell [1][5] is alive on by default', function() {
      expect (board[1][5].alive).toBe(true)
    })

    it('cell [1,4] default alive adjacent count is 1', function() {
      cell = game.board[1][4];
      expect (game.countAliveAdjacents(cell)).toBe(1);
    })

    it('cell [0,0] default alive adjacent count is 0', function() {
      cell = game.board[0][0];
      expect (game.countAliveAdjacents(cell)).toBe(0);
    })

    it('cell [1,4] default alive adjacent count is 1', function() {
      cell = game.board[1][4];
      expect (cell.countAliveAdjacents).toBe(1);
    })

    it('cell [0,0] alive adjacent count is 2', function() {
      cell = game.board[0][0];
      game.board[0][1].alive = true
      game.board[1][1].alive = true
      game.countAliveAdjacents(game.board[0][0])
      expect (cell.countAliveAdjacents).toBe(2);
    })

    describe('game logic for board', function() {


      it('cell [1,5] to be dead on next turn', function() {
        cell = game.board[1][5];
        expect (cell.nextGenerationAliveStatus).toBe(false);
      })

      it('cell [5,5] to remain alive on next turn', function() {
        cell = game.board[5][5];
        expect (cell.nextGenerationAliveStatus).toBe(true);
      })

      it('cell [0,0] to be dead on next turn', function() {
        cell = game.board[0][0];
        game.board[0][0].alive = true
        game.board[1][0].alive = true
        game.board[1][1].alive = true
        game.board[0][1].alive = true
        game.start()
        expect (cell.nextGenerationAliveStatus).toBe(true);
      })

      it('cell [1,1] to be dead on next turn', function() {
        cell = game.board[1][1];
        game.board[1][1].alive = true
        game.board[0][0].alive = true
        game.board[1][0].alive = true
        game.board[0][1].alive = true
        game.board[0][2].alive = true
        game.start()
        expect (cell.nextGenerationAliveStatus).toBe(false);
      })

      it('dead cell [1,1] to come alive on next turn', function() {
        cell = game.board[1][1];
        game.board[1][1].alive = false
        game.board[0][0].alive = true
        game.board[0][1].alive = true
        game.board[1][0].alive = true
        game.start()
        expect (cell.nextGenerationAliveStatus).toBe(true);
      })

    })

  });

    describe('cell', function() {

      beforeEach(function() {
        game = new Game(rows, cols);
        game.start();
        cell = game.board[0][0];
      });

      it('can be alive (true) or dead (false)', function() {
        expect ( typeof cell.alive).toBe('boolean')
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