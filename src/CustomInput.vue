/** * © Maleesha Gimshan - 2021 - github.com/maleeshagimshan98 * Custom Input Component */

<template>
  <div class="">
    <!-- label-->
    <slot name="label" :state="_state" :controller="controller" :styles="styles">
      <!-- default content -->
      <p v-bind:class="[styles.label.base, computeStyleObj(styles.label)]" v-if="_state.label">
        {{ _state.label }}
      </p>
    </slot>

    <!-- position relative -->
    <div class="custom-input-wrapper">
      <!-- position - absolute-->
      <slot name="inputEnhancements" :state="_state" :controller="controller" :styles="styles">
      </slot>
      <!-- default content -->
      <div class="input-row">
        <!-- slot for leading item before the input element -->
        <slot name="leading" :state="_state" :controller="controller" :styles="styles">
        </slot>
        <!-- input element -->
        <input :type="_state.inputType" :placeholder="_state.placeholder" :disabled="_state.isDisabled()"
          class="custom-input-el" v-bind:class="[styles.input.base, computeStyleObj(styles.input)]"
          v-bind:value="controller.getValue(name)" v-on:input="(event) => onInput(event)"
          v-on:focus.stop="(event) => focus(event)" v-on:focusout.stop="(event) => focusOut(event)"
          v-on:keyup.enter.stop="(event) => enter(event)" :ref="'input'" />
        <!-- slot for trailing item after the input element -->
        <slot name="trailing" :state="_state" :controller="controller" :styles="styles">
        </slot>
      </div>
    </div>
    <slot name="message" :state="_state" :controller="controller" :styles="styles">
      <!-- default content -->
      <p v-bind:class="[styles.message.base, computeStyleObj(styles.message)]" v-if="_state.hasMessages()">
        <!-- Show Only First Error Message Here -->
        {{ _state.messages()[0].message }}
      </p>
    </slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import type { PropType } from "vue"
import { CustomInputState } from "./CustomInputState"
import type { ValidateCallback } from "./CustomInputState"
import { CustomInputStyles, InputStyleState } from "./CustomInputStyles"
import { CustomTextInputGroupController } from "./CustomInputGroupController"

export default defineComponent({
  name: 'vue-custom-text-input',
  data: function () {
    return {
      //isTyping : false,
      _state: null as CustomInputState | null,
    }
  },
  props: {
    name: {
      type: String,
      required: true,
    },
    controller: {
      type: Object as PropType<CustomTextInputGroupController>,
      required: true,
    },
    inputType: {
      type: String,
      default: "text",
    },
    realTimeValidate: {
      type: Boolean,
      default: true,
    },
    validateCallback: {
      type: Function as unknown as () => ValidateCallback,
    },
    label: {
      type: String,
      default: '',
    },
    placeholder: {
      type: String,
      default: '',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    initSuccessMsg: {
      type: String,
    },
    initErrorMsg: {
      type: String,
    },
    isReq: {
      type: Boolean,
      default: true,
    },
    isValid: {
      type: Boolean,
      default: true,
    },
    resetOnInput: {
      type: Boolean,
      default: true,
    },
    styles: {
      type: CustomInputStyles,
      default: () => {
        return new CustomInputStyles({
          input: {
            base: [],
            primary: [],
            focused: [],
            error: [],
            success: [],
          },
          label: {
            base: [],
            primary: [],
            focused: [],
            error: [],
            success: [],
          },
          message: {
            base: [],
            primary: [],
            focused: [],
            error: [],
            success: [],
          },
        })
      },
    },
  },
  computed: {},
  components: {},
  methods: {
    computeStyleObj(elementStyle: InputStyleState): Record<string, boolean> {
      return this._state ? {
        [elementStyle.primary.join(" ")]: this._state.isValid() && !this._state.isSuccess(),
        [elementStyle.success.join(" ")]: this._state.isSuccess(),
        [elementStyle.error.join(" ")]: !this._state.isValid(),
        [elementStyle.focused.join(" ")]: this._state.isFocused(),
      } : {};
    },
    focus(event: FocusEvent) {
      this.controller.focusByName(this.name)
      this.$emit("focus", event)
    },
    focusOut(event: FocusEvent) {
      this.controller.setCurrentInputStateFocusOut()
      this.$emit("focusout", event)
    },
    enter(event: KeyboardEvent) {
      if (this.controller.focusNext()) {
        this.$emit("enter", event);
      }
      else {
        this.$emit("input-group-complete")
      }
    },
    onInput: function (event: Event) {
      //this.isTyping = true;
      if (this.resetOnInput) {
        this._state?.reset()
      }
      if (this.realTimeValidate) {
        //... validate the input
        this._state?.validate((event.target as HTMLInputElement)?.value)
      }
      this.controller.setData(this.name, (event.target as HTMLInputElement).value)
      this.$emit("input", (event.target as HTMLInputElement).value)
    },
  },
  beforeMount: async function () {
    if (this.disabled && this.isReq) {
      throw new Error(`Cannot set the properties disabled and isReq to true at same time`)
    }

    //... set the controller
    if (!this.controller) {
      throw new Error(`Controller is not injected in component -  ${this.name}`)
    }
    this.controller.setState(
      this.name,
      new CustomInputState({
        name: this.name,
        inputType: this.inputType,
        label: this.label,
        placeholder: this.placeholder,
        realTimeValidate: this.realTimeValidate,
        // validateCallback: this.validateCallback,
        disabled: this.disabled,
        initSuccessMsg: this.initSuccessMsg ?? '',
        initErrorMsg: this.initErrorMsg ?? '',
        isReq: this.isReq,
        isValid: this.isValid,
      })
    )
    this._state = this.controller.getState(this.name)
  },
  mounted() {
    this.controller.setInputRef(this.name, this.$refs.input as HTMLElement)
  },
})
</script>

<style scoped>
.custom-input-el {
  position: relative;
  /** change */
}

.custom-input-wrapper {
  position: relative;
}

.input-row {
  display: flex;
  flex-direction: row;
  align-items: center;
}
</style>
