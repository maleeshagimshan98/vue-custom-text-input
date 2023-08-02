# Custom Text Input

### Table of Contents
- [Custom Text Input](#custom-text-input)
  - [Key Features](#key-features)
  - [Installation](#installation)
  - [Example](#example)
  - [Props](#props)
  - [Events](#events)
  - [Data Validation](#data-validation)
  - [CustomInputGroupController](#custominputgroupcontroller)
    - [Features](#features)
    - [Usage](#usage)
    - [Constructor](#constructor)
    - [Methods](#methods)
- [License](#license)
- [Author](#author)
- [Contribution](#contribution)

This is a versatile and powerful Vue component that provides a customizable text input field with built-in input validation and seamless management of visual states. With this component, you can easily create robust and visually appealing input forms while simplifying the process of handling input validation and error/success states.

### Key Features
- **Input Validation**: The component comes with comprehensive input validation capabilities with the help of ```validator``` library. You can define custom validation rules and easily perform real-time validation on the input field, ensuring that the entered data meets the specified criteria.

- **Real-Time Validation**: As users type in the input field, the data is continuously validated against the defined rules, providing immediate feedback on input validity.

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
      :validateCallback="validations.username"
      :styles="{
        input: {
            primary: ["border-secondary"],
            focused: ["border-primary"],
            error: ["border-danger"],
            success: ["border-success"],
          },
          label: {
            primary: ["label-secondary"],
            error: ["label-danger"],
            success: ["label-success"],
          },
          message: {
            primary: ["message-secondary"],
            error: ["message-danger"],
            success: ["message-success"],
          }
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
      validations : {
        username ({validator, data, error, success}) {
          let valid = validator.isEmpty()
          valid ? success('Your name sounds good') : error('Please enter a name')
          return valid //... must be a boolean
        },
      }
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
| [validateCallback](#data-validation)      | Function    |     false     |         | A callback function that must return a **boolean** .value                                                                                                                                                               |
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
| focus |	event	emitted when the input field receives focus. The event object is passed as a parameter. |
| input |	value	emitted when the input field value changes. The new value is passed as a parameter.|
| enter | event emitted if the focus is on the input field and the 'enter' key is pressed. The text value is passed as a parameter. |

## Data validation
To validate data input using the ````validateCallback```` prop in the component, you can pass a callback function from your parent component. This callback function will be invoked whenever there is a need to validate the input data, such as during real-time validation or when controller's ````validate()```` is invoked. The validateCallback function should return a **boolean** value indicating whether the input data is valid or not.

### Example callback function
````javascript
username ({validator, data, error, success}) {
          let valid = validator.isEmpty()
          valid ? success('Your name sounds good') : error('Please enter a name')
          return valid //... must be a boolean
        },
````


### validateCallback() parameters

| Parameter  | Description                                                                                                                                                                                       |
|------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `data`     | The current input value that needs to be validated. It represents the input data that the callback function should validate. Depending on the input type, this could be a string (for text inputs), a number (for numeric inputs), or other relevant data types.                     |
| `validator`| A `validator` library instance (e.g., `validator` imported from the `validator` library) that can be used inside the validation callback to perform additional validation checks if needed. The `validator` library provides various validation methods for different data types (e.g., email, length, URL, etc.) that can be used to validate the `data`.  |
| `error`    | A callback function provided by the `CustomInputState` class that allows you to set an error message for the input if it fails validation. You can call this function and pass the error message as a parameter to indicate that the input is invalid.                                    |
| `success`  | A callback function provided by the `CustomInputState` class that allows you to set a success message for the input if it passes validation. You can call this function and pass the success message as a parameter to indicate that the input is valid.                             |


## CustomInputGroupController

The Custom Input Group Controller is a class that provides the ability to track the state of multiple input elements and validate them as a group. It is designed to simplify the management of input states and provide a convenient way to validate inputs collectively.

## Features

- Input State Tracking: Track the state of each input element in a group using CustomInputState objects. These objects encapsulate properties like value, error message, and validation rules.

- Group Validation: Validate the entire input group collectively. The controller performs validation checks based on defined rules for each input state and provides an easy way to determine group validity.

- Customizable Validator: Customize validation rules and error messages using a custom validator. Pass the validator during initialization to define specific validation rules for the input group.

## Usage

1. Initializing the Controller: Create an instance of CustomInputGroupController.

2. Defining Input States: Use the setState method to define input states within the controller. Each state should have a unique name and a CustomInputState instance for handling validation rules, errors, and input tracking.

3. Validating the Group: Call the ````validate()```` method to validate the entire input group. The controller checks each input state based on defined rules and returns true if the group is valid, false otherwise.

4. Handling Input States: Retrieve individual input states using the getState method, providing the name of the input state. Access properties like input value, error message, and validation status.

### Constructor

```javascript
constructor()
```

The constructor initializes a new instance of the `CustomInputGroupController` class.
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
| name          | String   | ""  | The name of input field.  (**required**)     
| inputType          | String   | "text"  | The type of input field.                                                                                          |
| realTimeValidate   | Boolean  | true    | Flag indicating whether to perform real-time validation.                                                          |
| disabled           | Boolean  | false   | Flag indicating whether the input field is disabled.                                                              |
| validateCallback       | Function    |         | A callback function that must return a **boolean** .value                                                                                              |
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
  label: { // CSS classes for the label style
    primary: [],
    error: [],
    success: [],
  }    
  message: { // CSS classes for the label style
    primary: [],
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