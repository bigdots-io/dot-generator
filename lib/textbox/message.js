var Line = require('./line');

var Fonts = {
  'system-6': require('fonts/system-6'),
  'system-16': require('fonts/system-16')
};

class Message {
  constructor(text, font, options) {
    this.text = text;
    this.font = Fonts[font];
    this.options = options;
  }

  render() {
    var lines = [],
        dots = [],
        currentLine = this.newLine();

    this.text.split(' ').forEach((word, i) => {
      var projectedWidth = currentLine.calculateProjectedWidth(word);

      if(projectedWidth > this.options.width) {
        lines.push(currentLine);
        currentLine = this.newLine();
      }

      currentLine.append(word);
    });

    lines.push(currentLine);

    lines.forEach((line, i) => {
      var results = line.render();

      if(i !== 0) {
        var offsetY = (i * this.font.height) + this.options.spaceBetweenLines;
      }

      results.dots.map((dot) => {
        dots.push({
          x: dot.x,
          y: dot.y + (offsetY || 0)
        });
      });
    });

    return {
      width: this.options.width,
      height: (this.font.height + this.options.spaceBetweenLines) * lines.length,
      dots: dots
    };
  }

  newLine() {
    return new Line(this.font, {
      spaceBetweenLetters: this.options.spaceBetweenLetters,
      alignment: this.options.alignment,
      maxWidth: this.options.width
    });
  }
}

module.exports = Message
