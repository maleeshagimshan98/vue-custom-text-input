# Custom Text Input

This is a versatile and powerful Vue component that provides a customizable text input field with built-in input validation and seamless management of visual states. With this component, you can easily create robust and visually appealing input forms while simplifying the process of handling input validation and error/success states.

### Key Features
Input Validation: The Custom Text Input component comes with comprehensive input validation capabilities. You can define custom validation rules and easily perform real-time validation on the input field, ensuring that the entered data meets the specified criteria.

- **Visual State Management**: Managing the visual states of the input component has never been easier. The component allows you to effortlessly handle error and success states, providing visual cues to users based on the input's validity. You can easily customize the styles for error and success states, making it seamless to adapt the component to match your application's design.

- **Flexible Configuration** : The Custom Text Input component offers a wide range of configuration options. You can customize various aspects of the input, such as the input type, label, placeholder, and disabled state. Additionally, you have the flexibility to define whether the input is optional or required, and you can choose to reset the input state on each input event.

- **Reusable and Composable** : Designed with reusability in mind, the Custom Text Input component can be easily integrated into any Vue application or component. It promotes composability by providing a clean and straightforward API for interacting with the input component and managing its state.

## Installation

To install this component, use npm:

```shell
npm install vue-custom-text-input
```

## Example

Here's an example of how to use the Custom Input Component.

This example shows how to use the Custom Input Component in a Vue component. The component is bound to the `username` data property using the `v-model` directive. The `inputController` is a custom input state controller that manages and validates the state of the input component.

```vue
<template>
  <div>
    <custom-input
      name="username"
      :controller="inputController"
      inputType="text"
      :label="'Username'"
      :placeholder="'Enter your username'"
      :styles="{
        input: {
          primary: ['border-primary'],
          focused: ['border-secondary'],
          error: ['border-danger'],
          success: ['border-success']
        },
        label: ['text-primary'],
        errorMessage: ['text-danger'],
        successMessage: ['text-success']
      }"
      v-model="username"
    />
  </div>
</template>

<script>
import {CustomInput, CustomInputGroupController, CustomInputStyles} from 'vue-custom-text-input'

export default {
  components: {
    CustomInput
  },
  data() {
    return {
      inputController: new CustomInputGroupController(),
      username: ''
    }
  }
}
</script>
```

## Props

| Prop              | Type     | Required | Default | Description                                                                                                                                                                                                                                                        |
|-------------------|----------|----------|---------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| name              | String   | true     |         | The name of the input field.                                                                                                                                                                                                                                       |
| controller        | CustomInputGroupController    |   true       |         | The controller object that manages the state of the input component.                                                                                                                                                                                               |
| inputType         | String   |    false      | "text"  | The type of input field (e.g., "text", "password", "email", etc.).                                                                                                                                                                                                 |
| realTimeValidate  | Boolean  |     false     | true    | Flag indicating whether to perform real-time validation on the input field.                                                                                                                                                                                        |
| validateRule      | Array    |          |         | An array of validation rules for the input field.                                                                                                                                                                                                                  |
| label             | String   |          |         | The label text for the input field.                                                                                                                                                                                                                                |
| placeholder       | String   |          |         | The placeholder text for the input field.                                                                                                                                                                                                                          |
| disabled          | Boolean  |   false       | false   | Flag indicating whether the input field is disabled.                                                                                          |
| isSuccess         | Boolean  |   false       | false   | Indicate whether the input field is in a success state when rendering.       |
| isError           | Boolean  |     false     | false   | Indicate whether whether the input field is in an error state when rendering.                                                                                                                                                                                                      |
| isOpt             | Boolean  |  false        | false   | Flag indicating whether the input field is optional.                                                                                                                                                                                                               |
| isReq             | Boolean  |  false        | false   | Flag indicating whether the input field is required.                                                                                                                                                                                                               |
| resetOnInput      | Boolean  |          | true    | Flag indicating whether to reset the input state on each input event.                                                                                                                                                                                              |
| styles            | Object   |  false        |         | Custom styles for the input field and related elements. See [CustomInputStyles](#custominputstyles) for more details.  

## Events

|Event Parameters |	Description |
|-------------------------|--------------|
| focus |	event	Emitted when the input field receives focus. The event object is passed as a parameter. |
| input |	value	Emitted when the input field value changes. The new value is passed as a parameter.|

## CustomInputGroupController

The `CustomInputGroupController` is a helper class that manages the states and validation of the input group. It provides various methods to interact with the input group. Below is an overview of its constructor and methods.

### Constructor

```javascript
constructor(validator = null)
```

The constructor initializes a new instance of the `CustomInputGroupController` class.

| Parameter  | Type                  | Description                                      | Default |
| -----------| --------------------- | ------------------------------------------------ | ------- |
| validator  | `CustomInputState`    | Optional. The validator to be used for validation. | `null`  |

### Methods

| Method                        | Description                                                                                     |
| ------------------------------| ----------------------------------------------------------------------------------------------- |
| `getState(name)`              | Returns the `CustomInputState` object for the given input name.                                 |
| `setState(name, state)`       | Sets the `CustomInputState` object for the given input name.                                     |
| `setData(name, data)`         | Sets the input value for the corresponding input name.                                          |
| `getData(name = '')`          | Returns either the value of a single input if provided the input's name, or the whole input group as key-value pairs. |
| `setStateError(name, message)`   | Sets an error message for the given input name.                                                 |
| `setStateSuccess(name, message)` | Sets a success message for the given input name.                                                |
| `resetState(name)`              | Resets the state of the input with the given name.                                              |
| `validate()`                | Validates the input group and returns `true` if all inputs are valid, otherwise `false`.        |                                                                                                |

## CustomInputState Class - *(used internally*)

The `CustomInputState` class is used internally for managing the state of the input component. It provides methods for setting the state to error or success, resetting the state, and validating the input data based on the defined validation rules.

### Constructor

The constructor of the `CustomInputState` class accepts an optional object with the following properties:

| Property           | Type     | Default | Description                                                                                                       
|--------------------|----------|---------|-----------------------------|
| inputType          | String   | "text"  | The type of input field.                                                                                          |
| realTimeValidate   | Boolean  | true    | Flag indicating whether to perform real-time validation.                                                          |
| disabled           | Boolean  | false   | Flag indicating whether the input field is disabled.                                                              |
| validateRule       | Array    |         | An array of validation rules.                                                                                     |
| isError            | String   |         | Initial error message.                                                                                            |
| isSuccess          | String   |         | Initial success message.                                                                                          |
| isOpt              | Boolean  | false   | Flag indicating whether the input field is optional.                                                              |
| isReq              | Boolean  | false   | Flag indicating whether the input field is required.                                                              |

### Methods

| Method | Description |
|----------|--------------|
| error | Set the input field state to error with the specified error message. |
| success | Set the input field state to success with the specified success message. |
| reset | Reset the input field state to the default state. |
| validate | Validate the input field data based on the defined validation rules. |

## CustomInputStyles

The `styles` prop allows you to customize the styles of the input field and related elements. It should be an object with the following structure:

```javascript
{
  input: {
    primary: [],    // CSS classes for the primary input style
    focused: [],    // CSS classes for the focused input style
    error: [],      // CSS classes for the error input style
    success: []     // CSS classes for the success input style
  },
  label: [],        // CSS classes for the label style
  errorMessage: [], // CSS classes for the error message style
  successMessage: [] // CSS classes for the success message style
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