var assert = require('assert');
var DotGenerator = require('../index');

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
      assert.deepEqual(require('./fixtures/left-aligned-text'), dotGenerator.text(textOptions));
    });

    it('returns right aligned text', function() {
      textOptions.alignment = 'right';
      assert.deepEqual(require('./fixtures/right-aligned-text'), dotGenerator.text(textOptions));
    });

    it('returns center aligned text', function() {
      textOptions.alignment = 'center';
      assert.deepEqual(require('./fixtures/center-aligned-text'), dotGenerator.text(textOptions));
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
      assert.deepEqual(require('./fixtures/left-aligned-text'), dotGenerator.text(textOptions));
    });

    it('returns offset text to the starting row and column', function() {
      textOptions.startingRow = 3;
      textOptions.startingColumn = 5;
      assert.deepEqual(require('./fixtures/offset-text'), dotGenerator.text(textOptions));
    });
  });

  // describe('text wrapping', function() {
  //   var textOptions = {
  //     text: 'HI ROY',
  //     width: 8,
  //     height: 6,
  //     font: 'system-6',
  //     color: '#FFFFFF',
  //     alignment: 'left',
  //   };
  //
  //   describe('when set to wrap', function() {
  //     beforeEach(function() {
  //       textOptions.wrap = 'wrap';
  //     });
  //
  //     it('returns wrapped text', function() {
  //       assert.deepEqual(require('./fixtures/wrapped-text'), dotGenerator.text(textOptions));
  //     });
  //   });
  // });
});
