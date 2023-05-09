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
    constructor({inputType,realTimeValidate,disabled,validateRule,isError,isSuccess, isOpt, isReq}={})
    {

        //...
        //validateRule : ['email | length > 8', 'ERROR_MESSSAGE', 'SUCCESS_MESSAGE'], etc. - refer to ''
        //isError : 'Error_Message_Here', - initialise with an error message
        //isSuccess : 'Success_Message_Here' - initialise with an error message 

        this._inputType = inputType??"text"
        this._realTimeValidate = realTimeValidate??true
        this._validateRule = validateRule??null
        this._disabled = disabled??false
        this._isValid = true        
        this._isSuccess = false
        this._isError = false
        this._isOpt = isOpt??false
        this._isReq = isReq??false
        this._validator
        this.message = ""

        isError ? this.error(isError) : isSuccess ? this.success(isSuccess) : false
    }

    /**
     * set a instance of a validator class
     * 
     * @param {*} validator
     * @returns {void}
     */
    setValidator (validator)
    {
        this._validator = validator
    }

    /**
     * returns this.isError
     * 
     * @returns {Boolean}
     */
    isError()
    {
        return this._isError
    }

    /**
     * returns this.isSuccess
     * 
     * @returns {Boolean}
     */
    isSuccess ()
    {
        return this._isSuccess
    }

    /**
     * returns true if the input is disabled
     * 
     * @returns {Boolean}
     */
    isDisabled ()
    {
        return this._disabled
    }

    /**
     * returns true if this input is optional
     * 
     * @returns {Boolean}
     */
    isOpt ()
    {
        return this._isOpt
    }

    /**
     * returns true if this input is required
     * 
     * @returns {Boolean}
     */
    isReq ()
    {
        return this._isReq
    }
    
    /**
     * set state to error
     * 
     * @param {string} message error message
     * @returns void
     */
    error(message)
    {
        this._isError = true
        this._isValid = false
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
        this._isError = false
        this._isValid = true
        this._isSuccess = true
        this.message = message
    }

    /**
     * reset state to default
     * 
     * @returns void
     */
    reset()
    {
        this._isError = false
        this._isSuccess = false
        this._isValid = false
        this.message = ""
    }

    /**
     * validate the input with the given validation rules
     * 
     * @param {String} data
     * @returns {Boolean}
     */
    validate (data)
    {
        if (!this._validator) {
            throw new Error(`A validator is not defined`)
        }

        if (!this._validateRule || this._disabled) {
            return
        }

        //... call this.error(), this.success() based on validation status

    }
}

export default CustomInputState
