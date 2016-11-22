"use strict";

var Textbox = require('./lib/textbox');
var ImageExploder = require('./lib/image-exploder');

class DotGenerator {
  constructor() {
    // Nothing...
  }

  text(options) {
    return new Textbox({
      font: options.font,
      hex: options.color,
      alignment: options.alignment,
      width: options.width,
      height: options.height,
      startingColumn: options.startingColumn,
      startingRow: options.startingRow
    }).write(options.text);
  }

  image(url, callbacks) {
    new ImageExploder(url).process(callbacks);
  }
}

module.exports = DotGenerator;
