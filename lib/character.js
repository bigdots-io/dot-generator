class Character {
  constructor(character, font) {
    this.character = character;
    this.font = font;
  }

  isRenderable() {
    return this.font.characters[this.character]
  }

  getWidth() {
    if(this.isRenderable()) {
      return (this.font.characters[this.character].width || this.font.width)
    } else {
      return false;
    }
  }

  renderCoordinates(options = {}) {
    var coordinates = [];

    if(this.isRenderable()) {
       coordinates = this.font.characters[this.character].coordinates;
    } else {
      return false;
    }

    var previousCharacter = options.previousCharacter;

    if(previousCharacter) {
      var previousCoordinates = this.font.characters[previousCharacter].coordinates;

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
    }

    return coordinates;
  }
}

module.exports = Character;
