/** * © Maleesha Gimshan - 2021 - github.com/maleeshagimshan98 * Custom Input Component */

<template>
  <div class="">
    <!-- label-->
    <slot name="label" :state="_state" :controller="controller" :styles="styles">
      <!-- default content -->
      <label :for="props.name" v-bind:class="[_styleObj.label.base, computeStyleObj(_styleObj.label)]" v-if="_state.label">
        {{ _state.label }}
      </label>
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
        <input :name="props.name" :type="_state.inputType" :placeholder="_state.placeholder" :disabled="_state.isDisabled() || false"
          class="custom-input-el" v-bind:class="[_styleObj.input.base, computeStyleObj(_styleObj.input)]"
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
      <p v-bind:class="[_styleObj.message.base, computeStyleObj(_styleObj.message)]" v-if="_state.hasMessages()">
        <!-- Show Only First Error Message Here -->
        {{ _state.messages()[0]?.message }}
      </p>
    </slot>
  </div>
</template>

<script setup lang="ts">
// import { defineComponent } from "vue"
import type { PropType } from "vue"
import { ref, onBeforeMount, onMounted, defineEmits, } from "vue"
import { CustomInputState } from "./CustomInputState"
import type { ValidateCallback } from "./CustomInputState"
import { CustomInputStyles, InputStyleState } from "./CustomInputStyles"
import { CustomTextInputGroupController } from "./CustomInputGroupController"

const emit = defineEmits(['focus', 'input', 'focusout', 'enter', 'input-group-complete']);
const input = ref(null);

const props = defineProps({
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
});

const _styleObj = props.styles.getStyles();

const inputState = new CustomInputState({
  name: props.name,
  inputType: props.inputType,
  label: props.label,
  placeholder: props.placeholder,
  realTimeValidate: props.realTimeValidate,
  // validateCallback: props.validateCallback,
  disabled: props.disabled,
  initSuccessMsg: props.initSuccessMsg ?? '',
  initErrorMsg: props.initErrorMsg ?? '',
  isReq: props.isReq,
  isValid: props.isValid,
});
const _state = ref<CustomInputState>(inputState);

function computeStyleObj(elementStyle: InputStyleState): Record<string, boolean> {
  return {
    [elementStyle.primary.join(" ")]: _state.value.isValid() && !_state.value.isSuccess(),
    [elementStyle.success.join(" ")]: _state.value.isSuccess(),
    [elementStyle.error.join(" ")]: !_state.value.isValid(),
    [elementStyle.focused.join(" ")]: _state.value.isFocused(),
  };
};

function focus(event: FocusEvent): void {
  props.controller.focusByName(props.name)
  emit("focus", event)
}

function focusOut(event: FocusEvent): void {
  props.controller.setCurrentInputStateFocusOut()
  emit("focusout", event)
}

function enter(event: KeyboardEvent): void {
  if (props.controller.focusNext()) {
    emit("enter", event);
  }
  else {
    emit("input-group-complete")
  }
}

function onInput (event: Event): void {
  //this.isTyping = true;
  if (props.resetOnInput) {
    _state.value.reset()
  }
  if (props.realTimeValidate) {
    //... validate the input
    _state.value.validate((event.target as HTMLInputElement)?.value)
  }
  props.controller.setData(props.name, (event.target as HTMLInputElement).value)
  emit("input", (event.target as HTMLInputElement).value)
}

onBeforeMount(() => {
  if (props.disabled && props.isReq) {
    throw new Error(`Cannot set the properties disabled and isReq to true at same time`)
  }

  //... set the controller
  if (!props.controller) {
    throw new Error(`Controller is not injected in component -  ${props.name}`)
  }

  props.controller.setState(
    props.name,
    inputState,
  )
});

onMounted(() => {
  props.controller.setInputRef(props.name, input.value as unknown as HTMLElement)
});
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
