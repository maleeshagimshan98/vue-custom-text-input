/**
 * Copyright - 2025 - Maleesha Gimshan (www.github.com/maleeshagimshan98)
 */

export type NewCustomInputState = {
  name: string;
  inputType?: string;
  label?: string;
  placeholder?: string;
  realTimeValidate?: boolean;
  validateCallback?: (params: ValidateParameters) => void;
  disabled?: boolean;
  initErrorMsg?: string;
  initSuccessMsg?: string;
  isReq?: boolean;
  isValid?: boolean;
};

export type ValidateParameters = {
  data: string | number;
  validatorLib: unknown;
  error: (message: string) => void;
  success: (message: string) => void;
  reset: () => void;
};

export type ValidateCallback = (params: ValidateParameters) => void;

export type ValidationMessage = { isError: boolean; message: string };

/**
 * State class for custom input element
 */
export class CustomInputState {
  /**
   * The name of the input
   *
   * @type {string}
   */
  private _name: string;

  /**
   * The type of the input
   *
   * @type {string}
   */
  private _inputType: string;

  /**
   * The label of the input
   *
   * @type {string}
   */
  private _label: string;

  /**
   * The placeholder text for the input
   *
   * @type {string}
   */
  private _placeholder: string;

  /**
   * Whether the input should be validated in real-time
   *
   * @type {boolean}
   */
  private _realTimeValidate: boolean;

  /**
   * The validation callback function
   *
   * @type {((params: ValidateParameters) => void) | undefined}
   */
  private _validateCallback: ((params: ValidateParameters) => void) | undefined;

  /**
   * Whether the input is disabled
   *
   * @type {boolean}
   */
  private _disabled: boolean;

  /**
   * Whether the input is valid
   *
   * @type {boolean}
   */
  private _isValid: boolean;

  /**
   * Whether the input is in a success state
   *
   * @type {boolean}
   */
  private _isSuccess: boolean;

  /**
   * Whether the input is required
   *
   * @type {boolean}
   */
  private _isReq: boolean;

  /**
   * The validator instance
   *
   * @type {unknown | undefined}
   */
  private _validator: unknown | undefined;

  /**
   * Whether the input is focused
   *
   * @type {boolean}
   */
  private _isFocused: boolean;

  /**
   * The messages array containing error and success messages
   *
   * @type { ValidationMessage[] }
   */
  private _messages: ValidationMessage[];

  /**
   * Whether the input validation passed
   *
   * @type {boolean}
   */
  private _isValidationPass: boolean;

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
    isValid = true,
  }: NewCustomInputState) {
    if (!name) {
      throw new Error(`CustomInputState requires a name but ${name} passed`);
    }
    //...
    //validateCallback : () => {}
    //initErrorMsg : 'Error_Message_Here', - initialise with an error message
    //initSuccessMsg : 'Success_Message_Here' - initialise with an error message

    this._name = name;
    this._inputType = inputType ?? 'text';
    this._label = label ?? '';
    this._placeholder = placeholder ?? '';
    this._realTimeValidate = realTimeValidate ?? true;
    this._disabled = disabled ?? false;
    this._isValid = isValid;
    this._isSuccess = false;
    this._isReq = isReq ?? true;
    this._isFocused = false;
    this._messages = [];
    this._isValidationPass = isValid ?? true;

    if (initErrorMsg) {
      this.error(initErrorMsg);
    } else if (initSuccessMsg) {
      this.success(initSuccessMsg);
    }
    if (validateCallback) {
      this.setValidateCallback(validateCallback);
    }
  }

  /**
   * get the input label
   *
   * @returns {string}
   */
  get label(): string {
    return this._label;
  }

  /**
   * set the input's label
   *
   * @param {string} label
   * @returns {void}
   */
  set label(label: string) {
    this._label = label;
  }

  /**
   * Getter for the `placeholder` property.
   *
   * @returns {string} The current value of the `placeholder` property.
   */
  get placeholder(): string {
    return this._placeholder;
  }

  /**
   * Setter for the `placeholder` property.
   *
   * @param {string} placeholder - The new value for the `placeholder` property.
   */
  set placeholder(placeholder: string) {
    this._placeholder = placeholder;
  }

  /**
   * check if the input is validated in real-time
   *
   * @returns {boolean}
   */
  realTimeValidate(): boolean {
    return this._realTimeValidate;
  }

  /**
   * set the validation callback function
   *
   * @param {(params: ValidateParameters) => void} callback
   * @returns {void}
   * @throws {Error}
   */
  setValidateCallback(callback: (params: ValidateParameters) => void): void {
    if (callback && typeof callback !== 'function') {
      throw new Error(
        `Validation callback provided to CustomInputState '${this._name}' is not a valid function. Please ensure that the validation callback is a function.`,
      );
    }
    this._validateCallback = callback;
  }

  /**
   * Getter for the `inputType` property.
   *
   * @returns {string} The current value of the `inputType` property.
   */
  get inputType(): string {
    return this._inputType;
  }

  /**
   * Setter for the `inputType` property.
   *
   * @param {string} inputType - The new value for the `inputType` property.
   */
  set inputType(inputType: string) {
    this._inputType = inputType;
  }

  /**
   * set a instance of a validator class
   *
   * @param {unknown} validator
   * @returns {void}
   */
  setValidator(validator: unknown): void {
    this._validator = validator;
  }

  /**
   * returns this._isValid
   *
   * @returns {boolean}
   */
  isValid(): boolean {
    return this._isValid;
  }

  /**
   * returns this._isSuccess
   *
   * @returns {boolean}
   */
  isSuccess(): boolean {
    return this._isSuccess;
  }

  /**
   * returns true if the input is disabled
   *
   * @returns {boolean}
   */
  isDisabled(): boolean {
    return this._disabled;
  }

  /**
   * returns true if this input is required
   *
   * @returns {boolean}
   */
  isReq(): boolean {
    return this._isReq;
  }

  /**
   *
   * @param {boolean} isError
   * @param {string} message
   */
  private _addMessage(isError: boolean, message: string): void {
    if (isError) {
      this._isValidationPass = false;
    }
    this._messages.push({ isError: isError, message: message });
  }

  /**
   * set state to error
   *
   * @param {string} message error message
   * @returns {void}
   */
  error(message: string): void {
    this._isSuccess = false;
    this._isValid = false;
    this._isValidationPass = false;
    if (!message) {
      console.warn(`CustomInputState: error() method requires a message to be a string. But ${message} found.`);
      return;
    }
    this._addMessage(true, message);
  }

  /**
   * set state to success
   *
   * @param {string} message success message
   * @return void
   */
  success(message: string = ''): void {
    this._isValid = true;
    this._isSuccess = true;
    if (message) {
      this._addMessage(false, message);
    }
  }

  /**
   * reset state to default
   *
   * @returns void
   */
  reset(): void {
    this._isSuccess = false;
    this._isValid = true;
    this._isValidationPass = true;
    this._messages = [];
  }

  /**
   * validate the input with the given validation rules
   *
   * @param {string | number} data
   * @returns {boolean}
   * @throws {Error}
   */
  validate(data: string | number): boolean {
    if (!this._validateCallback) {
      console.warn(
        `CustomInputState '${this._name}' is missing a validation callback for input validation. Make sure to provide a valid validation callback when initializing the custom input.`,
      );
      return true;
    }

    if (!this._validator) {
      throw new Error(
        `Validation failed in CustomInputState '${this._name}': A validator is not defined. Please provide a validator during initialization.`,
      );
    }

    if (this._disabled) {
      return true;
    }

    this._validateCallback({
      data: data,
      validatorLib: this._validator,
      error: (message: string) => this.error(message),
      success: (message: string) => this.success(message),
      reset: () => this.reset(),
    });

    this._isValid = this._isValidationPass;
    if (!this._isValidationPass) {
      this._isSuccess = false;
    }
    return this._isValid;
  }

  /**
   * Check if the input has any messages
   *
   * @returns boolean
   */
  hasMessages(): boolean {
    return this._messages.length > 0;
  }

  /**
   * Getter for the `messages` property.
   *
   * @returns {ValidationMessage[]} The messages array containing error and success messages.
   */
  messages(): ValidationMessage[] {
    return this._messages;
  }

  /**
   * Set the input's focused state
   *
   * @returns {void}
   */
  setFocused(value: boolean): void {
    this._isFocused = value;
  }

  /**
   * Get the foucused state
   *
   * @returns {boolean}
   */
  isFocused(): boolean {
    return this._isFocused;
  }
}
