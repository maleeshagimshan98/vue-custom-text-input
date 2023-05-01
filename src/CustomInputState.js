/**
 * Copyright - 2021 - Maleesha Gimshan (www.github.com/maleeshagimshan98)
 */

/**
 * State class for custom input element
 */
class CustomInputState {

    /**
     * constructor
     * 
     * @returns self
     */
    constructor({inputType,validate,label,placeholder,isError,isSuccess, isOpt, isReq}={}) {

        //...
        //validate : 'email | length > 8, etc.' - refer to ''
        //isError : 'Error_Message_Here', - initialise with an error message
        //isSuccess : 'Success_Message_Here' - initialise with an error message 

        this.inputType = inputType??"text"
        this.validate = validate??null
        this.label = label??''
        this.placeholder = placeholder??''
        this.isValid = true        
        this.isSuccess = false
        this.isError = false
        this.isOpt = false
        this.isReq = true
        this.message = ""

        isError ? this.error(isError) : isSuccess ? this.success(isError) : false
    }
    
    /**
     * set state to error
     * 
     * @param {string} message error message
     * @returns void
     */
    error(message) {
        this.isError = true
        this.message = message
    }

    /**
     * set state to success
     * 
     * @param {string} message success message
     * @return void
     */
    success (message = '')
    {
        this.isError = false
        this.isSuccess = true
        this.message = message
    }

    /**
     * reset state to default
     * 
     * @returns void
     */
    reset() {
        this.isError = false
        this.message = ""
    }
}

export default CustomInputState
