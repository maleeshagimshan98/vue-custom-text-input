/**
 * Copyright - 2021 - Maleesha Gimshan (www.github.com/maleeshagimshan98)
 */

/**
 * State class for custom input element
 */
class CustomInputState {
  /**
   * constructor
   *
   * @returns self
   */
  constructor({
    inputType,
    label,
    placeholder,
    realTimeValidate,
    disabled,
    validateRule,
    initErrorMsg,
    initSuccessMsg,
    isOpt,
    isReq,
  } = {}) {
    //...
    //validateRule : ['email | length > 8', 'ERROR_MESSSAGE', 'SUCCESS_MESSAGE'], etc. - refer to ''
    //isError : 'Error_Message_Here', - initialise with an error message
    //isSuccess : 'Success_Message_Here' - initialise with an error message

    this._inputType = inputType ?? "text"
    this._label = label ?? ""
    this._placeholder = placeholder ?? ""
    this._realTimeValidate = realTimeValidate ?? true
    this._validateRule = validateRule ?? null
    this._disabled = disabled ?? false
    this._isValid = true
    this._isSuccess = false
    this._isError = false
    this._isOpt = isOpt ?? false
    this._isReq = isReq ?? false
    this._validator
    this._message = ""

    initErrorMsg
      ? this.error(initErrorMsg)
      : initSuccessMsg
      ? this.success(initSuccessMsg)
      : false
  }

  /**
   * get the input label
   *
   * @returns {string}
   */
  get label() {
    return this._label
  }

  /**
   * set the input's label
   *
   * @param {string} label
   * @returns {void}
   */
  set label(label) {
    this._label = label
  }

  /**
   * Getter for the `placeholder` property.
   *
   * @returns {string} The current value of the `placeholder` property.
   */
  get placeholder() {
    return this._placeholder
  }

  /**
   * Setter for the `placeholder` property.
   *
   * @param {string} placeholder - The new value for the `placeholder` property.
   */
  set placeholder(placeholder) {
    this._placeholder = placeholder
  }

  /**
   * Getter for the `inputType` property.
   *
   * @returns {string} The current value of the `inputType` property.
   */
  get inputType() {
    return this._inputType
  }

  /**
   * Setter for the `inputType` property.
   *
   * @param {string} inputType - The new value for the `inputType` property.
   */
  set inputType(inputType) {
    this._inputType = inputType
  }

  /**
   * set a instance of a validator class
   *
   * @param {*} validator
   * @returns {void}
   */
  setValidator(validator) {
    this._validator = validator
  }

  /**
   * returns this.isError
   *
   * @returns {Boolean}
   */
  isError() {
    return this._isError
  }

  /**
   * returns this.isSuccess
   *
   * @returns {Boolean}
   */
  isSuccess() {
    return this._isSuccess
  }

  /**
   * returns true if the input is disabled
   *
   * @returns {Boolean}
   */
  isDisabled() {
    return this._disabled
  }

  /**
   * returns true if this input is optional
   *
   * @returns {Boolean}
   */
  isOpt() {
    return this._isOpt
  }

  /**
   * returns true if this input is required
   *
   * @returns {Boolean}
   */
  isReq() {
    return this._isReq
  }

  /**
   * set state to error
   *
   * @param {string} message error message
   * @returns void
   */
  error(message) {
    this._isError = true
    this._isSuccess = false
    this._isValid = false
    this.message = message
  }

  /**
   * set state to success
   *
   * @param {string} message success message
   * @return void
   */
  success(message = "") {
    this._isError = false
    this._isValid = true
    this._isSuccess = true
    this.message = message
  }

  /**
   * reset state to default
   *
   * @returns void
   */
  reset() {
    this._isError = false
    this._isSuccess = false
    this._isValid = false
    this.message = ""
  }

  /**
   * validate the input with the given validation rules
   *
   * @param {String} data
   * @returns {Boolean}
   */
  validate(data) {
    if (!this._validator) {
      throw new Error(`A validator is not defined`)
    }

    if (!this._validateRule || this._disabled) {
        console.warn(`No validateRule is set`)
        return true
    }

    //... call this.error(), this.success() based on validation status
  }

  /**
   * Getter for the `message` property.
   *
   * @returns {string} The current value of the `message` property.
   */
  message() {
    return this._message
  }
}

export default CustomInputState
