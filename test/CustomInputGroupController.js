/**
 * Copyright - 2021 - Maleesha Gimshan (www.github.com/maleeshagimshan98)
 */

/**
 * custom input states controller
 */

class CustomInputGroupController {
  constructor() {
    this._states = {}
    this._data = {}
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
   */
  setState(name, state) {
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
    console.log(`setting data on ${name}, -- ${data}`)
    this._data[name] = data
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
   * reset the input's state
   * 
   * @param {String} name
   * @returns {void}
   */
  resetState(name) {
    this._throwErrorIfStateIsNotSet(name)
    console.log(`resetting ${name}`)
    this._states[name].reset()
  }

  /**
   *
   */
  validateGroup() {
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
  }
}

export default CustomInputGroupController
