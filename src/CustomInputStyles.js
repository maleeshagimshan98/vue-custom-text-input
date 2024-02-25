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
      base: [],
      primary: [],
      focused: [],
      error: [],
      success: [],
    }
    this.label = {
      base: [],
      primary: [],
      focused: [],
      error: [],
      success: [],
    }
    this.message = {
      base: [],
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
    if (typeof style === "string") {
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
    let styleStates = ["base", "primary", "focused", "error", "success"]

    ;["input", "label", "message"].forEach((element) => {
      if (!styles[element]) {
        return
      }
      styleStates.forEach((state) => {
        if (!styles[element][state]) {
          return
        }
        this[element][state] = this._checkParamTypesAndPrepare(styles[element][state])
      })
    })
  }
}

export default CustomInputStyles
