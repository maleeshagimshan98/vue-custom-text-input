/**
 * Copyright - 2025 - Maleesha Gimshan (www.github.com/maleeshagimshan98)
 */

export type InputStyleState = {
  base: string[];
  primary: string[];
  focused: string[];
  error: string[];
  success: string[];
};

export type InputStyles = {
  input: InputStyleState;
  label: InputStyleState;
  message: InputStyleState;
};

export class CustomInputStyles {
  /**
   * input styles
   *
   * @type {InputStyleState}
   */
  private input: InputStyleState = {
    base: [],
    primary: [],
    focused: [],
    error: [],
    success: [],
  };

  /**
   * label styles
   *
   * @type {InputStyleState}
   */
  private label: InputStyleState = {
    base: [],
    primary: [],
    focused: [],
    error: [],
    success: [],
  };

  /**
   * message styles
   *
   * @type {InputStyleState}
   */
  private message: InputStyleState = {
    base: [],
    primary: [],
    focused: [],
    error: [],
    success: [],
  };

  /**
   *
   * @param {InputStyleState} input
   * @param {InputStyleState} label
   * @param {InputStyleState} message
   */
  constructor({ input, label, message }: InputStyles) {
    this._init({ input, label, message });
  }

  /**
   * Get the default style state
   *
   * @returns {InputStyleState}
   */
  private getDefaultStyleState(): InputStyleState {
    return {
      base: [],
      primary: [],
      focused: [],
      error: [],
      success: [],
    };
  }

  /**
   * Check if required parameters are in proper form and
   * append the parameters into an array (if a string passed)
   *
   * @param {InputStyles} style
   * @returns {string[]}
   * @throws {Error}
   */
  private _checkParamTypesAndPrepare(style: InputStyleState[] | InputStyleState): InputStyleState[] {
    if (Array.isArray(style)) {
      return style;
    }
    if (typeof style === 'string') {
      return [style];
    } else {
      throw new Error('Type of input style is not supported');
    }
  }

  /**
   * initialize styles
   *
   * @param {InputStyles} styles
   * @returns {void}
   */
  private _init(styles: InputStyles): void {
    const elements: Array<keyof InputStyles> = ['input', 'label', 'message'];
    const styleStates: Array<keyof InputStyleState> = ['base', 'primary', 'focused', 'error', 'success'];

    elements.forEach((element) => {
      if (styles[element]) {
        styleStates.forEach((state) => {
          // @ts-expect-error - TS doesn't understand the dynamic access
          this[element][state] = this._checkParamTypesAndPrepare(styles[element][state] ?? []);
        });
      }
    });
  }

  /**
   * Get input styles
   *
   * @returns {InputStyles}
   */
  getStyles(): InputStyles {
    return {
      input: this.input,
      label: this.label,
      message: this.message,
    };
  }
}
