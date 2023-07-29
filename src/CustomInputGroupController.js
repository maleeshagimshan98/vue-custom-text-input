/**
 * Copyright - 2021 - Maleesha Gimshan (www.github.com/maleeshagimshan98)
 */

/**
 * custom input states controller
 */

import CustomInputState from "./CustomInputState"
import  DefaulValidator from "validator"

class CustomInputGroupController {
  constructor() {
    this._states = {}
    this._data = {}
    /**
     *
     * ATTENTION
     * INITIALIZE A VALIDATOR - ATLEAST A DEFAULT VALIDATOR
     */
    this._validator = DefaulValidator
  }

  /**
   * Check if given state name is available in the controller
   *
   * @param {String} name
   * @returns {void}
   * @throws {Error}
   */
  _throwErrorIfStateIsNotSet(name) {
    if (!this._states.hasOwnProperty(name)) {
      throw new Error(
        `the input name ${name} is not defined in CustomInputController`
      )
    }
  }

  /**
   * get the state object
   *
   * @param {String} name
   * @returns {CustomInputState}
   */
  getState(name) {
    this._throwErrorIfStateIsNotSet(name)
    return this._states[name]
  }

  /**
   * set the custom input state objects
   *
   * @param {String} name
   * @param {CustomInputState} state
   * @returns {void}
   * @throws {Error}
   */
  setState(name, state) {
    if (!name) {
      throw new Error(
        `A custom-text-input must have a name. Please provide a name via the component props`
      )
    }
    if (this._states[name]) {
      throw new Error(`An input component with name ${name} is already exists.`)
    }
    state.setValidator(this._validator)
    this._states[name] = state
  }

  /**
   * set the input values of corresponding inputs
   *
   * @param {String} name
   * @param {*} data
   * @returns {void}
   */
  setData(name, data) {
    this._throwErrorIfStateIsNotSet(name)
    this._data[name] = data
  }

  /**
   * get the values of the inputs
   * returns either a value of single input if provided the input's name
   * or the whole input group as key - value pairs
   *
   * @param {String} name
   * @returns {*}
   */
  getData(name = "") {
    if (name) {
      return this._data[name]
    } else {
      return this._data
    }
  }

  /**
   * invoke state's given property's error() function
   *
   * @param {String} name name of the property
   * @param {String} message  error message
   * @returns {void}
   */
  setStateError(name, message) {
    this._throwErrorIfStateIsNotSet(name)
    this._states[name].error(message)
  }

  /**
   * invoke state's given property's success() function
   *
   * @param {String} name name of the property
   * @param {String} message  error message
   * @returns {void}
   */
  setStateSuccess(name, message) {
    this._throwErrorIfStateIsNotSet(name)
    this._states[name].success(message)
  }

  /**
   * reset the input's state
   *
   * @param {String} name
   * @returns {void}
   */
  resetState(name) {
    this._throwErrorIfStateIsNotSet(name)
    this._states[name].reset()
  }

  /**
   *
   */
  validate() {
    /**
     * check
     *
     * isDisabled ? continue
     *
     * isReq && empty -> isError = true
     * isError
     *
     * return true if all are valid
     */

    let valid = false
    let _hasErrors = false

    for (let input in this._states) {
      if (this._states[input].realTimeValidate()) {
        continue
      }
      if (this._states[input].isDisabled()) {
        continue
      }
      if (this._states[input].isReq() && this._data[input] == "") {
        this._states[input].error(`this field is required`) //... this field is required
        valid = false
        _hasErrors = true
        continue
      }
      if (this._states[input].isError) {
        valid = false
        _hasErrors = true
        continue
      }
      if (this._states[input].validate(this._data[input])) {
        valid = true
      }
    }
    return valid && _hasErrors
  }
}

export default CustomInputGroupController
