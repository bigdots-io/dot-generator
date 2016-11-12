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

    it('returns left aligned text', function() {
      textOptions.alignment = 'left';
      assert.deepEqual({
        width: 8,
        dots: dotStubs.text.leftAligned.HI
      }, dotGenerator.text(textOptions));
    });

    it('returns right aligned text', function() {
      textOptions.alignment = 'right';
      assert.deepEqual({
        width: 8,
        dots: dotStubs.text.rightAligned.HI
      }, dotGenerator.text(textOptions));
    });

    it('returns center aligned text', function() {
      textOptions.alignment = 'center';
      assert.deepEqual({
        width: 8,
        dots: dotStubs.text.centerAligned.HI
      }, dotGenerator.text(textOptions));
    });
  });
});
