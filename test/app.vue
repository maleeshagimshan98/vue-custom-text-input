<template>
  <div class="app">
    Custom-Input-Text
    <comp name="testInput" :styles="styles" v-on:enter="(val) => enter(val)" :controller="inputController"
      :initSuccessMsg="'init success'">
      <template #label="{ state, styles, controller }">
        <button class="" @click="resetStates()"
          v-bind:class="state.isValid() ? 'valid' : 'not-valid' + ` ${styles.label.error}`">
          <!-- use array.join()-->
          From label slot
        </button>
      </template>

      <template #inputEnhancements="{ state, styles, controller }">
        <h4 class="" v-bind:class="state.isValid() ? 'valid' : 'not-valid'">
          From inputEnhancement slot
        </h4>
      </template>

      <template #leading="{ state, styles, controller }">
        <h4 class="" v-bind:class="state.isValid() ? 'valid' : 'not-valid'" style="margin-right: 10px;">
          From leading slot
        </h4>
      </template>

      <template #trailing="{ state, styles, controller }">
        <h4 class="" v-bind:class="state.isValid() ? 'valid' : 'not-valid'" style="margin-left: 10px;">
          From trailing slot
        </h4>
      </template>
    </comp>

    <comp name="testInput2" style="margin-top: 50px" :styles="styles" :label="'input 2'"
      v-on:enter="(val) => enter(val)" :controller="inputController"></comp>
  </div>
</template>

<script>
import { ref } from "vue"
import { CustomInput as comp, CustomTextInputGroupController as controller, CustomInputStyles, Utils } from "../src/index.ts"

const validations = {
  testInput: ({ data, validatorLib, error, success, reset }) => {
      console.log(`validating`);
      validatorLib.isEmail(data) ? success(`This is an email`) : error(`input value ${data} is not an email`)
      !validatorLib.isEmpty(data) ? success(`Not empty`) : error(`This cannot be empty`)
  },
  testInput2: ({ data, validatorLib, error, success, reset }) => {
      if (!data) {
        reset()
        return
      }
      validatorLib.isEmail(data) ? success(`This is an email`) : error(`input value ${data} is not an email`)
      // !validatorLib.isEmpty(data) ? success (`Not empty`) : error(`This cannot be empty`)
    }
}

//import controller from "../src/CustomInputGroupController.js"
const styles = new CustomInputStyles({
  input: {
    base: ["cust-input"],
    primary: ["primary"],
    focused: ["focused"],
    error: ["error"],
    success: ["success"],
  },
  label: {
    base: ["cust-label"],
    primary: ["primary"],
    focused: ["focused"],
    error: ["error"],
    success: ["success"],
  },
  message: {
    base: ["cust-message"],
    primary: ["primary"],
    focused: ["focused"],
    error: ["error"],
    success: ["success"],
  }
})

export default {
  data() {
    return {
      styles: styles,
      inputController: ref(new controller(validations)),
    }
  },
  methods: {
    enter(val) {
      console.log(val)
      this.inputController.getValue('testInput')
    },
    resetStates() {
      this.inputController.resetAllStates()
      this.inputController.resetAllData()
    },
  },
  components: {
    comp,
  },
  mounted() {
    this.inputController.setData('testInput', 'someone@example.co')
  },
}
</script>

<style>
.app {
  margin: 10%;
  padding: 2%; /* Reduced padding for better responsiveness */
}

/* Base styles for the input component */
.cust-input {
  display: block;
  width: 100%;
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  transition: border-color 0.2s;
}

/* Base styles for the label */
.cust-label {
  display: block;
  font-weight: bold;
  margin-bottom: 0.5rem;
}

/* Base styles for the message */
.cust-message {
  font-size: 0.875rem;
  margin-top: 0.25rem;
}

/* Hover styles for the input element */
.cust-input:hover {
  border-color: #a0aec0;
}

/* Focus styles for the input element */
.cust-input:focus {
  border-color: #4c51bf;
  box-shadow: 0 0 0 2px rgba(76, 81, 191, 0.15);
  outline: none;
}

/* Primary styles for the input component */
.cust-input.primary {
  color: #2d3748;
  background-color: #ffffff;
  border-color: #4c51bf;
}

/* Primary styles for the label */
.cust-label.primary {
  color: #4c51bf;
}

/* Primary styles for the message */
.cust-message.primary {
  color: #4c51bf;
}

/* Focused styles for the label */
.cust-label.focused {
  color: #38a169;
}

/* Focused styles for the message */
.cust-message.focused {
  color: #38a169;
}

/* Error styles for the input component */
.cust-input.error {
  border-color: #e53e3e;
  background-color: #ffffff;
}

/* Error styles for the label */
.cust-label.error {
  color: #e53e3e;
}

/* Error styles for the message */
.cust-message.error {
  color: #e53e3e;
}

/* Success styles for the input component */
.cust-input.success {
  border-color: #48bb78;
  background-color: #ffffff;
}

/* Success styles for the label */
.cust-label.success {
  color: #48bb78;
}

/* Success styles for the message */
.cust-message.success {
  color: #48bb78;
}
</style>