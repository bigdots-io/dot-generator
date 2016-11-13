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
        callbacks.onError(err);
      }

      var frames = pixels.shape[0],
          imageWidth = pixels.shape[1],
          imageHeight = pixels.shape[2];

      var out = [];

      for(let f = 0; f < frames; f++) {
        var frame = [];
        for(let x = 0; x < imageWidth; x++) {
          for(let y = 0; y < imageHeight; y++) {
            var r = pixels.get(f, x, y, 0),
                g = pixels.get(f, x, y, 1),
                b = pixels.get(f, x, y, 2),
                a = pixels.get(f, x, y, 3);

            var hex = rgb2hex(`rgba(${r}, ${g}, ${b}, ${a})`)

            frame.push({ x: x, y: y, hex: hex });
          }
        }

        out.push(frame);
      }

      callbacks.onSuccess({
        data: out
      });
    });
  }
}

function rgb2hex(rgb) {
  rgb = rgb.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);
  return (rgb && rgb.length === 4) ? "#" + ("0" + parseInt(rgb[1],10).toString(16)).slice(-2) + ("0" + parseInt(rgb[2],10).toString(16)).slice(-2) + ("0" + parseInt(rgb[3],10).toString(16)).slice(-2) : '';
}

module.exports = DotGenerator;
