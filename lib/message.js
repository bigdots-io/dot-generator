var Character = require('./character');

var Fonts = {
  'system-micro': require('fonts/system-micro'),
  'system-medium': require('fonts/system-medium')
};

class Message {
  constructor(text, font, options) {
    this.text = text;
    this.font = Fonts[font];
    this.options = options;
    this.column = 0;
    this.row = 0;
  }

  getWidth() {
    var width = 0;

    for (let i = 0; i < this.text.length; i++) {
      var character = new Character(this.text[i], this.font),
          characterWidth = character.getWidth();

      if(characterWidth) {
        width = width + characterWidth + this.options.spaceBetweenLetters;
      }
    }

    return width;
  }

  coordinates() {
    var textCoordinates = [];

    for (let i = 0; i < this.text.length; i++) {
      var character = new Character(this.text[i], this.font),
          characterWidth = character.getWidth();

      if(character.isRenderable()) {
        var coordinates = character.getCoordinates();

        if(coordinates) {
          // if(this.text && this.text[i]) {
          //   var previousCharacter = new Character(this.text[i], font);
          //
          //   if(previousCharacter) {
          //     var previousCoordinates = previousCharacter.getCoordinates();
          //     coordinates = this.removePreviousCharacterCoordinate(coordinates, previousCoordinates);
          //   }
          // }

          var results = this.processCharacterCoordinates(coordinates, characterWidth);
          var textCoordinates = textCoordinates.concat(results);
        }
      }

      this.column += (characterWidth + this.options.spaceBetweenLetters);
    }

    return textCoordinates;
  }

  processCharacterCoordinates(coordinates, width) {
    var validCoordinates = [];

    coordinates.forEach((point) => {
      if(point.x < width) {
        validCoordinates.push({
          y: this.row + point.y,
          x: this.column + point.x
        });
      }
    });

    return validCoordinates;
  }
}

module.exports = Message
