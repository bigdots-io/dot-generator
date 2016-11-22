var assert = require('assert');
var DotGenerator = require('../index');

describe('Generating dots from image', function() {

  var dotGenerator = new DotGenerator();

  describe('from url', function() {
    it('should render an image', function(done) {
      dotGenerator.image('./test/fixtures/green-ball.png', {
        onSuccess: (dots) => {
          assert.deepEqual(require('./fixtures/png'), dots)
          done();
        }
      });
    });

    it('should render an animated image', function(done) {
      dotGenerator.image('./test/fixtures/icon-laugh.gif', {
        onSuccess: (dots) => {
          assert.deepEqual(require('./fixtures/animated-gif'), dots)
          done();
        }
      });
    });
  });
});
