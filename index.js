"use strict";

var Textbox = require('./lib/textbox');
var ImageExploder = require('./lib/image-exploder');

class DotGenerator {
  constructor() {
    // Nothing...
  }

  text(options) {
    var result = new Textbox({
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

    if(options.backgroundColor) {
      var out = this.color(options.backgroundColor, {
        width: result.width,
        height: result.height,
        startingColumn: options.startingColumn,
        startingRow: options.startingRow
      });

      result.dots.forEach(function(dot) {
        var index = out.dots.findIndex(function(item) {
          return item.y === dot.y && item.x === dot.x;
        });

        if(index) {
          out.dots[index].hex = dot.hex;
        } else {
          out.dots.push(dot);
        }
      });

      return out;

    } else {
      return result;
    }
  }

  image(url, callbacks) {
    new ImageExploder(url).process(callbacks);
  }

  color(color, options) {
    var height = options.height,
        width = options.width,
        startingColumn = options.startingColumn || 0,
        startingRow = options.startingRow || 0,
        out = [];

    for(var y = 0; y < height; y++) {
      for(var x = 0; x < width; x++) {
        out.push({
          y: y + startingRow,
          x: x + startingColumn,
          hex: color
        });
      }
    }

    return {
      width: width,
      height: height,
      dots: out
    };
  }
}

module.exports = DotGenerator;
