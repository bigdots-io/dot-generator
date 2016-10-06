"use strict";

var Fonts = {
  'system-micro': require('./fonts/system-micro'),
  'system-medium': require('./fonts/system-medium')
};

class TypeWriter {
  constructor(options) {
    options = options || {};
    this.font = options.font;
    this.column = options.startingColumn || 0;
    this.row = options.startingRow || 0;
    this.wrap = options.wrap || 'no-wrap';
    this.spaceBetweenLetters = options.spaceBetweenLetters || 1;
    this.alignment = options.alignment || 'left';
    this.hex = options.hex || '#FFFFFF';
  }

  static availableFonts() {
    return Object.keys(Fonts);
  }

  getWidth(copy) {
    var font = Fonts[this.font],
        characters = font.characters,
        width = 0;

    for (let i = 0; i < copy.length; i++) {
      var character = characters[copy[i]];

      if(character) {
        width = width + parseInt(character.width || font.width, 10) + this.spaceBetweenLetters;
      }
    }

    return width;
  }

  text(copy, callback) {
    var font = Fonts[this.font],
        characters = font.characters,
        coordinatesOut = [];

    if(this.alignment === 'left') {
      for (let i = 0; i < copy.length; i++) {
        var character = characters[copy[i]],
            characterWidth = parseInt(character.width || font.width, 10);

        if(character) {
          var coordinates = character.coordinates;

          if(coordinates) {
            var results = this.processCharacterCoordinates(coordinates, characterWidth);
            var coordinatesOut = coordinatesOut.concat(results);
          }

          this.column += (characterWidth + this.spaceBetweenLetters);
        }
      }
    } else {
      for (let i = copy.length - 1; i >= 0; i--) {
        var character = characters[copy[i]],
            characterWidth = parseInt(character.width || font.width, 10);

        if(character) {
          this.column -= (characterWidth + this.spaceBetweenLetters);
          var coordinates = character.coordinates;

          if(coordinates) {
            var results = this.processCharacterCoordinates(coordinates, characterWidth);
            var coordinatesOut = coordinatesOut.concat(results);
          }
        }
      }
    }

    callback(coordinatesOut);
  }

  processCharacterCoordinates(coordinates, width) {
    var validCoordinates = [];

    coordinates.forEach((point) => {
      if(point.x < width) {
        validCoordinates.push({
          y: this.row + point.y,
          x: this.column + point.x,
          hex: this.hex
        });
      }
    });

    return validCoordinates;
  }
}

module.exports = TypeWriter;
