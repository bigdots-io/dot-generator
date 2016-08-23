"use strict";

var characters = require('./characters');

class TypeWriter {
  constructor(options) {
    options = options || {};

    this.column = options.startingColumn || 0;
    this.row = options.startingRow || 0;
    this.spaceBetweenLetters = options.spaceBetweenLetters || 2;
  }

  text(copy, callback) {
    for (let i = 0; i < copy.length; i++) {
      var points = characters[copy[i]];
      if(points) {
        var y, x;

        points.forEach((point) => {
          var coordinates = point.split(':');

          y = parseInt(coordinates[0], 10)
          x = parseInt(coordinates[1], 10)

          callback({
            y: this.row + y,
            x: this.column + x
          });
        });

        this.column = this.column + x + this.spaceBetweenLetters;
      }
    }
  }
}

module.exports = TypeWriter;
