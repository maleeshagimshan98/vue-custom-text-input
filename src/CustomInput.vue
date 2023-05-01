/**
 * © Maleesha Gimshan - 2021 - github.com/maleeshagimshan98
 * Custom Input Component
 */

<template>
  <div class="">
    <!-- label-->
    <p class="input-label" v-bind:class="styles.label" v-if="state.label">
      {{state.label}}    
    </p>
    <input
      :type="state.inputType"
      :placeholder="state.placeholder"
      class="custom-input-el"
      v-bind:class="
      !state.isError ? state.isSuccess ? styles.input.success : styles.input.primary : styles.input.error"
      v-on:input="event => onInput(event)"
      v-on:focus="event => $emit('focus',event)"
    />
    <p
      class="input-message"
      v-bind:class="styles.error"
      v-if="state.isError"
    >
      <!-- Show  Error Messages Here -->
      {{ state.message }}
    </p>
  </div>
</template>

<script>
import  CustomInputState from "./CustomInputState.js";
import CustomInputStyles from "./CustomInputStyles.js";

/**
 * =========================================================
 * check if scoped styles defined in an outer component, can be applied to child one
 * as this component is depending on parent's scoped styles.
 * 
 * if not working, change customInputStyles from classes to styles
 * =========================================================
 */


export default  {
  data: function () {
    return {
      //isTyping : false,
    };
  },
  props: {
    state: {
      type: Object,
      default: () => {
        return new CustomInputState();
      },
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
              focused : ['border-primary'],
              error: ['border-danger'],
              success: ['border-success']
            },
            label: [],
            error: ['text-danger']
          }
        );
      }
    },
  }, 
  computed: {},
  components: {
  },
  methods: {    
    onInput: function (event) {
      //this.isTyping = true;
      if (this.resetOnInput) {
        this.state.reset();
      }      
      this.$emit("input", event.target.value);
    },
  },
  mounted: async function () {},
};
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
  background : '';
  color : black /** change */
}

.input-message {
  margin: 0;
}

.input-message.success {
  color: green; /** change */
}

.input-message.error {
  color: red; /** change */
}

</style>>