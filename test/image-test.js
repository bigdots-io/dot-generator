var assert = require('assert');
var DotGenerator = require('../index');
var dotStubs = require('./dot-stubs');

describe('Generating dots from image', function() {

  var dotGenerator = new DotGenerator();

  describe('from url', function() {
    it('should render', function(done) {
      dotGenerator.image('./test/green-ball.png', {
        onSuccess: (dots) => {
          assert.deepEqual(dotStubs.image.greenBall, dots)
          done();
        }
      });
    });
  });
});
