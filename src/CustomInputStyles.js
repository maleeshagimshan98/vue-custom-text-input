/**
 * Copyright - 2021 - Maleesha Gimshan (www.github.com/maleeshagimshan98)
 */

class CustomInputStyles {
  /**
   *
   * @param {Object} input
   * @param {Object} label
   * @param {Object} message
   */
  constructor({ input, label, message }) {
    this.input = {
      primary: [],
      focused: [],
      error: [],
      success: [],
    }
    this.label = {
      primary: [],
      focused: [],
      error: [],
      success: [],
    }
    this.message = {
      primary: [],
      focused: [],
      error: [],
      success: [],
    }
    this._init({ input, label, message })
  }

  /**
   * Check if required parameters are in proper form and
   * append the parameters into an array (if a string passed)
   *
   * @param {*} style
   * @returns {Array | String}
   * @throws {Error}
   */
  _checkParamTypesAndPrepare(style) {
    if (Array.isArray(style)) {
      return style
    }
    if (typeof style == "string") {
      return [style]
    } else {
      throw new Error("Type of input style is not supported")
    }
  }

  /**
   * initialize styles
   *
   * @param {Object} styles
   * @returns {void}
   */
  _init(styles) {
    ["input", "label", "message"].forEach((element) => {
      for (let prop in styles[element]) {
        if (!styles[element][prop]) {
          continue
        }
        this[element][prop] = this._checkParamTypesAndPrepare(styles[element][prop])
      }
    })
  }
}

export default CustomInputStyles
