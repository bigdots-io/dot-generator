var Character = require('./character');

var Fonts = {
  'system-6': require('fonts/system-6'),
  'system-16': require('fonts/system-16')
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

  renderCoordinates(options = {}) {
    this.column = options.columnOffset || 0;
    this.row = options.rowOffset || 0;

    var textCoordinates = [];

    for (let i = 0; i < this.text.length; i++) {
      var character = new Character(this.text[i], this.font),
          characterWidth = character.getWidth();

      if(character.isRenderable()) {
        var coordinates = character.renderCoordinates({
          previousCharacter: (previousText ? previousText[i] || "" : false)
        });

        if(coordinates) {
          var previousText = options.previousText;

          coordinates.forEach((point) => {
            if(point.x < characterWidth) {
              var out = {
                y: this.row + point.y,
                x: this.column + point.x
              };

              if(point.hex) {
                out.hex = point.hex;
              }

              textCoordinates.push(out);
            }
          });
        }
      }

      this.column += (characterWidth + this.options.spaceBetweenLetters);
    }

    return textCoordinates;
  }
}

module.exports = Message
