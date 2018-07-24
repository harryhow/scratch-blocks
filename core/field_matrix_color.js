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
Blockly.FieldMatrixColour.DEFAULT_COLOR = '#605165'
Blockly.FieldMatrixColour.ROWS = 7
Blockly.FieldMatrixColour.COLUMNS = 7

/**
 * Mouse cursor style when over the hotspot that initiates the editor.
 */
Blockly.FieldMatrixColour.prototype.CURSOR = 'default'

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

  this.setValue(this.defaultColors())
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
 * Helper method for creating default data.
 * @return {Array.<Object>} colors Array of colors
 */
Blockly.FieldMatrixColour.prototype.defaultColors = function () {
  const colorArray = [
    {
      id: -1,
      color: 'transparent',
      corner: true,
      xRange: [66, 141.5],
      yRange: [224.5, 300]
    },
    {
      color: Blockly.FieldMatrixColour.DEFAULT_COLOR,
      byte: 0,
      id: 1,
      frameId: 11,
      corner: false,
      xRange: [149.5, 224.5],
      yRange: [224.5, 299.5]
    },
    {
      color: Blockly.FieldMatrixColour.DEFAULT_COLOR,
      byte: 0,
      id: 2,
      frameId: 18,
      corner: false,
      xRange: [232.5, 308],
      yRange: [224.5, 300]
    },
    {
      color: Blockly.FieldMatrixColour.DEFAULT_COLOR,
      byte: 0,
      id: 3,
      frameId: 25,
      corner: false,
      xRange: [316, 391],
      yRange: [224.5, 299.5]
    },
    {
      color: Blockly.FieldMatrixColour.DEFAULT_COLOR,
      byte: 0,
      id: 4,
      frameId: 32,
      corner: false,
      xRange: [399, 474.5],
      yRange: [224.5, 300]
    },
    {
      color: Blockly.FieldMatrixColour.DEFAULT_COLOR,
      byte: 0,
      id: 5,
      frameId: 39,
      xRange: [482.5, 557.5],
      yRange: [224.5, 299.5]
    },
    {
      id: -4,
      color: 'transparent',
      corner: true,
      xRange: [565.5, 641],
      yRange: [224.5, 300]
    },
    {
      color: Blockly.FieldMatrixColour.DEFAULT_COLOR,
      byte: 0,
      id: 6,
      frameId: 4,
      corner: false,
      xRange: [66, 141.5],
      yRange: [308, 383.5]
    },
    {
      color: Blockly.FieldMatrixColour.DEFAULT_COLOR,
      byte: 0,
      id: 7,
      frameId: 10,
      corner: false,
      xRange: [149.5, 224.5],
      yRange: [308, 383]
    },
    {
      color: Blockly.FieldMatrixColour.DEFAULT_COLOR,
      byte: 0,
      id: 8,
      frameId: 17,
      corner: false,
      xRange: [232.5, 308],
      yRange: [308, 383.5]
    },
    {
      color: Blockly.FieldMatrixColour.DEFAULT_COLOR,
      byte: 0,
      id: 9,
      frameId: 24,
      corner: false,
      xRange: [316, 391],
      yRange: [308, 383]
    },
    {
      color: Blockly.FieldMatrixColour.DEFAULT_COLOR,
      byte: 0,
      id: 10,
      frameId: 31,
      corner: false,
      xRange: [399, 474.5],
      yRange: [308, 383.5]
    },
    {
      color: Blockly.FieldMatrixColour.DEFAULT_COLOR,
      byte: 0,
      id: 11,
      frameId: 38,
      corner: false,
      xRange: [482.5, 557.5],
      yRange: [308, 383]
    },
    {
      color: Blockly.FieldMatrixColour.DEFAULT_COLOR,
      byte: 0,
      id: 12,
      frameId: 44,
      corner: false,
      xRange: [565.5, 641],
      yRange: [308, 383.5]
    },
    {
      color: Blockly.FieldMatrixColour.DEFAULT_COLOR,
      byte: 0,
      id: 13,
      frameId: 3,
      corner: false,
      xRange: [66, 141.5],
      yRange: [391, 466.5]
    },
    {
      color: Blockly.FieldMatrixColour.DEFAULT_COLOR,
      byte: 0,
      id: 14,
      frameId: 9,
      corner: false,
      xRange: [149.5, 224.5],
      yRange: [391, 466]
    },
    {
      color: Blockly.FieldMatrixColour.DEFAULT_COLOR,
      byte: 0,
      id: 15,
      frameId: 16,
      corner: false,
      xRange: [232.5, 308],
      yRange: [391, 466.5]
    },
    {
      color: Blockly.FieldMatrixColour.DEFAULT_COLOR,
      byte: 0,
      id: 16,
      frameId: 23,
      corner: false,
      xRange: [316, 391],
      yRange: [391, 466]
    },
    {
      color: Blockly.FieldMatrixColour.DEFAULT_COLOR,
      byte: 0,
      id: 17,
      frameId: 30,
      corner: false,
      xRange: [399, 474.5],
      yRange: [391, 466.5]
    },
    {
      color: Blockly.FieldMatrixColour.DEFAULT_COLOR,
      byte: 0,
      id: 18,
      frameId: 37,
      corner: false,
      xRange: [482.5, 557.5],
      yRange: [391, 466]
    },
    {
      color: Blockly.FieldMatrixColour.DEFAULT_COLOR,
      byte: 0,
      id: 19,
      frameId: 43,
      corner: false,
      xRange: [565.5, 641],
      yRange: [391, 466.5]
    },
    {
      color: Blockly.FieldMatrixColour.DEFAULT_COLOR,
      byte: 0,
      id: 20,
      frameId: 2,
      corner: false,
      xRange: [66, 141.5],
      yRange: [474.5, 550]
    },
    {
      color: Blockly.FieldMatrixColour.DEFAULT_COLOR,
      byte: 0,
      id: 21,
      frameId: 8,
      corner: false,
      xRange: [149.5, 224.5],
      yRange: [474.5, 549.5]
    },
    {
      color: Blockly.FieldMatrixColour.DEFAULT_COLOR,
      byte: 0,
      id: 22,
      frameId: 15,
      corner: false,
      xRange: [232.5, 308],
      yRange: [474.5, 550]
    },
    {
      color: Blockly.FieldMatrixColour.DEFAULT_COLOR,
      byte: 0,
      id: 23,
      frameId: 22,
      corner: false,
      xRange: [316, 391],
      yRange: [474.5, 549.5]
    },
    {
      color: Blockly.FieldMatrixColour.DEFAULT_COLOR,
      byte: 0,
      id: 24,
      frameId: 29,
      corner: false,
      xRange: [399, 474.5],
      yRange: [474.5, 550]
    },
    {
      color: Blockly.FieldMatrixColour.DEFAULT_COLOR,
      byte: 0,
      id: 25,
      frameId: 36,
      corner: false,
      xRange: [482.5, 557.5],
      yRange: [474.5, 549.5]
    },
    {
      color: Blockly.FieldMatrixColour.DEFAULT_COLOR,
      byte: 0,
      id: 26,
      frameId: 42,
      corner: false,
      xRange: [565.5, 641],
      yRange: [474.5, 550]
    },
    {
      color: Blockly.FieldMatrixColour.DEFAULT_COLOR,
      byte: 0,
      id: 27,
      frameId: 1,
      corner: false,
      xRange: [66, 141.5],
      yRange: [557.5, 633]
    },
    {
      color: Blockly.FieldMatrixColour.DEFAULT_COLOR,
      byte: 0,
      id: 28,
      frameId: 7,
      corner: false,
      xRange: [149.5, 224.5],
      yRange: [557.5, 632.5]
    },
    {
      color: Blockly.FieldMatrixColour.DEFAULT_COLOR,
      byte: 0,
      id: 29,
      frameId: 14,
      corner: false,
      xRange: [232.5, 308],
      yRange: [557.5, 633]
    },
    {
      color: Blockly.FieldMatrixColour.DEFAULT_COLOR,
      byte: 0,
      id: 30,
      frameId: 21,
      corner: false,
      xRange: [316, 391],
      yRange: [557.5, 632.5]
    },
    {
      color: Blockly.FieldMatrixColour.DEFAULT_COLOR,
      byte: 0,
      id: 31,
      frameId: 28,
      corner: false,
      xRange: [399, 474.5],
      yRange: [557.5, 633]
    },
    {
      color: Blockly.FieldMatrixColour.DEFAULT_COLOR,
      byte: 0,
      id: 32,
      frameId: 35,
      corner: false,
      xRange: [482.5, 557.5],
      yRange: [557.5, 632.5]
    },
    {
      color: Blockly.FieldMatrixColour.DEFAULT_COLOR,
      byte: 0,
      id: 33,
      frameId: 41,
      corner: false,
      xRange: [565.5, 641],
      yRange: [557.5, 633]
    },
    {
      color: Blockly.FieldMatrixColour.DEFAULT_COLOR,
      byte: 0,
      id: 34,
      frameId: 0,
      corner: false,
      xRange: [66, 141.5],
      yRange: [641, 716.5]
    },
    {
      color: Blockly.FieldMatrixColour.DEFAULT_COLOR,
      byte: 0,
      id: 35,
      frameId: 6,
      corner: false,
      xRange: [149.5, 224.5],
      yRange: [641, 716]
    },
    {
      color: Blockly.FieldMatrixColour.DEFAULT_COLOR,
      byte: 0,
      id: 36,
      frameId: 13,
      corner: false,
      xRange: [232.5, 308],
      yRange: [641, 716.5]
    },
    {
      color: Blockly.FieldMatrixColour.DEFAULT_COLOR,
      byte: 0,
      id: 37,
      frameId: 20,
      corner: false,
      xRange: [316, 391],
      yRange: [641, 716]
    },
    {
      color: Blockly.FieldMatrixColour.DEFAULT_COLOR,
      byte: 0,
      id: 38,
      frameId: 27,
      corner: false,
      xRange: [399, 474.5],
      yRange: [641, 716.5]
    },
    {
      color: Blockly.FieldMatrixColour.DEFAULT_COLOR,
      byte: 0,
      id: 39,
      frameId: 34,
      corner: false,
      xRange: [482.5, 557.5],
      yRange: [641, 716]
    },
    {
      color: Blockly.FieldMatrixColour.DEFAULT_COLOR,
      byte: 0,
      id: 40,
      frameId: 40,
      xRange: [565.5, 641],
      yRange: [641, 716.5]
    },
    {
      id: -39,
      color: 'transparent',
      corner: true,
      xRange: [66, 141.5],
      yRange: [724, 799.5]
    },
    {
      color: Blockly.FieldMatrixColour.DEFAULT_COLOR,
      byte: 0,
      id: 41,
      frameId: 5,
      corner: false,
      xRange: [149.5, 224.5],
      yRange: [724, 799]
    },
    {
      color: Blockly.FieldMatrixColour.DEFAULT_COLOR,
      byte: 0,
      id: 42,
      frameId: 12,
      corner: false,
      xRange: [232.5, 308],
      yRange: [724, 799.5]
    },
    {
      color: Blockly.FieldMatrixColour.DEFAULT_COLOR,
      byte: 0,
      id: 43,
      frameId: 19,
      corner: false,
      xRange: [316, 391],
      yRange: [724, 799]
    },
    {
      color: Blockly.FieldMatrixColour.DEFAULT_COLOR,
      byte: 0,
      id: 44,
      frameId: 26,
      corner: false,
      xRange: [399, 474.5],
      yRange: [724, 799.5]
    },
    {
      color: Blockly.FieldMatrixColour.DEFAULT_COLOR,
      byte: 0,
      id: 45,
      frameId: 33,
      xRange: [482.5, 557.5],
      yRange: [724, 799]
    },
    {
      id: -44,
      color: 'transparent',
      corner: true,
      xRange: [565.5, 641],
      yRange: [724, 799.5]
    }
  ]

  return colorArray
}
