'use strict';

class Robot {
  constructor() {
    this.directions = [ 'north', 'east', 'south', 'west' ]
  }

  orient(direction) {
    if (this.directions.includes(direction)) {
      this.bearing = direction
    } else {
      throw new Error("Invalid Robot Bearing")
    }
  }

  turnRight() {
    let newDirectionIndex = (this.directions.indexOf(this.bearing) + 1) % 4
    this.bearing = this.directions[newDirectionIndex]
  }

  turnLeft() {
    let newDirectionIndex = this.directions.indexOf(this.bearing) - 1
    if (newDirectionIndex < 0) {
      newDirectionIndex += 4
      this.bearing = this.directions[newDirectionIndex]
    } else {
      this.bearing = this.directions[newDirectionIndex]
    }
  }

  at(x, y) {
    this.coordinates = [x, y]
  }

  advance() {
    let x = this.coordinates[0]
    let y = this.coordinates[1]

    switch (this.bearing) {
      case 'north':
        y += 1
        break;
      case 'east':
        x += 1
        break;
      case 'south':
        y -= 1
        break;
      case 'west':
        x -= 1
        break;
    }

    this.at(x, y)
  }

  instructions(instructions) {
    let instructionMap = {"L": "turnLeft", "R": "turnRight", "A": "advance"}

    return instructions.split('').map((instruction) => instructionMap[instruction])
  }

  place(placeObj) {
    this.at(placeObj.x, placeObj.y)
    this.orient(placeObj.direction)
  }

  evaluate(instructionSeries) {
    let instructions = this.instructions(instructionSeries)
    instructions.forEach(instruction => this[instruction]())
  }
}
