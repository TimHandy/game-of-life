describe('game', function() {

  var game;


  describe('board', function() {

    beforeEach(function() {
      game = new Game();
    });

    it('should be an array', function() {
      expect ( Array.isArray(game.board) ).toBe(true)
    })


  });

});