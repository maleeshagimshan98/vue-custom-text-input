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
    name,
    inputType,
    label,
    placeholder,
    realTimeValidate,
    validateCallback,
    disabled,
    initErrorMsg,
    initSuccessMsg,
    isReq,
    isValid,
  } = {}) {
    if (!name) {
      throw new Error(`CustomInputState requires a name but ${name} passed`)
    }
    //...
    //validateRule : ['email | length > 8', 'ERROR_MESSSAGE', 'SUCCESS_MESSAGE'], etc. - refer to ''
    //isError : 'Error_Message_Here', - initialise with an error message
    //isSuccess : 'Success_Message_Here' - initialise with an error message

    this._name = name
    this._inputType = inputType ?? "text"
    this._label = label ?? ""
    this._placeholder = placeholder ?? ""
    this._realTimeValidate = realTimeValidate ?? true
    this._validateCallback
    this._disabled = disabled ?? false
    this._isValid = isValid ?? true
    this._isSuccess = false
    this._isReq = isReq ?? true
    this._validator
    this._isFocused = false
    this._messages = []
    this._isValidationPass = isValid ?? true

    initErrorMsg ? this.error(initErrorMsg) : initSuccessMsg ? this.success(initSuccessMsg) : false
    validateCallback ? this.setValidateCallback(validateCallback) : null
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
   * check if the input is validated in real-time
   *
   * @returns {Boolean}
   */
  realTimeValidate() {
    return this._realTimeValidate
  }

  /**
   * set the validation callback function
   *
   * @param {Function} callback
   * @returns {void}
   * @throws {Error}
   */
  setValidateCallback(callback) {
    if (callback && typeof callback !== "function") {
      throw new Error(
        `Validation callback provided to CustomInputState '${this._name}' is not a valid function. Please ensure that the validation callback is a function.`
      )
    }
    this._validateCallback = callback
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
   * returns this._isValid
   *
   * @returns {Boolean}
   */
  isValid() {
    return this._isValid
  }

  /**
   * returns this._isSuccess
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
   * returns true if this input is required
   *
   * @returns {Boolean}
   */
  isReq() {
    return this._isReq
  }

  /**
   *
   * @param {Boolean} isError
   * @param {String} message
   */
  _addMessage(isError, message) {
    if (isError) {
      this._isValidationPass = false
    }
    this._messages.push({ isError: isError, message: message })
  }

  /**
   * set state to error
   *
   * @param {string} message error message
   * @returns void
   */
  error(message) {
    this._isSuccess = false
    this._isValid = false
    this._isValidationPass = false
    if (!message) {
      console.warn(`CustomInputState: error() method requires a message to be a string. But ${message} found.`)
      return      
    }
    this._addMessage(true, message)
  }

  /**
   * set state to success
   *
   * @param {string} message success message
   * @return void
   */
  success(message = "") {
    this._isValid = true
    this._isSuccess = true
    if (message) {
      this._addMessage(false, message)
    }
  }

  /**
   * reset state to default
   *
   * @returns void
   */
  reset() {
    this._isSuccess = false
    this._isValid = true
    this._isValidationPass = true
    this._messages = []
  }
 
  /**
   * validate the input with the given validation rules
   *
   * @param {String} data
   * @returns {Boolean}
   * @throws {Error}
   */
  validate(data) {
    if (!this._validateCallback) {
      console.warn(
        `CustomInputState '${this._name}' is missing a validation callback for input validation. Make sure to provide a valid validation callback when initializing the custom input.`
      )
      return true
    }

    if (!this._validator) {
      throw new Error(
        `Validation failed in CustomInputState '${this._name}': A validator function is not defined. Please provide a valid validator function during initialization.`
      )
    }

    if (this._disabled) {
      return true
    }
    
    let validationStack = this._validateCallback(this._validator)
    validationStack(
      data,
      (message) => this.error(message),
      (message) => this.success(message),
      () => this.reset(),
    )

    this._isValid = this._isValidationPass
    if (!this._isValidationPass) {
      this._isSuccess = false
    }
    return this._isValid
  }

  /**
   *
   * @returns Boolean
   */
  hasMessages() {
    return this._messages.length > 0
  }

  /**
   * Getter for the `messages` property.
   *
   * @returns {Array} The messages array containing error and success messages.
   */
  messages() {
    return this._messages
  }

  /**
   * Set the input's focused state
   *
   * @returns {void}
   */
  setFocused(value) {
    this._isFocused = value
  }

  /**
   * Get the foucused state
   *
   * @returns {Boolean}
   */
  isFocused() {
    return this._isFocused
  }
}

export default CustomInputState
