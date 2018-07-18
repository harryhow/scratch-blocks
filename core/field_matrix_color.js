'use strict'

goog.provide('Blockly.FieldMatrixColour')

goog.require('Blockly.Field')
goog.require('goog.dom')
goog.require('goog.events')
goog.require('goog.style')
goog.require('goog.ui.ColorPicker')

/**
 * Class for a matrix field
 * @param {Array.<Object>} colors The initial colors in '#rrggbb' format.
 * @extends {Blockly.Field}
 * @constructor
 */
Blockly.FieldMatrixColour = function (colors) {
  Blockly.FieldMatrixColour.superClass_.constructor.call(this, colors)
  this.addArgType('matrixColor')
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
Blockly.FieldMatrixColour.DEFAULT_COLOR = '#444444'
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

  let colorArray = []
  for (let i = 0; i <= 48; i++) {
    let temp = Blockly.FieldMatrixColour.DEFAULT_COLOR
    if (i === 0 || i === 6 || i === 42 || i === 48) {
      temp = ''
    }
    colorArray = [...colorArray, { color: temp }]
  }

  this.setValue(colorArray)
  this.sourceBlock_.getSvgRoot().appendChild(this.fieldGroup_)
  this.mouseUpWrapper_ = Blockly.bindEventWithChecks_(
    this.fieldGroup_,
    'mouseup',
    this,
    this.onMouseUp_
  )
  Blockly.bindEventWithChecks_(
    this.fieldGroup_,
    'mousedown',
    this,
    this.onMouseDown_
  )
  this.render_()
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
 * Mouse cursor style when over the hotspot that initiates the editor.
 */
Blockly.FieldMatrixColour.prototype.CURSOR = 'default'
