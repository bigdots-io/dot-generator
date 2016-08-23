"use strict";

var express = require('express');
var app = express();
var mustacheExpress = require('mustache-express');
var bodyParser = require('body-parser');
var jsonfile = require('jsonfile');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.engine('html', mustacheExpress());
app.set('view engine', 'html');

app.get('/:font/:letter', function (req, res) {
  var font = req.params.font,
      letter = req.params.letter;

  if(req.xhr) {
    var characters = require(`../fonts/${font}/characters`);
    res.json(characters[letter] || []);
  } else {
    var matrix = [];
    for(let y = 0; y < 6; y++) {
      matrix.push([]);
      for(let x = 0; x < 4; x++) {
        matrix[y].push({y: y, x: x});
      }
    }

    res.render('index', {
      matrix: matrix
    });
  }
});

app.post('/:font/:letter', function (req, res) {
  var font = req.params.font,
      letter = req.params.letter;

  var characters = require(`../fonts/${font}/characters`);
  characters[letter] = req.body.coordinates;
  jsonfile.writeFile(`../fonts/${font}/characters.json`, characters, {spaces: 2}, function (err) {
    // something?
  });
  res.status(201).end();
})

app.listen(3000)
