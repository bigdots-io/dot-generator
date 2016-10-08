"use strict";

var Message = require('./lib/message');

class Typewriter {
  constructor(options) {
    options = options || {};
    this.font = options.font;
    this.column = options.startingColumn || 0;
    this.row = options.startingRow || 0;
    this.wrap = options.wrap || 'no-wrap';
    this.spaceBetweenLetters = options.spaceBetweenLetters || 1;
    this.alignment = options.alignment || 'left';
    this.hex = options.hex || '#FFFFFF';

    this.options = options;

    this.text = "";
  }

  static availableFonts() {
    return Object.keys(Fonts);
  }

  getWidth(text) {
    return new Message(text, this.font, {
      spaceBetweenLetters: this.spaceBetweenLetters
    }).getWidth();
  }

  write(text, callback) {
    var message = new Message(text, this.font, {
      spaceBetweenLetters: this.spaceBetweenLetters
    });

    var coordinates = message.coordinates();

    // this.column = this.getStartingColumn(text);
    //
    // for (let i = 0; i < text.length; i++) {
    //   var character = new Character(text[i], font),
    //       characterWidth = character.getWidth();
    //
    //   if(character.isRenderable() && (text[i] !== this.text[i])) {
    //     var coordinates = character.getCoordinates();
    //
    //     if(coordinates) {
    //       if(this.text && this.text[i]) {
    //         var previousCharacter = new Character(this.text[i], font);
    //
    //         if(previousCharacter) {
    //           var previousCoordinates = previousCharacter.getCoordinates();
    //           coordinates = this.removePreviousCharacterCoordinate(coordinates, previousCoordinates);
    //         }
    //       }
    //
    //       var results = this.processCharacterCoordinates(coordinates, characterWidth);
    //       var coordinatesOut = coordinatesOut.concat(results);
    //     }
    //   }
    //
    //   this.column += (characterWidth + this.spaceBetweenLetters);
    // }
    //
    // this.text = text;

    var startingColumn = this.options.startingColumn;

    if(this.alignment === 'right') {
      startingColumn -= message.getWidth();
    }

    var transformedCoordinates = coordinates.map((coordinate) => {
      return {
        hex: this.hex,
        x: coordinate.x + startingColumn,
        y: coordinate.y
      };
    });

    callback(transformedCoordinates);
  }

  removePreviousCharacterCoordinate(coordinates, previousCoordinates) {
    previousCoordinates.forEach(function(previousCoordinate) {
      var index = coordinates.findIndex(function(coordinate) {
        return (coordinate.y === previousCoordinate.y && coordinate.x === previousCoordinate.x);
      });

      if(index === -1) {
        coordinates.push({
          y: previousCoordinate.y,
          x: previousCoordinate.x,
          hex: '#000000'
        })
      }
    });

    return coordinates;
  }
}

module.exports = Typewriter;
