# Custom Text Input

This is a Vue component that provides an input field with validation and customizable styles.

## Installation

To install this component, use npm:

```shell
npm install vue-custom-text-input
```

## Props

| Prop              | Type     | Required | Default | Description                                                                                                                                                                                                                                                        |
|-------------------|----------|----------|---------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| name              | String   | true     |         | The name of the input field.                                                                                                                                                                                                                                       |
| controller        | Object   |          |         | The controller object that manages the state of the input component.                                                                                                                                                                                               |
| inputType         | String   |          | "text"  | The type of input field (e.g., "text", "password", "email", etc.).                                                                                                                                                                                                 |
| realTimeValidate  | Boolean  |          | true    | Flag indicating whether to perform real-time validation on the input field.                                                                                                                                                                                        |
| validateRule      | Array    |          |         | An array of validation rules for the input field.                                                                                                                                                                                                                  |
| label             | String   |          |         | The label text for the input field.                                                                                                                                                                                                                                |
| placeholder       | String   |          |         | The placeholder text for the input field.                                                                                                                                                                                                                          |
| disabled          | Boolean  |          | false   | Flag indicating whether the input field is disabled.                                                                                                                                                                                                               |
| isValid           | Boolean  |          | true    | Flag indicating whether the input field is valid.                                                                                                                                                                                                                  |
| isSuccess         | Boolean  |          | false   | Flag indicating whether the input field is in a success state.                                                                                                                                                                                                     |
| isError           | Boolean  |          | false   | Flag indicating whether the input field is in an error state.                                                                                                                                                                                                      |
| isOpt             | Boolean  |          | false   | Flag indicating whether the input field is optional.                                                                                                                                                                                                               |
| isReq             | Boolean  |          | false   | Flag indicating whether the input field is required.                                                                                                                                                                                                               |
| resetOnInput      | Boolean  |          | true    | Flag indicating whether to reset the input state on each input event.                                                                                                                                                                                              |
| styles            | Object   |          |         | Custom styles for the input field and related elements. See [CustomInputStyles](#custominputstyles) for more details.                                                                                                                                             |

## CustomInputState Class

The `CustomInputState` class is responsible for managing the state of the input component. It provides methods for setting the state to error or success, resetting the state, and validating the input data based on the defined validation rules.

### Constructor

The constructor of the `CustomInputState` class accepts an optional object with the following properties:

| Property           | Type     | Default | Description                                                                                                       |
|--------------------|----------|---------|-------------------------------------------------------------------------------------------------------------------|
| inputType          | String   | "text"  | The type of input field.                                                                                          |
| realTimeValidate   | Boolean  | true    | Flag indicating whether to perform real-time validation.                                                          |
| disabled           | Boolean  | false   | Flag indicating whether the input field is disabled.                                                              |
| validateRule       | Array    |         | An array of validation rules.                                                                                     |
| isError            | String   |         | Initial error message.                                                                                            |
| isSuccess          | String   |         | Initial success message.                                                                                          |
| isOpt              | Boolean  | false   | Flag indicating whether the input field is optional.                                                              |
| isReq              | Boolean  | false   | Flag indicating whether the input field is required.                                                              |

### Methods

| Method          | Description                                                                                                                                                                                                                                                          |
|-----------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
|

 error           | Set the input field state to error with the specified error message.                                                                                                                                                                                                 |
| success         | Set the input field state to success with the specified success message.                                                                                                                                                                                             |
| reset           | Reset the input field state to the default state.                                                                                                                                                                                                                    |
| validate        | Validate the input field data based on the defined validation rules.                                                                                                                                                                                                 |

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

## Example

Here's an example of how to use the Custom Input Component:

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
import {CustomInput, CustomInputState, CustomInputStyles} from 'vue-custom-text-input'

export default {
  components: {
    CustomInput
  },
  data() {
    return {
      inputController: new CustomInputState(),
      username: ''
    }
  }
}
</script>
```

This example shows how to use the Custom Input Component in a Vue component. The component is bound to the `username` data property using the `v-model` directive. The `inputController` is a custom input state controller that manages the state of the input component.

For more information and examples, refer to the [GitHub repository](https://github.com/maleeshagimshan98/vue-custom-text-input).

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