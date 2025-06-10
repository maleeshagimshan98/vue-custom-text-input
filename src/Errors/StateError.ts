enum StateErrorType {
  'STATE_NOT_SET',
  'STATE_ALREADY_EXIST',
  'VALIDATOR_NOT_DEFINED',
}

const errorMessage = {
  [StateErrorType.STATE_NOT_SET]: (name: string): string => {
    return `CustomTextInputGroupController - State for the input name ${name} is not defined in CustomInputController`;
  },
  [StateErrorType.STATE_ALREADY_EXIST]: (name: string): string => {
    return `CustomTextInputGroupController - An input component with name ${name} is already exists.`;
  },
  [StateErrorType.VALIDATOR_NOT_DEFINED]: (name: string): string => {
    return `Validation failed in '${name}': A validator is not defined. Please provide a validator during initialization.`;
  },
};

class StateError extends Error {
  type: StateErrorType;
  constructor(type: StateErrorType, inputName: string) {
    super(errorMessage[type](inputName));
    this.type = type;
  }
}

export { StateError, StateErrorType };
