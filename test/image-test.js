var assert = require('assert');
var DotGenerator = require('../index');
var dotFixtures = require('./dot-fixtures');

describe('Generating dots from image', function() {

  var dotGenerator = new DotGenerator();

  describe('from url', function() {
    it('should render', function(done) {
      dotGenerator.image('./test/green-ball.png', {
        onSuccess: (dots) => {
          assert.deepEqual(dotFixtures.image.greenBall, dots)
          done();
        }
      });
    });
  });
});
