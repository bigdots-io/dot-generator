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

    var dots = message.renderCoordinates();

    if(this.alignment === 'right') {
      var startingColumn = (this.startingColumn + this.width) - message.getWidth();
    } else if(this.alignment === 'center') {
      var startingColumn = this.startingColumn + Math.ceil((this.width - message.getWidth()) / 2);
    }

    if(startingColumn) {
      dots = dots.map((dot, i) => {
        dot.x = startingColumn + i
        return dot;
      });
    }

    return dots;
  }
}

module.exports = Textbox;
