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

  write(text) {
    var message = new Message(text, this.font, {
      spaceBetweenLetters: this.spaceBetweenLetters,
      spaceBetweenLines: 2,
      wrap: this.wrap,
      width: this.width,
      hex: this.hex
    });

    var messageWidth = message.getWidth();

    var dots = message.renderCoordinates();

    var computedStartingColumn = this.startingColumn,
        computedStartingRow = this.startingRow;

    if(this.alignment === 'right') {
      computedStartingColumn = (this.startingColumn + this.width) - messageWidth;
    } else if(this.alignment === 'center') {
      computedStartingColumn = this.startingColumn + Math.ceil((this.width - messageWidth) / 2);
    }

    var transformedDots = dots.map((dot) => {
      return {
        x: dot.x + computedStartingColumn,
        y: dot.y + computedStartingRow,
        hex: dot.hex
      };
    });

    return {
      width: messageWidth,
      dots: transformedDots
    };
  }
}

module.exports = Textbox;
