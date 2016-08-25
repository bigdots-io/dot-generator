"use strict";

var Fonts = {
  'system-micro': require('./fonts/system-micro/characters')
};

class TypeWriter {
  constructor(options) {
    options = options || {};

    this.font = options.font;
    this.column = options.startingColumn || 0;
    this.row = options.startingRow || 0;
    this.spaceBetweenLetters = options.spaceBetweenLetters || 2;
  }

  text(copy, callback) {
    var characters = Fonts[this.font];
    for (let i = 0; i < copy.length; i++) {
      var points = characters[copy[i]];
      if(points) {
        points.forEach((point) => {
          callback({
            y: this.row + point.y,
            x: this.column + point.x
          });
        });

        this.column = this.column + 4 + this.spaceBetweenLetters;
      }
    }
  }
}

module.exports = TypeWriter;
