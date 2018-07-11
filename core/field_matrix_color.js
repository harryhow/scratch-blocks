'use strict'

goog.provide('Blockly.FieldMatrixColour')

goog.require('Blockly.Field')
goog.require('goog.dom')
goog.require('goog.events')
goog.require('goog.style')
goog.require('goog.ui.ColorPicker')

/**
 * Class for a matrix field
 * @param {Array.<string>} colors The initial colors in '#rrggbb' format.
 * @extends {Blockly.Field}
 * @constructor
 */
Blockly.FieldMatrixColour = function (colors) {
  Blockly.FieldMatrixColour.superClass_.constructor.call(this, colors)
  this.setText(Blockly.Field.NBSP + Blockly.Field.NBSP + Blockly.Field.NBSP)

  if (colors) {
    this.setValue(colors)
  }
}
goog.inherits(Blockly.FieldMatrixColour, Blockly.Field)

Blockly.FieldMatrixColour.MATRIX_WIDTH = 44
Blockly.FieldMatrixColour.MATRIX_HEIGHT = 44
Blockly.FieldMatrixColour.BLOCK_HEIGHT = 52
Blockly.FieldMatrixColour.PIXEL_WIDTH = 5
Blockly.FieldMatrixColour.PIXEL_HEIGHT = 5
Blockly.FieldMatrixColour.PIXEL_PADDING = 1
Blockly.FieldMatrixColour.TOP_PADDING = 4
Blockly.FieldMatrixColour.BG_COLOR = '#000000'
Blockly.FieldMatrixColour.ROWS = 7
Blockly.FieldMatrixColour.COLUMNS = 7

/**
 * Install this field on a block.
 */
Blockly.FieldMatrixColour.prototype.init = function () {
  if (this.fieldGroup_) {
    // Field has already been initialized once.
    return
  }
  // Build the DOM.
  this.fieldGroup_ = Blockly.utils.createSvgElement('g', {}, null)

  if (!this.visible_) {
    this.fieldGroup_.style.display = 'none'
  }

  this.createSvgMatrix([])
  this.sourceBlock_.getSvgRoot().appendChild(this.fieldGroup_)
}

/**
 * Draws the matrix with the correct width.
 * @private
 */
Blockly.FieldMatrixColour.prototype.render_ = function () {
  if (!this.visible_) {
    this.size_.width = 0
    return
  }

  this.size_.width = Blockly.FieldMatrixColour.MATRIX_WIDTH
  this.size_.height = Blockly.FieldMatrixColour.BLOCK_HEIGHT
}

/**
 * Return the current colour.
 * @return {Array.<string>} Array of current colors in '#rrggbb' format.
 */
Blockly.FieldMatrixColour.prototype.getValue = function () {
  return this.colors_
}

/**
 * Set the colors.
 * @param {Array.<string>} colour The new colors array in '#rrggbb' format.
 */
Blockly.FieldMatrixColour.prototype.setValue = function (colors) {
  this.colors_ = colors
  this.createSvgMatrix(this.colors_)
}

/**
 * Helper method for creating SVG elements.
 * @param {Array.<string>} colors Array of colors
 */
Blockly.FieldMatrixColour.prototype.createSvgMatrix = function (colors) {
  this.bg = Blockly.utils.createSvgElement(
    'rect',
    {
      x: 0,
      y: 4,
      height: Blockly.FieldMatrixColour.MATRIX_HEIGHT,
      width: Blockly.FieldMatrixColour.MATRIX_WIDTH
    },
    this.fieldGroup_
  )
  this.bg.setAttribute('fill', Blockly.FieldMatrixColour.BG_COLOR)

  let loopCount = 0

  for (let i = 0; i <= Blockly.FieldMatrixColour.ROWS - 1; i++) {
    for (let j = 0; j <= Blockly.FieldMatrixColour.COLUMNS - 1; j++) {
      const loopValues = this.matrixXValue(i, j)
      i = loopValues.row
      j = loopValues.column
      if (i === 7 && j === 7) break

      this.pixel = Blockly.utils.createSvgElement(
        'rect',
        {
          x: Blockly.FieldMatrixColour.PIXEL_WIDTH * j +
            Blockly.FieldMatrixColour.PIXEL_PADDING * (j + 1) +
            Blockly.FieldMatrixColour.PIXEL_PADDING,
          y: Blockly.FieldMatrixColour.PIXEL_WIDTH * i +
            Blockly.FieldMatrixColour.PIXEL_PADDING * (i + 1) +
            Blockly.FieldMatrixColour.PIXEL_PADDING +
            Blockly.FieldMatrixColour.TOP_PADDING,
          height: Blockly.FieldMatrixColour.PIXEL_HEIGHT,
          width: Blockly.FieldMatrixColour.PIXEL_WIDTH
        },
        this.fieldGroup_
      )

      // TODO: Populate from colors array
      this.pixel.setAttribute('fill', '#444444')
      loopCount++
    }
  }
}

Blockly.FieldMatrixColour.prototype.matrixXValue = function (row, column) {
  let rowValue = row
  let columnValue = column

  if (row === 0 && column === 0) {
    columnValue = columnValue + 1
  }

  if (row === 0 && column === 6) {
    rowValue = rowValue + 1
    columnValue = 0
  }

  if (row === 6 && column === 0) {
    columnValue = columnValue + 1
  }

  if (row === 6 && column === 6) {
    rowValue = rowValue + 1
    columnValue = 7
  }
  return { row: rowValue, column: columnValue }
}
