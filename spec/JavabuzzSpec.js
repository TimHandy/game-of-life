describe('Javabuzz', function() {

  var javabuzz;

  describe('knows when a number is', function() {

    beforeEach(function() {
      javabuzz = new Javabuzz();
    });

    it('divisible by 3', function() {
      expect(javabuzz.isDivisibleByThree(3)).toBe(true);
    });

    it('divisible by 3', function() {
      expect(javabuzz.isDivisibleByThree(1)).toBe(false);
    });

  });

});