var assert = require('assert');
var DotGenerator = require('../index');
var dotStubs = require('./dot-stubs');

describe('Generating dots from text', function() {

  var dotGenerator = new DotGenerator();

  describe('alignment', function() {
    var textOptions = {
      text: 'HI',
      width: 100,
      height: 6,
      font: 'system-6',
      color: '#FFFFFF',
      alignment: 'left'
    };

    it('should render left aligned text', function() {
      textOptions.alignment = 'left';
      assert.deepEqual(dotStubs.text.leftAligned.HI, dotGenerator.text(textOptions));
    });

    it('should render right aligned text', function() {
      textOptions.alignment = 'right';
      assert.deepEqual(dotStubs.text.rightAligned.HI, dotGenerator.text(textOptions));
    });

    it('should render center aligned text', function() {
      textOptions.alignment = 'center';
      assert.deepEqual(dotStubs.text.centerAligned.HI, dotGenerator.text(textOptions));
    });
  });
});
