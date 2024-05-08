# Vue Custom Text Input

[![Documentation](https://img.shields.io/badge/Documentation-Yes-brightgreen.svg)](https://github.com/your-username/your-project/blob/main/README.md)
[![Beginner Friendly](https://img.shields.io/badge/Beginner%20Friendly-Yes-brightgreen.svg)](https://github.com/your-username/your-project/blob/main/README.md)
[![npm](https://img.shields.io/npm/v/vue-custom-text-input.svg)](https://www.npmjs.com/package/vue-custom-text-input)
[![Vue.js](https://img.shields.io/badge/Vue.js-3.x-brightgreen.svg)](https://vuejs.org/)

## 📦 Vue-Custom-Text-Input v1.2.1 Released!

**New features and improvements:**

- **Multiple validations per input:** The input field now supports multiple validations! 🎉 This means you can specify multiple validation rules for a single input field, and the input field will be considered invalid if any of the rules are not met.

- **Directly Pass Validation Callbacks for Multiple Input Components to CustomTextInputGroupController:** The ```CustomTextInputGroupController``` now allows all validation callback functions for multiple input components to be passed directly into constructor.
  ````
  let controller = new CustomTextInputGroupController({
    inputName1 : validationCallback ({validator, data, errorCallback, successCallback}) => {}
    inputName2 : validationCallback ({validator, data, errorCallback, successCallback}) => {}        
  })
  ````

- **Focus on enter key:** The input field now supports focus on enter key. This means that when the enter key is pressed while another input field is focused, the next input field will automatically receive focus.

- **New events:** We've added the following new events:

  - `focus`: This event is emitted when the input field receives focus.
  - `focusout`: This event is emitted when the input field loses focus.️
  - `enter`: This event is emitted when the enter key is pressed while the input field is focused. ↩️

- **New slot:** Introducing the `inputEnhancements` slot! This slot allows you to add additional elements to the input field, such as icons or buttons.

- **Improved styling:** We've given the input field a fresh new look to improve its appearance and usability. ✨

- **Bug fixes:** We've squashed a few bugs to make the input field even more reliable. 🐛🚫

### Table of Contents

- [Vue Custom Text Input](#vue-custom-text-input)
  - [Key Features](#key-features)
  - [Installation](#installation)
  - [Example](#example)
  - [Props](#props)
  - [Events](#events)
  - [Data Validation](#data-validation)
  - [CustomTextInputGroupController](#CustomTextInputGroupController)
    - [Features](#features)
    - [Usage](#usage)
    - [Constructor](#constructor)
    - [Methods](#methods)
- [License](#license)
- [Author](#author)
- [Contribution](#contribution)

This is a versatile and powerful Vue component that provides a customizable text input field with built-in input validation and seamless management of visual states. With this component, you can easily create robust and visually appealing input forms while simplifying the process of handling input validation and error/success states.

### Key Features

- **Input Validation**: The component comes with comprehensive input validation capabilities with the help of `validator` library. You can define custom validation rules and easily perform real-time validation on the input field, ensuring that the entered data meets the specified criteria.

- **Real-Time Validation**: As users type in the input field, the data is continuously validated against the defined rules, providing immediate feedback on input validity.

- **Visual State Management**: Managing the visual states of the input component has never been easier. The component allows you to effortlessly handle error and success states, providing visual cues to users based on the input's validity. You can easily customize the styles for error and success states, making it seamless to adapt the component to match your application's design.

- **Flexible Configuration** : The Custom Text Input component offers a wide range of configuration options. You can customize various aspects of the input, such as the input type, label, placeholder, and disabled state. Additionally, you have the flexibility to define whether the input is optional or required, and you can choose to reset the input state on each input event.

- **Reusable and Composable** : Designed with reusability in mind, the Vue Custom Text Input component can be easily integrated into any Vue application or component. It promotes composability by providing a clean and straightforward API for interacting with the input component and managing its state.

## Installation

To install this component, use npm:

```shell
npm install vue-custom-text-input
```

## Example

Here's an example of how to use the Custom Input Component.

This example shows how to use the Custom Input Component in a Vue component. The component is bound to the `username` data property using the `v-model` directive. The `inputController` is state controller that manages and validates the state of the input component.

```vue
<template>
  <div>
    <custom-input
      name="username"
      :controller="inputController"
      inputType="text"
      :label="'Username'"
      :placeholder="'Enter your username'"
      :validateCallback="validations.username"
      :styles="styles"
      v-model="username" />
  </div>
</template>

<script>
import {CustomInput, CustomTextInputGroupController, CustomInputStyles, Utils} from 'vue-custom-text-input'

export default {
  components: {
    CustomInput
  },
  data() {
    return {
      inputController: new CustomTextInputGroupController(),

      /**
       * =========================================
       * now allows all validation callback functions for multiple input components to be passed
       * directly into constructor.
       * 
       * inputController: new CustomTextInputGroupController({
       *   inputName1 : validationCallback ({validator, data, error, success}) => {}
       *   inputName2 : validationCallback ({validator, data, error, success}) => {}
       * }),
       * ==========================================
       */


      styles : { 
        input: { 
          primary: ["border-secondary"],
          error: ["border-danger"],
          success: ["border-success"],
        },
        label: {
          primary: ["label-secondary"],
          focued : ["label-focused"],
          error: ["label-danger"],
          success: ["label-success"],
        },
        message: {
          primary: ["message-secondary"],
          focued : ["message-focused"],
          error: ["message-danger"],
          success: ["message-success"],
          }
      },
      validations : {
        username () {
          return ({validator, data, error, success}) => {
            validator.isEmpty() ? success('Your name sounds good') : error('Please enter a name')
          }
        },
      }
      username: ''
    }
  }
}
</script>
```

## Props

| Prop                                 | Type                       | Required | Default           | Description                                                                                                           |
| ------------------------------------ | -------------------------- | -------- | ----------------- | --------------------------------------------------------------------------------------------------------------------- |
| name                                 | String                     | true     |                   | The name of the input field.                                                                                          |
| controller                           | CustomTextInputGroupController | true     |                   | The controller object that manages the state of the input component.                                                  |
| inputType                            | String                     | false    | "text"            | The type of input field (e.g., "text", "password", "email", etc.).                                                    |
| realTimeValidate                     | Boolean                    | false    | true              | Flag indicating whether to perform real-time validation on the input field.                                           |
| [validateCallback](#data-validation) | Function                   | false    |                   | A callback function that must return a **closure**                                                                    |
| label                                | String                     | false    |                   | The label text for the input field.                                                                                   |
| placeholder                          | String                     | false    |                   | The placeholder text for the input field.                                                                             |
| disabled                             | Boolean                    | false    | false             | Flag indicating whether the input field is disabled.                                                                  |
| initSuccessMsg                       | String                     | false    |                   | Create the input field in a success state with the given message.                                                     |
| initErrorMsg                         | String                     | false    |                   | Create the input field in a error state with the given message.                                                       |
|                                      |
| isReq                                | Boolean                    | false    | false             | Flag indicating whether the input field is required.                                                                  |
| isValid                              | Boolean                    | false    | true              | Flag indicating whether the input field is valid at the creation.                                                     |
| resetOnInput                         | Boolean                    | false    | true              | Flag indicating whether to reset the input state on each input event.                                                 |
| styles                               | CustomInputStyles          | false    | CustomInputStyles | Custom styles for the input field and related elements. See [CustomInputStyles](#custominputstyles) for more details. |

## Events

| Event Parameters | Description                                                                                                               |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------- |
| focus            | event emitted when the input field receives focus. The event object is passed as a parameter.                             |
| focusout         | event emitted when the input field get out of focus. The event object is passed as a parameter.                           |
| input            | value emitted when the input field value changes. The new value is passed as a parameter.                                 |
| enter            | event emitted if the focus is on the input field and the 'enter' key is pressed. The text value is passed as a parameter. |

## Slots

| Slot Name         | Available Slot Props      | Fallback Content                                                        |
| ----------------- | ------------------------- | ----------------------------------------------------------------------- |
| label             | state, controller, styles | `<p>{{ _state.label }}</p>`                                             |
| inputEnhancements | state, controller, styles | None                                                                    |
| message           | state, controller, styles | `<p v-if="_state.hasMessages()">{{ _state.messages()[0].message }}</p>` |

## Data validation

To validate data input using the `validateCallback` prop in the component, you can pass a callback function from your parent component. This callback function will be invoked whenever there is a need to validate the input data, such as during real-time validation or when controller's `validate()` is invoked.

The validateCallback function should return a **closure** in which you validate the input data with passed parameters.

### Example callback function

```javascript
username () {
  return ({validator, data, error, success, reset}) => {
          validator.isEmpty()
          valid ? success('Your name sounds good') : error('Please enter a name')

          //... add another validation function call
  },
}
```

### validateCallback closure parameters

| Parameter   | Description                                                                                                                                                                                                                                                                                                                                                |
| ----------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `data`      | The current input value that needs to be validated. It represents the input data that the callback function should validate. Depending on the input type, this could be a string (for text inputs), a number (for numeric inputs), or other relevant data types.                                                                                           |
| `validator` | A `validator` library instance (e.g., `validator` imported from the `validator` library) that can be used inside the validation callback to perform additional validation checks if needed. The `validator` library provides various validation methods for different data types (e.g., email, length, URL, etc.) that can be used to validate the `data`. |
| `error`     | A callback function provided by the `CustomInputState` class that allows you to set an error message for the input if it fails validation. You can call this function and pass the error message as a parameter to indicate that the input is invalid.                                                                                                     |
| `success`   | A callback function provided by the `CustomInputState` class that allows you to set a success message for the input if it passes validation. You can call this function and pass the success message as a parameter to indicate that the input is valid.                                                                                                   |

## CustomTextInputGroupController

The Custom Input Group Controller is a class that provides the ability to track the state of multiple input elements and validate them as a group. It is designed to simplify the management of input states and provide a convenient way to validate inputs collectively.

## Features

- Input State Tracking: Track the state of each input element in a group using CustomInputState objects. These objects encapsulate properties like value, error message, and validation rules.

- Group Validation: Validate the entire input group collectively. The controller performs validation checks based on defined rules for each input state and provides an easy way to determine group validity.

- Customizable Validator: Customize validation rules and error messages using a custom validator. Pass the validator during initialization to define specific validation rules for the input group.

## Usage

1. Initializing the Controller: Simply instantiate a CustomTextInputGroupController. Rather than passing individual input validations to each component as a prop, you can now directly provide them to the constructor for multiple components.

2. Defining Input States: Use the setState method to define input states within the controller. Each state should have a unique name and a CustomInputState instance for handling validation rules, errors, and input tracking.

3. Validating the Group: Call the `validate()` method to validate the entire input group. The controller checks each input state based on defined rules and returns true if the group is valid, false otherwise.

4. Handling Input States: Retrieve individual input states using the getState method, providing the name of the input state. Access properties like input value, error message, and validation status.

### Constructor

```javascript
constructor(validations=null)
```

The constructor initializes a new instance of the `CustomTextInputGroupController` class.

### Methods

| Method | Description |
|---|---|
| `getState(name)` | Returns the `CustomInputState` object for the given input name. |
| `setState(name, state)` | Sets the `CustomInputState` object for the given input name. |
| `setData(name, data)` | Sets the input value for the corresponding input name. |
| `getAllData()` | Returns the whole input values as key-value pairs. |
| `getValue(name)` | Returns the value of a single input provided the input's name. |
| `getInputRefInstance(name)` | Get a component instance by name |
| `setInputRefInstance(name, component)` | Set a component instance |
| `focusNext()` | Focus the next input element |
| `focusByName(name)` | Focus a provided input element by a name |
| `setStateError(name, message)` | Sets an error message for the given input name. |
| `setStateSuccess(name, message)` | Sets a success message for the given input name. |
| `resetState(name)` | Resets the state of the input with the given name. |
| `resetAllStates()` | Reset all the state in the controller. |
| `resetAllData()` | Reset all the data of the inputs in the controller. |
| `validate()` | Validates the input group and returns `true` if all inputs are valid, otherwise `false`. |

## CustomInputState Class - _(used internally_)

The `CustomInputState` class is used internally for managing the state of the input component. It provides methods for setting the state to error or success, resetting the state, and validating the input data based on the defined validation rules.

### Constructor

The constructor of the `CustomInputState` class accepts an optional object with the following properties:

| Property         | Type     | Default | Description                                               |
| ---------------- | -------- | ------- | --------------------------------------------------------- |
| name             | String   | ""      | The name of input field. (**required**)                   |
| inputType        | String   | "text"  | The type of input field.                                  |
| label            | String   | ""      | The label of input field.                                 |
| placeholder      | String   | ""      | The placeholder of input field.                           |
| realTimeValidate | Boolean  | true    | Flag indicating whether to perform real-time validation.  |
| validateCallback | Function |         | A callback function that must return a **boolean** .value |
| disabled         | Boolean  | false   | Flag indicating whether the input field is disabled.      |
| initErrorMsg     | String   | ""      | Initial error message.                                    |
| initSuccessMsg   | String   | ""      | Initial success message.                                  |
| isReq            | Boolean  | false   | Flag indicating whether the input field is required.      |
| isValid          | Boolean  | true    | Flag indicating whether the input field is valid.         |

**Note:** The `isError` and `isSuccess` properties have been removed in favor of the `initErrorMsg` and `initSuccessMsg` properties.

### Methods

| Method   | Description                                                              |
| -------- | ------------------------------------------------------------------------ |
| error    | Set the input field state to error with the specified error message.     |
| success  | Set the input field state to success with the specified success message. |
| reset    | Reset the input field state to the default state.                        |
| validate | Validate the input field data based on the defined validation rules.     |

## CustomInputStyles

The `styles` prop allows you to customize the styles of the input field and related elements. It should be an object with the following structure:

```javascript
{
  input: {
    base: [],  // base classes array for component elements
    primary: [],    // CSS classes for the primary input style
    error: [],      // CSS classes for the error input style
    success: []     // CSS classes for the success input style
  },
  label: { // CSS classes for the label style
    base: [],
    primary: [], // base classes array for component elements
    focused: [],    // CSS classes for the focused label style
    error: [],
    success: [],
  }
  message: { // CSS classes for the label style
    base: [], // base classes array for component elements
    primary: [],
    focused: [],    // CSS classes for the focused message style
    error: [],
    success: [],
  }
}
```

You can customize each style by providing an array of CSS classes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Author

- [Maleesha Gimshan](https://github.com/maleeshagimshan98)

## Contribution

Contributions are welcome and appreciated. If you have any suggestions, please fork the project, create a new branch, make your changes, and then submit a pull request. You can also open an issue if you want to suggest an enhancement.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request
