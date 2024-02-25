/**
 * © Maleesha Gimshan - 2024 - github.com/maleeshagimshan98 
 * Custom Input Component - Utilities
 */

export default {
  resetIfNoData({ data, validator, error, success, reset }) {
    if (!data) {
      reset()
      return
    }
  },
  isEmpty ({ data, validator, error, success, reset }) {
    !validator.isEmpty(data) ? success (`Not empty`) : error(`This cannot be empty`)
  },
  isEmail ({ data, validator, error, success, reset }) {
    validator.isEmail(data) ? success(`This is an email`) : error(`input value ${data} is not an email`)
  }
}
