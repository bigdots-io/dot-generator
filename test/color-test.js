var assert = require('assert');
var DotGenerator = require('../index');

describe('Setting color', function() {

  var dotGenerator = new DotGenerator();

  it('renders an solid color', function() {
    var result = dotGenerator.color('#FFFFFF', {
      width: 5,
      height: 5
    });
    assert.deepEqual(require('./fixtures/solid-color'), result);
  });
});
