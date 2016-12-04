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
      startingRow: options.startingRow,
      spaceBetweenLetters: options.spaceBetweenLetters,
      spaceBetweenLines: options.spaceBetweenLines
    }).write(options.text);
  }

  image(url, callbacks) {
    new ImageExploder(url).process(callbacks);
  }

  color(color, dimensions) {
    var height = dimensions.width,
        width = dimensions.width,
        out = [];

    for(var y = 0; y < height; y++) {
      for(var x = 0; x < width; x++) {
        out.push({y: y, x: x, hex: color});
      }
    }

    return {
      width: dimensions.width,
      height: dimensions.height,
      dots: out
    };
  }
}

module.exports = DotGenerator;
