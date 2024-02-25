<template>
  <div class="app">
    <comp
      name="testInput"
      v-on:enter="(val) => enter(val)"
      :controller="inputController"
      :validateCallback="validations.testInput"
      >

      <template #label="props">
        <button class="" v-bind:class="props.state.isValid() ? 'valid' : 'not-valid' + ` ${props.styles.label.error}`"> From label slot</button>
      </template>

      <template #inputEnhancements="props">
        <h4 class="" v-bind:class="props.state.isValid() ? 'valid' : 'not-valid'"> From inputEnhancement slot</h4>
      </template>
    </comp>

    <comp
    name="testInput2"
    style="margin-top: 50px;"
    v-on:enter="(val) => enter(val)"
    :controller="inputController"
    :validateCallback="(validator, data, error, success) =>  true"
    ></comp>
  </div>
</template>

<script>
import comp from "../src/CustomInput.vue"
import controller from "../src/CustomInputGroupController.js"

export default {
  data() {
    return {
      inputController: new controller(),
      validations : {
        testInput ({validator,data, error, success}) {
            let valid = validator.isEmail(data)
            valid ? success('Okay') : error('This is not an email')
            return valid
        },
    }
    }
  },
  methods: {
    enter(val) {
      console.log(val)
    },
  },
  components: {
    comp,
  },
}
</script>
>

<style>
.app {
  margin: 10%;
  padding: 10%;
}
</style>
