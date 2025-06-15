/**
 * Copyright - 2025 - Maleesha Gimshan (www.github.com/maleeshagimshan98)
 */
import type { ValidateCallback } from './CustomInputState';
import { CustomInputState } from './CustomInputState';
import { StateError, StateErrorType } from './errors/StateError';
import DefaultValidator from 'validator';
import type validator from 'validator';

export type GroupValidationContainer = Record<string, ValidateCallback>;
export type States = { [key: string]: CustomInputState };
export type InputRef = { name: string; component: HTMLElement };

export class CustomTextInputGroupController {
  /**
   * The index of the currently focused input element
   *
   * @type {number}
   */
  private _currentFocusedInputIndex: number = 0;

  /**
   * The state of the currently focused input, if available
   *
   * @type {CustomInputState | undefined}
   */
  private _currentFocusedInputState: CustomInputState | undefined;

  /**
   * Array of input element references
   *
   * @type {InputRef[]}
   */
  private _inputRefs: InputRef[] = [];

  /**
   * Key-value record storing input data (string or number values)
   *
   * @type {Record<string, string | number>}
   */
  private _data: Record<string, string | number>;

  /**
   * Key-value record storing validation callbacks for each input (if any)
   *
   * @type {Record<string, ValidateCallback> | undefined}
   */
  private _validations: Record<string, ValidateCallback> | undefined;

  /**
   * Object representing the states of form or inputs
   *
   * @type {States}
   */
  private _states: States;

  /**
   * Validator utility for validating input fields
   *
   * @type {typeof validator}
   */
  private _validator: typeof validator;

  constructor(validations?: GroupValidationContainer) {
    this._states = {};
    this._data = {};
    if (validations) {
      this._validations = this._initValidations(validations);
    }
    /**
     *
     * ATTENTION
     * INITIALIZE A VALIDATOR - ATLEAST A DEFAULT VALIDATOR
     */
    this._validator = DefaultValidator;
  }

  /**
   * Check the validations and initialize them in the class
   *
   * @param {GroupValidationContainer} validations
   * @return {Record<string, ValidateCallback>}
   * @throws {Error}
   */
  private _initValidations(validations: GroupValidationContainer): GroupValidationContainer {
    if (!(typeof validations === 'object')) {
      throw new Error(
        `CustomTextInputGroupController - validations must be an object containing validation methods but ${validations} passed`,
      );
    }
    if (Object.keys(validations).length == 0) {
      throw new Error(`CustomTextInputGroupController - validations must have 1 or more validation methods`);
    }
    return validations;
  }

  /**
   * Get the validation callback for the given input name
   *
   * @param {string} inputName
   * @return {ValidateCallback|null}
   */
  private _getValidationCallback(inputName: string): ValidateCallback | undefined {
    return this._validations ? this._validations[inputName] : undefined;
  }

  /**
   * Checks and returns true if a CustomInputState is set for the given name
   *
   * @param {string} name input name
   * @returns {boolean}
   */
  private _hasState(name: string): boolean {
    return Object.prototype.hasOwnProperty.call(this._states, name) && this._states[name] instanceof CustomInputState;
  }

  /**
   * get the state object
   *
   * @param {string} name input name
   * @returns {CustomInputState}
   * @throws {StateError}
   */
  getState(name: string): CustomInputState {
    if (!this._hasState(name)) {
      throw new StateError(StateErrorType.STATE_NOT_SET, name);
    }
    return this._states[name]!;
  }

  /**
   * set the custom input state object and set the data object for the given input
   *
   * @param {string} name input name
   * @param {CustomInputState} state input state
   * @returns {void}
   * @throws {StateError}
   */
  setState(name: string, state: CustomInputState): void {
    if (this._states[name]) {
      throw new StateError(StateErrorType.STATE_ALREADY_EXIST, name);
    }
    state.setValidator(this._validator);

    /** set the validation callback in the CustomInputState */
    const validations = this._getValidationCallback(name);
    if (validations) {
      state.setValidateCallback(validations);
    }

    this._states[name] = state;
    this._data[name] = '';
  }

  /**
   * set the input values of corresponding inputs
   *
   * @param {string} name input name
   * @param {string | number} data input data
   * @returns {void}
   * @throws {StateError}
   */
  setData(name: string, data: string | number): void {
    if (!this._hasState(name)) {
      throw new StateError(StateErrorType.STATE_NOT_SET, name);
    }
    this._data[name] = data;
  }

  /**
   * get the values of the all inputs
   *
   * @returns {Record<string, string | number>} input data
   */
  getAllData(): Record<string, string | number> {
    return this._data;
  }

  /**
   * get the value of the input by input name
   *
   * @param {string} name input name
   * @returns {string | number} value of the input element
   * @throws {TypeError}
   */
  getValue(name: string): string | number {
    if (!name) {
      throw new TypeError(`CustomTextInputGroupController - getValue() expects the parameter to have a value`);
    }
    if (!Object.prototype.hasOwnProperty.call(this._data, name)) {
      throw new TypeError(`CustomTextInputGroupController - an input with the name of ${name} is not found`);
    }
    return this._data[name]!;
  }

  /**
   * Get a component instance by name
   *
   * @param {string} name
   * @returns {unknown | void}
   */
  private _getInputRefInstance(name: string): unknown | void {
    for (const ref of this._inputRefs) {
      if (name == ref.name) {
        return ref.component;
      }
    }
  }

  /**
   * Get a component instance by name
   *
   * @param {string} name
   * @returns {unknown}
   * @throws {Error}
   */
  getInputRefInstance(name: string): unknown {
    //... check if the component name is set before returning the component
    const inputRef = this._getInputRefInstance(name);
    if (!inputRef) {
      throw new Error(`A component with the name of ${name} is not found`);
    }
    return inputRef;
  }

  /**
   * Add an input element ref
   *
   * @param {string} name
   * @param {*} component
   * @returns {void}
   */
  setInputRef(name: string, component: HTMLElement): void {
    if (this._getInputRefInstance(name)) {
      //... CHECK
      //... input ref is already set
      return;
    }
    this._inputRefs.push({ name: name, component });
  }

  /**
   * Set focused value in the CustomInputState object
   *
   * @param {CustomInputState} state custom input state
   * @param {boolean} focusVal
   * @returns {void}
   */
  private _setFocusInCustomInputState(state: CustomInputState, focusVal: boolean): void {
    state.setFocused(focusVal);
  }

  /**
   * Set the index of current input ref to provided value and switches the focused property in the CustomInputState
   *
   * @param {string} name input name
   * @returns {void}
   */
  private _updateCurrentInputState(name: string): void {
    //... check if the component name is set before returning the component - move the checking to public calling function
    if (this._currentFocusedInputState) {
      this._setFocusInCustomInputState(this._currentFocusedInputState, false);
    }
    const nextState = this.getState(name);
    this._setFocusInCustomInputState(nextState, true);
    this._currentFocusedInputState = nextState;
  }

  /**
   * Set the index of current input ref to provided value and switches the focused property in the CustomInputState
   *
   * @param {number} index
   * @returns {void}
   */
  private _updateCurrentInputRefIndex(index: number): void {
    this._currentFocusedInputIndex = index;
  }

  /**
   * focus the next input element
   *
   * @returns {boolean}
   */
  focusNext(): boolean {
    if (this._inputRefs.length > this._currentFocusedInputIndex + 1) {
      this._updateCurrentInputRefIndex(this._currentFocusedInputIndex + 1);
      this._inputRefs[this._currentFocusedInputIndex]?.component.focus();
      const currentStateName = this._inputRefs[this._currentFocusedInputIndex]?.name;
      if (currentStateName) {
        this._updateCurrentInputState(currentStateName);
      }
      return true;
    } else {
      return false;
    }
  }

  /**
   * focus a provided input element by a name
   *
   * @param {string} name input name
   * @returns {void}
   * @throws {Error}
   */
  focusByName(name: string): void {
    for (let i = 0; i < this._inputRefs.length; i++) {
      if (this._inputRefs[i]?.name == name) {
        this._inputRefs[i]?.component.focus();
        this._updateCurrentInputState(name);
        this._updateCurrentInputRefIndex(i);
        return;
      }
    }
    //... Error - component name not found
    throw new Error(`A component with the name of ${name} is not found`);
  }

  /**
   * Set the focus property in the current state to false
   *
   * @returns {void}
   * @throws {Error}
   */
  setCurrentInputStateFocusOut(): void {
    if (this._currentFocusedInputState) {
      this._setFocusInCustomInputState(this._currentFocusedInputState, false);
    }
  }

  /**
   * invoke state's given property's error() function
   *
   * @param {string} name name of the property
   * @param {string} message  error message
   * @returns {void}
   * @throws {StateError}
   */
  setStateError(name: string, message: string): void {
    if (!this._hasState(name)) {
      throw new StateError(StateErrorType.STATE_NOT_SET, name);
    }
    this._states[name]?.error(message);
  }

  /**
   * invoke state's given property's success() function
   *
   * @param {string} name name of the property
   * @param {string} message  error message
   * @returns {void}
   * @throws {StateError}
   */
  setStateSuccess(name: string, message: string): void {
    if (!this._hasState(name)) {
      throw new StateError(StateErrorType.STATE_NOT_SET, name);
    }
    this._states[name]?.success(message);
  }

  /**
   * reset the input's state
   *
   * @param {string} name
   * @returns {void}
   */
  resetState(name: string): void {
    if (!this._hasState(name)) {
      throw new StateError(StateErrorType.STATE_NOT_SET, name);
    }
    this._states[name]?.reset();
  }

  /**
   * Reset all the state in the controller
   *
   * @return {void}
   */
  resetAllStates(): void {
    for (const state in this._states) {
      this._states[state]?.reset();
    }
  }

  /**
   * Reset all the data of the inputs in the controller
   *
   * @return {void}
   */
  resetAllData(): void {
    for (const data in this._data) {
      this._data[data] = '';
    }
  }

  /**
   *
   */
  validate(): boolean {
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

    let valid = false;
    let _hasErrors = false;

    for (const input in this._states) {
      if (this._states[input]?.realTimeValidate()) {
        continue;
      }
      if (this._states[input]?.isDisabled()) {
        continue;
      }
      if (this._states[input]?.isReq() && this._data[input] == '') {
        this._states[input].error(`this field is required`); //... this field is required
        valid = false;
        _hasErrors = true;
        continue;
      }
      if (this._states[input]?.isValid()) {
        valid = false;
        _hasErrors = true;
        continue;
      }
      if (this._states[input]?.validate(this._data[input] ?? '')) {
        valid = true;
      }
    }
    return valid && _hasErrors;
  }
}
