"use strict";

var Message = require('./message');

class Textbox {
  constructor(options = {}) {
    this.font = options.font || 'system-6';
    this.startingColumn = options.startingColumn || 0;
    this.startingRow = options.startingRow || 0;
    this.width = options.width;
    this.height = options.height;
    this.spaceBetweenLetters = options.spaceBetweenLetters || 1;
    this.alignment = options.alignment || 'left';
    this.hex = options.hex || '#FFFFFF';
    this.wrap = options.wrap || 'word';

    this.options = options;
  }

  getWidth(text) {
    return new Message(text, this.font, {
      spaceBetweenLetters: this.spaceBetweenLetters,
      wrap: this.wrap,
      width: this.width
    }).getWidth();
  }

  write(text, callback = function() {}) {
    var message = new Message(text, this.font, {
      spaceBetweenLetters: this.spaceBetweenLetters,
      spaceBetweenLines: 2,
      wrap: this.wrap,
      width: this.width
    });

    var startingColumn = this.startingColumn;

    if(this.alignment === 'right') {
      startingColumn = (this.startingColumn + this.width) - message.getWidth();
    } else if(this.alignment === 'center') {
      startingColumn = this.startingColumn + Math.ceil((this.width - message.getWidth()) / 2);
    }

    var coordinates = message.renderCoordinates();

    var transformedCoordinates = coordinates.map((coordinate) => {
      coordinate.hex = coordinate.hex;
      return coordinate;
    });

    callback(transformedCoordinates);
  }
}

module.exports = Textbox;
