"use strict";

var Textbox = require('./lib/textbox');
var getPixels = require('get-pixels');

class DotGenerator {
  constructor() {
    // Nothing...
  }

  text(options) {
    var textbox = new Textbox({
      font: options.font,
      hex: options.color,
      alignment: options.alignment,
      width: options.width,
      height: options.height,
      startingColumn: options.startingColumn,
      startingRow: options.startingRow
    });

    return textbox.write(options.text);
  }

  image(url, callbacks) {
    getPixels(url, (err, pixels) => {
      if(err) {
        console.log(err);
        callbacks.onError(err);
      }

      var imageWidth = pixels.shape[0],
          imageHeight = pixels.shape[1];

      var dots = [];

      for(let x = 0; x < imageWidth; x++) {
        for(let y = 0; y < imageHeight; y++) {
          var r = pixels.get(x, y, 0),
              g = pixels.get(x, y, 1),
              b = pixels.get(x, y, 2),
              a = pixels.get(x, y, 3);

          var hex = rgb2hex(`rgba(${r}, ${g}, ${b}, ${a})`)

          dots.push({ x: x, y: y, hex: hex });
        }
      }

      callbacks.onSuccess(dots);
    });
  }
}

function rgb2hex(rgb) {
  rgb = rgb.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);
  return (rgb && rgb.length === 4) ? "#" + ("0" + parseInt(rgb[1],10).toString(16)).slice(-2) + ("0" + parseInt(rgb[2],10).toString(16)).slice(-2) + ("0" + parseInt(rgb[3],10).toString(16)).slice(-2) : '';
}

module.exports = DotGenerator;
