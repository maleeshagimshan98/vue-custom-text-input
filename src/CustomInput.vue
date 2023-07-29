/**
 * © Maleesha Gimshan - 2021 - github.com/maleeshagimshan98
 * Custom Input Component
 */

<template>
  <div class="">
    <!-- label-->
    <p class="input-label" v-bind:class="styles.label" v-if="_state.label">
      {{ _state.label }}
    </p>
    <input :type="_state.inputType" :placeholder="_state.placeholder" :disabled="_state.isDisabled()"
      class="custom-input-el"
      v-bind:class="!_state.isError() ? _state.isSuccess() ? styles.input.success : styles.input.primary : styles.input.error"
      v-on:input="event => onInput(event)" v-on:focus="event => $emit('focus', event)"
      v-on:keyup.enter="event => $emit('enter',event.target.value)"
       />
    <p class="input-message"
      v-bind:class="_state.isError ? styles.errorMessage : _state.isSuccess ? styles.successMessage : ''"
      v-if="_state.message()">
      <!-- Show  Error Messages Here -->
      {{ _state.message() }}
    </p>
  </div>
</template>

<script>
import CustomInputState from "./CustomInputState.js"
import CustomInputStyles from "./CustomInputStyles.js"

/**
 * =========================================================
 * check if scoped styles defined in an outer component, can be applied to child one
 * as this component is depending on parent's scoped styles.
 * 
 * if not working, change customInputStyles from classes to styles
 * =========================================================
 */


export default {
  data: function () {
    return {
      //isTyping : false,
      _state: '',
    }
  },
  props: {
    name: {
      type: String,
      required: true
    },
    controller: {
      type: Object
    },
    inputType: {
      type: String
    },
    realTimeValidate: {
      type: Boolean,
      default: true
    },
    validateRule: {
      type: Array
    },
    label: {
      type: String
    },
    placeholder: {
      type: String
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    isSuccess: {
      type: Boolean,
      default: false
    },
    isError: {
      type: Boolean,
      default: false
    },
    isOpt: {
      type: Boolean,
      default: false
    },
    isReq: {
      type: Boolean,
      default: false
    },
    resetOnInput: {
      type: Boolean,
      default: true
    },
    styles: {
      type: Object,
      default: () => {
        return new CustomInputStyles(
          {
            input: {
              primary: ['border-secondary'],
              focused: ['border-primary'],
              error: ['border-danger'],
              success: ['border-success']
            },
            label: [],
            errorMessage: ['text-danger'],
            successMessage: ['text-success']
          }
        );
      }
    },
  },
  computed: {
  },
  components: {
  },
  methods: {
    onInput: function (event) {
      //this.isTyping = true;
      if (this.resetOnInput) {
        this._state.reset()
      }
      if (this.realTimeValidate) {
        //... validate the input
        this._state.validate(event.target.value)
      }
      this.controller.setData(this.name, event.target.value)
      this.$emit("input", event.target.value)
    },
  },
  beforeMount: async function () {

    if (this.disabled && this.isReq) {
      throw new Error(`Cannot set the properties disabled and isReq to true at same time`)
    }

    //... set the controller
    //... controller instance passed via the props has the precedence over the injected controller

    if (!this.controller) {
      throw new Error(`Controller is not injected in component -  ${this.name}`)
    }
    this.controller.setState(
      this.name,
      new CustomInputState({
        inputType: this.inputType,
        label: this.label,
        placeholder: this.placeholder,
        realTimeValidate: this.realTimeValidate,
        validate: this.validate,
        disabled: this.disabled,
        isValid: true,
        isSuccess: this.isSuccess,
        isError: this.isError,
        isOpt: this.isOpt,
        isReq: this.isReq,
      })
    )
    this._state = this.controller.getState(this.name)

  },
}
</script>

<style scoped>
.input-label {
  padding: 0;
  margin: 0;
  font-size: 15px;
}

.custom-input-el {
  margin: 0;
  padding: 1vh 0;
  background: '';
  color: black
    /** change */
}

.input-message {
  margin: 0;
}

.input-message.success {
  color: green;
  /** change */
}

.input-message.error {
  color: red;
  /** change */
}
</style>>