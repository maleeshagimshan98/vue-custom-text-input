<template>
  <div class="app">
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
    </comp>

    <comp name="testInput2" style="margin-top: 50px" :styles="styles" :label="'input 2'"
      v-on:enter="(val) => enter(val)" :controller="inputController"></comp>
  </div>
</template>

<script>
import { ref } from "vue"
import { CustomInput as comp, CustomTextInputGroupController as controller, CustomInputStyles, Utils } from "../src/index.js"

const validations = {
  testInput: () => {
    return ({ data, validator, error, success, reset }) => {
      validator.isEmail(data) ? success(`This is an email`) : error(`input value ${data} is not an email`)
      !validator.isEmpty(data) ? success(`Not empty`) : error(`This cannot be empty`)
    }
  },
  testInput2: () => {
    return ({ data, validator, error, success, reset }) => {
      if (!data) {
        reset()
        return
      }
      validator.isEmail(data) ? success(`This is an email`) : error(`input value ${data} is not an email`)
      // !validator.isEmpty(data) ? success (`Not empty`) : error(`This cannot be empty`)
    }
  },
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
  padding: 10%;
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

/* Base styles for the input element */
.cust-input {
  font-size: 0.875rem;
  border-radius: 0.25rem;
  border: 1px solid #e2e8f0;
  padding: 0.5rem 0.75rem;
  outline: none;
}

/* Hover styles for the input element */
.cust-input:hover {
  border-color: #cbd5e0;
}

/* Focus styles for the input element */
.cust-input:focus {
  border-color: #070707;
  box-shadow: 0 0 0 3px rgba(7, 7, 7, 0.5);
}

/* Primary styles for the input component */
.cust-input.primary {
  /* Primary input styles */
  color: #fff;
  background-color: #ffff;
  border-color: #4c51bf;
}

/* Primary styles for the label */
.cust-label.primary {
  /* Primary label styles */
  color: #4c51bf;
}

/* Primary styles for the message */
.cust-message.primary {
  /* Primary message styles */
  color: #ffff;
}

/* Focused styles for the label */
.cust-label.focused {
  /* Focused label styles */
  color: #38a169;
}

/* Focused styles for the message */
.cust-message.focused {
  /* Focused message styles */
  color: #38a169;
}

/* Error styles for the input component */
.cust-input.error {
  /* Error input styles */
  border-color: #e53e3e;
}

/* Error styles for the label */
.cust-label.error {
  /* Error label styles */
  color: #e53e3e;
}

/* Error styles for the message */
.cust-message.error {
  /* Error message styles */
  color: #e53e3e;
}

/* Success styles for the input component */
.cust-input.success {
  /* Success input styles */
  border-color: #48bb78;
}

/* Success styles for the label */
.cust-label.success {
  /* Success label styles */
  color: #48bb78;
}

/* Success styles for the message */
.cust-message.success {
  /* Success message styles */
  color: #48bb78;
}
</style>
