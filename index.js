"use strict";

var Message = require('./lib/message');

class Typewriter {
  constructor(options = {}) {
    this.font = options.font || 'system-6';
    this.startingColumn = options.startingColumn || 0;
    this.startingRow = options.startingRow || 0;
    this.spaceBetweenLetters = options.spaceBetweenLetters || 1;
    this.alignment = options.alignment || 'left';
    this.hex = options.hex || '#FFFFFF';

    this.options = options;

    this.text = "";
  }

  getWidth(text) {
    return new Message(text, this.font, {
      spaceBetweenLetters: this.spaceBetweenLetters
    }).getWidth();
  }

  write(text, callback = function() {}) {
    var message = new Message(text, this.font, {
      spaceBetweenLetters: this.spaceBetweenLetters
    });

    var startingColumn = this.startingColumn;

    if(this.alignment === 'right') {
      startingColumn -= message.getWidth();
    }

    var coordinates = message.renderCoordinates({
      previousText: this.text,
      columnOffset: startingColumn,
      rowOffset: this.startingRow
    });

    var transformedCoordinates = coordinates.map((coordinate) => {
      coordinate.hex = coordinate.hex || this.hex;
      return coordinate;
    });

    this.text = text;

    callback(transformedCoordinates);
  }
}

module.exports = Typewriter;
