var Word = require('./word');

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
    if(this.options.wrap === 'no-wrap') {
      return this.options.width;
    }

    var width = 0,
        words = this.text.split(' ');

    words.forEach((word) => {
      var word = new Word(word, this.font, {
        spaceBetweenLetters: this.options.spaceBetweenLetters
      });

      width += word.getWidth();
    });

    return width;
  }

  renderCoordinates(options = {}) {
    this.column = options.columnOffset || 0;
    this.row = options.rowOffset || 0;

    var line = 0;
    var cursorColumn = 0;
    var wordHeight; // Will always be the same

    var textCoordinates = [];

    this.text.split(' ').forEach((word, i) => {
      var word = new Word(word, this.font, {
            spaceBetweenLetters: this.options.spaceBetweenLetters
          }),
          wordWidth = word.getWidth();

      wordHeight = word.getHeight();

      var spaceWidth = this.font.characters[" "].width;
      if(i !== 0) {
        cursorColumn += spaceWidth;
      }

      if(cursorColumn + wordWidth > this.options.width) {
        line += 1;
        cursorColumn = 0;
      }

      word.renderCoordinates().forEach((coordinate) => {
        if(line !== 0) {
          var offsetY = (line * wordHeight) + this.options.spaceBetweenLines;
        }

        textCoordinates.push({
          x: coordinate.x + cursorColumn,
          y: coordinate.y + (offsetY || 0),
          hex: this.options.hex
        });
      });

      cursorColumn += wordWidth;
    });

    return {
      width: this.options.width,
      height: (line || 1) * wordHeight,
      dots: textCoordinates
    };
  }
}

module.exports = Message
