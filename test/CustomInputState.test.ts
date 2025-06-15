import { CustomInputState, NewCustomInputState } from '../src/CustomInputState';

describe('CustomInputState', () => {
  let customInputState: CustomInputState;

  beforeEach(() => {
    customInputState = new CustomInputState({ name: 'test input state' });
  });

  describe('Initialization', () => {
    it('should instantiate the class with required parameters', () => {
      expect(customInputState).toBeInstanceOf(CustomInputState);
      expect(customInputState.isValid()).toBe(true);
      expect(customInputState.isSuccess()).toBe(false);
    });

    it('should initialize the class with optional parameters', () => {
      const options = {
        name: 'inputName',
        inputType: 'text',
        label: 'Input Label',
        placeholder: 'Input Placeholder',
        realTimeValidate: false,
        disabled: true,
        isReq: false,
        isValid: true,
      };

      customInputState = new CustomInputState(options);

      expect(customInputState).toBeInstanceOf(CustomInputState);
      expect(customInputState.label).toBe(options.label);
      expect(customInputState.inputType).toBe(options.inputType);
      expect(customInputState.placeholder).toBe(options.placeholder);
      expect(customInputState.realTimeValidate()).toBe(options.realTimeValidate);
      expect(customInputState.isDisabled()).toBe(options.disabled);
      expect(customInputState.isReq()).toBe(options.isReq);
      expect(customInputState.isValid()).toBe(options.isValid);
      expect(customInputState.isSuccess()).toBe(false);
      expect(customInputState.hasMessages()).toBe(false);
      expect(customInputState.messages().length).toBe(0);
    });

    it('should throw an error if the name is not provided', () => {
      expect(() => new CustomInputState({} as NewCustomInputState)).toThrowError(
        'CustomInputState requires a name but undefined passed',
      );
    });
  });

  describe('Getter and Setter Methods', () => {
    it('should get and set the input label', () => {
      expect(customInputState.label).toBe('');
      customInputState.label = 'New Label';
      expect(customInputState.label).toBe('New Label');
    });

    it('should get and set the placeholder', () => {
      expect(customInputState.placeholder).toBe('');
      customInputState.placeholder = 'New Placeholder';
      expect(customInputState.placeholder).toBe('New Placeholder');
    });

    it('should get and set the input type', () => {
      expect(customInputState.inputType).toBe('text');
      customInputState.inputType = 'email';
      expect(customInputState.inputType).toBe('email');
    });

    it('should check if real-time validation is enabled', () => {
      expect(customInputState.realTimeValidate()).toBe(true);
    });

    it('should check if the input is disabled', () => {
      expect(customInputState.isDisabled()).toBe(false);
    });

    it('should check if the input is required', () => {
      expect(customInputState.isReq()).toBe(true);
    });

    it('should check if the input is valid', () => {
      expect(customInputState.isValid()).toBe(true);
    });

    it('should check if the input is successful', () => {
      expect(customInputState.isSuccess()).toBe(false);
    });

    it('should check if the input is focused', () => {
      expect(customInputState.isFocused()).toBe(false);
      customInputState.setFocused(true);
      expect(customInputState.isFocused()).toBe(true);
    });
  });

  describe('Validation Methods', () => {
    // it('should set the validation callback function', () => {
    //   const callback = jest.fn();
    //   customInputState.setValidateCallback(callback);
    //   expect(customInputState._validateCallback).toBe(callback);
    // });

    it('should validate the input with a valid value', () => {
      const validator = jest.fn(() => {
        return true;
      });

      customInputState.setValidateCallback(({ success }) => success(''));
      customInputState.setValidator(validator);

      const value = 'Valid Value';
      const result = customInputState.validate(value);

      expect(result).toBe(true);
      expect(customInputState.isValid()).toBe(true);
      expect(customInputState.isSuccess()).toBe(true);
    });

    it('should validate the input with an invalid value', () => {
      const validator = jest.fn(() => false);
      customInputState.setValidator(validator);
      customInputState.setValidateCallback(({ error }) => error(''));

      const value = 'Invalid Value';
      const result = customInputState.validate(value);

      expect(result).toBe(false);
      expect(customInputState.isValid()).toBe(false);
      expect(customInputState.isSuccess()).toBe(false);
    });
  });

  describe('State Modification Methods', () => {
    it('should set the state to error and add error messages', () => {
      customInputState.error('Error Message');

      expect(customInputState.isValid()).toBe(false);
      expect(customInputState.isSuccess()).toBe(false);
      expect(customInputState.hasMessages()).toBe(true);
      expect(customInputState.messages()).toEqual([{ isError: true, message: 'Error Message' }]);
    });

    it('should set the state to success and add success messages', () => {
      customInputState.success('Success Message');

      expect(customInputState.isValid()).toBe(true);
      expect(customInputState.isSuccess()).toBe(true);
      expect(customInputState.hasMessages()).toBe(true);
      expect(customInputState.messages()).toEqual([{ isError: false, message: 'Success Message' }]);
    });

    it('should reset the state to default', () => {
      customInputState.error('Error Message');
      customInputState.success('Success Message');

      customInputState.reset();

      expect(customInputState.isValid()).toBe(true);
      expect(customInputState.isSuccess()).toBe(false);
      expect(customInputState.hasMessages()).toBe(false);
      expect(customInputState.messages()).toEqual([]);
    });
  });

  describe('Message Handling Methods', () => {
    it('should return true for hasMessages after adding an error message', () => {
      customInputState.error('Error Message');
      expect(customInputState.hasMessages()).toBe(true);
    });

    it('should return false for hasMessages after resetting', () => {
      customInputState.error('Error Message');
      customInputState.reset();
      expect(customInputState.hasMessages()).toBe(false);
    });

    it('should return an array of messages after adding an error message', () => {
      customInputState.error('Error Message');
      expect(customInputState.messages()).toEqual([{ isError: true, message: 'Error Message' }]);
    });

    it('should return an empty array after resetting', () => {
      customInputState.error('Error Message');
      customInputState.reset();
      expect(customInputState.messages()).toEqual([]);
    });
  });
});
