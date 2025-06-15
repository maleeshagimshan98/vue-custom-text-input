import { CustomTextInputGroupController } from '../src/CustomInputGroupController';
import { CustomInputState } from '../src/CustomInputState';

describe('CustomInputGroupController', () => {
  let controller;

  beforeEach(() => {
    controller = new CustomTextInputGroupController();
  });

  describe('getState', () => {
    it('should return the CustomInputState object for the given name', () => {
      const state = new CustomInputState({ name: 'test-input' });
      controller.setState('input1', state);
      expect(controller.getState('input1')).toBe(state);
    });

    it('should throw an error if the state name is not defined', () => {
      expect(() => {
        controller.getState('input2');
      }).toThrow('the input name input2 is not defined in CustomInputController');
    });
  });

  describe('setState', () => {
    it('should throw an error if the name is not provided', () => {
      expect(() => {
        controller.setState('', new CustomInputState({ name: 'test-input' }));
      }).toThrow('CustomTextInputGroupController - setState() expects the name parameter to be a non-empty string');
    });

    it('should throw an error if an input component with the same name already exists', () => {
      const state = new CustomInputState({ name: 'test-input' });
      controller.setState('input1', state);

      expect(() => {
        controller.setState('input1', new CustomInputState({ name: 'test-input' }));
      }).toThrow('An input component with name input1 is already exists.');
    });

    it('should set the CustomInputState for the given name', () => {
      const state = new CustomInputState({ name: 'test-input' });
      controller.setState('input1', state);

      expect(controller.getState('input1')).toBe(state);
    });
  });

  describe('setData', () => {
    it('should set the data for the given input name', () => {
      const state = new CustomInputState({ name: 'test-input' });
      controller.setState('input1', state);
      controller.setData('input1', 'data1');

      expect(controller.getValue('input1')).toBe('data1');
    });

    it('should throw an error if the state name is not defined', () => {
      expect(() => {
        controller.setData('input2', 'data2');
      }).toThrow('the input name input2 is not defined in CustomInputController');
    });
  });

  describe('getData', () => {
    it('should return the data for the given input name', () => {
      controller.setState('input1', new CustomInputState({ name: 'input1' }));
      controller.setData('input1', 'data1');
      expect(controller.getValue('input1')).toBe('data1');
    });

    it('should return the whole input group as key-value pairs', () => {
      controller.setState('input1', new CustomInputState({ name: 'input1' }));
      controller.setState('input2', new CustomInputState({ name: 'input2' }));
      controller.setState('input3', new CustomInputState({ name: 'input3' }));

      controller.setData('input1', 'data1');
      controller.setData('input2', 'data2');
      controller.setData('input3', 'data3');

      expect(controller.getAllData()).toEqual({
        input1: 'data1',
        input2: 'data2',
        input3: 'data3',
      });
    });
  });

  describe('getInputRefInstance', () => {
    it('should return the component instance for the given input name', () => {
      const component = { name: 'input1' };
      controller.setInputRef('input1', component);

      expect(controller.getInputRefInstance('input1')).toBe(component);
    });

    it('should throw error if no component instance is found for the given input name', () => {
      controller.setInputRef('input1', null);
      controller.setInputRef('input2', null);
      controller.setInputRef('input3', null);

      expect(() => {
        controller.getInputRefInstance('input2');
      }).toThrow(`A component with the name of input2 is not found`);
    });
  });

  describe('focusByName', () => {
    it('should focus the input component with the given name', () => {
      const state1 = new CustomInputState({ name: 'input1' });
      const component = { name: 'input1', focus: jest.fn() };
      controller.setInputRef('input1', component);
      controller.setInputRef('input2', null);
      controller.setInputRef('input3', null);
      controller.setState('input1', state1);
      // controller.setState('input2', state2);

      controller.focusByName('input1');

      expect(component.focus).toHaveBeenCalled();
    });

    it('should throw an error if no input component is found for the given name', () => {
      expect(() => {
        controller.focusByName('input2');
      }).toThrow('A component with the name of input2 is not found');
    });
  });

  describe('validate', () => {
    it('should return true if all input components are valid', () => {
      const state1 = new CustomInputState({ name: 'test-input' });
      controller.setState('input1', state1);
    });
  });
});
