/**
 * Copyright - 2021 - Maleesha Gimshan (www.github.com/maleeshagimshan98)
 */

/**
 * custom input states controller
 */

import CustomInputState from "./CustomInputState"
import DefaulValidator from "validator"

class CustomTextInputGroupController {
  constructor() {
    this._currentFocusedInputIndex = 0
    this._currentFocusedInputState
    this._inputRefs = []
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
   * Checks and returns true if a CustomInputState is set for the given name
   *
   * @param {String} name input name
   * @returns {Boolean}
   */
  _hasState(name) {
    return this._states.hasOwnProperty(name)
  }

  /**
   * Check if given parameter is a undefined and throw an Error
   *
   * @param {String} methodName method name
   * @param {String} parameter parameter
   * @returns {CustomTextInputGroupController}
   * @throws {Error}
   */
  _throwErrorIfParamIsNotSet(methodName, parameter) {
    if (!parameter) {
      throw new Error(
        `CustomTextInputGroupController - ${methodName}() method requires a value for the ${parameter} parameter.`
      )
    }
    return this
  }

  /**
   * Check if given parameter is not a string and throw an Error
   *
   * @param {String} methodName method name
   * @param {String} parameter parameter
   * @return {CustomTextInputGroupController}
   * @throws {Error}
   */
  _throwErrorIfParamIsNotString(methodName, parameter) {
    if (typeof parameter !== "string") {
      throw new Error(
        `CustomTextInputGroupController - the ${methodName}() method expects the ${parameter} to be a string`
      )
    }
    return this
  }

  /**
   * Check if given state name is not available in the controller and throw an Error
   *
   * @param {String} name input name
   * @returns {CustomTextInputGroupController}
   * @throws {Error}
   */
  _throwErrorIfStateIsNotSet(name) {
    this._throwErrorIfParamIsNotSet(
      "_throwErrorIfStateIsNotSet",
      name
    )._throwErrorIfParamIsNotString("_throwErrorIfStateIsNotSet", name)
    if (!this._hasState(name)) {
      throw new Error(
        `CustomTextInputGroupController - The input name ${name} is not defined in CustomInputController`
      )
    }
    return this
  }

  /**
   * get the state object
   *
   * @param {String} name input name
   * @returns {CustomInputState}
   */
  getState(name) {
    this._throwErrorIfStateIsNotSet(name)
    return this._states[name]
  }

  /**
   * set the custom input state object and set the data object for the given input
   *
   * @param {String} name input name
   * @param {CustomInputState} state input state
   * @returns {void}
   * @throws {Error}
   */
  setState(name, state) {
    this._throwErrorIfParamIsNotSet("setState", name)._throwErrorIfParamIsNotString(
      "setState",
      name
    )
    if (this._states[name]) {
      throw new Error(
        `CustomTextInputGroupController - An input component with name ${name} is already exists.`
      )
    }
    state.setValidator(this._validator)
    this._states[name] = state
    this._data[name] = ""
  }

  /**
   * set the input values of corresponding inputs
   *
   * @param {String} name input name
   * @param {*} data input data
   * @returns {void}
   */
  setData(name, data) {
    this._throwErrorIfStateIsNotSet(name)
    this._data[name] = data
  }

  /**
   * get the values of the all inputs
   *
   * @returns {*} input data
   */
  getAllData() {
    return this._data
  }

  /**
   * get the value of the input by input name
   * returns either a value of single input if provided the input's name
   * or the whole input group as key - value pairs
   *
   * @param {String} name input name
   * @returns {*} value of the input element
   */
  getValue(name = "") {
    if (!name) {
      throw new TypeError(
        `CustomTextInputGroupController - getValue() expects the parameter to have a value`
      )
    }
    return this._data[name]
  }

  /**
   * Get a component instance by name
   *
   * @param {String} name
   * @returns {Object|void}
   */
  _getInputRefInstance(name) {
    for (let ref of this._inputRefs) {
      if (name == ref.name) {
        return ref.component
      }
    }
  }

  /**
   * Get a component instance by name
   *
   * @param {String} name
   * @returns {Object}
   * @throws {Error}
   */
  getInputRefInstance(name) {
    //... check if the component name is set before returning the component
    let inputRef = this._getInputRefInstance(name)
    if (!inputRef) {
      throw new Error(`A component with the name of ${name} is not found`)
    }
    return inputRef
  }

  /**
   * Add an input element ref
   *
   * @param {String} name
   * @param {*} component
   * @returns {}
   */
  setInputRef(name, component) {
    this._throwErrorIfParamIsNotSet("setInputRef", name)._throwErrorIfParamIsNotString(
      "setInputRef",
      name
    )
    if (this._getInputRefInstance(name)) {
      //... CHECK
      //... input ref is already set
      return
    }
    this._inputRefs.push({ name: name, component })
  }

  /**
   * Set focused value in the CustomInputState object
   *
   * @param {CustomInputState} state custom input state
   * @param {Boolean} focusVal
   * @returns {void}
   */
  _setFocusInCustomInputState(state, focusVal) {
    state.setFocused(focusVal)
  }

  /**
   * Set the index of current input ref to provided value and switches the focused property in the CustomInputState
   *
   * @param {String} name input name
   * @returns {void}
   */
  _updateCurrentInputState(name) {
    //... check if the component name is set before returning the component - move the checking to public calling function
    if (this._currentFocusedInputState) {
      this._setFocusInCustomInputState(this._currentFocusedInputState, false)
    }
    let nextState = this.getState(name)
    this._setFocusInCustomInputState(nextState, true)
    this._currentFocusedInputState = nextState
  }

  /**
   * Set the index of current input ref to provided value and switches the focused property in the CustomInputState
   *
   * @param {Number} index
   * @returns {void}
   */
  _updateCurrentInputRefIndex(index) {
    this._currentFocusedInputIndex = index
  }

  /**
   * focus the next input element
   *
   * @returns {void}
   */
  focusNext() {
    if (this._inputRefs.length > this._currentFocusedInputIndex + 1) {
      this._updateCurrentInputRefIndex(this._currentFocusedInputIndex + 1)
      this._inputRefs[this._currentFocusedInputIndex].component.focus()
      let nextStateName = this._inputRefs[this._currentFocusedInputIndex].name
      this._updateCurrentInputState(nextStateName)
      return
    }
    throw new Error(``)
  }

  /**
   * focus a provided input element by a name
   *
   * @param {String} name input name
   * @returns {void}
   * @throws {Error}
   */
  focusByName(name) {
    this._throwErrorIfParamIsNotSet("focusByName", name)._throwErrorIfParamIsNotString(
      "focusByName",
      name
    )

    for (let i = 0; i < this._inputRefs.length; i++) {
      if (this._inputRefs[i].name == name) {
        this._inputRefs[i].component.focus()
        this._updateCurrentInputState(name)
        this._updateCurrentInputRefIndex(i)
        return
      }
    }
    //... Error - component name not found
    throw new Error(`A component with the name of ${name} is not found`)
  }

  /**
   * Set the focus property in the state to false by component name
   *
   * @returns {void}
   * @throws {Error}
   */
  setCurrentInputStateFocusOut() {
    this._setFocusInCustomInputState(this._currentFocusedInputState, false)
  }

  /**
   * invoke state's given property's error() function
   *
   * @param {String} name name of the property
   * @param {String} message  error message
   * @returns {void}
   */
  setStateError(name, message) {
    this._throwErrorIfStateIsNotSet(name)._throwErrorIfParamIsNotString(name)
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
   * Reset all the state in the controller
   *
   * @return {void}
   */
  resetAllStates() {
    for (let state in this._states) {
      this._states[state].reset()
    }
  }

  /**
   * Reset all the data of the inputs in the controller
   *
   * @return {void}
   */
  resetAllData() {
    for (let data in this._data) {
      this._data[data] = ''
    }
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

export default CustomTextInputGroupController
