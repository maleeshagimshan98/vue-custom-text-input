/**
 * © Maleesha Gimshan - 2025 - github.com/maleeshagimshan98
 * Custom Input Component - Utilities
 */
import type { ValidateParameters } from './CustomInputState';
import validator from 'validator';

export default {
  resetIfNoData({ data, reset }: ValidateParameters): void {
    if (!data) {
      reset();
      return;
    }
  },
  isEmpty({ data, error, success }: ValidateParameters): void {
    if (!validator.isEmpty(data as string)) {
      success(`Not empty`);
    } else {
      error(`This cannot be empty`);
    }
  },
  isEmail({ data, error, success }: ValidateParameters): void {
    if (validator.isEmail(data as string)) {
      success(`This is an email`);
    } else {
      error(`input value ${data} is not an email`);
    }
  },
};
