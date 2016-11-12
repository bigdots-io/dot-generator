var assert = require('assert');
var DotGenerator = require('../index');
var dotFixtures = require('./dot-fixtures');

describe('Generating dots from text', function() {

  var dotGenerator = new DotGenerator();

  describe('text alignment', function() {
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
        dots: dotFixtures.text.leftAligned.HI
      }, dotGenerator.text(textOptions));
    });

    it('returns right aligned text', function() {
      textOptions.alignment = 'right';
      assert.deepEqual({
        width: 8,
        dots: dotFixtures.text.rightAligned.HI
      }, dotGenerator.text(textOptions));
    });

    it('returns center aligned text', function() {
      textOptions.alignment = 'center';
      assert.deepEqual({
        width: 8,
        dots: dotFixtures.text.centerAligned.HI
      }, dotGenerator.text(textOptions));
    });
  });

  describe('positioning the textbox', function() {
    var textOptions = {
      text: 'HI',
      width: 100,
      height: 6,
      font: 'system-6',
      color: '#FFFFFF',
      alignment: 'left'
    };

    it('defaults to coordinate 0,0', function() {
      textOptions.alignment = 'left';
      assert.deepEqual({
        width: 8,
        dots: dotFixtures.text.leftAligned.HI
      }, dotGenerator.text(textOptions));
    });

    it('returns offset text to the starting row and column', function() {
      textOptions.startingRow = 3;
      textOptions.startingColumn = 5;
      assert.deepEqual({
        width: 8,
        dots: dotFixtures.text.offsetText.HI
      }, dotGenerator.text(textOptions));
    });
  });
});
