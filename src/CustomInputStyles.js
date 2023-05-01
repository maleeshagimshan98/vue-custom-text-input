/**
 * Copyright - 2021 - Maleesha Gimshan (www.github.com/maleeshagimshan98)
 */

class CustomInputStyles {

    /**
     * 
     * @param {*} input 
     * @param {*} label 
     * @param {*} error 
     */
    constructor ({input,label,error})
    {
        this.input = {
            primary : [],
            focused : [],
            error  : [],
            success : []
        }
        this.label = []
        this.error = []

        this._init({input,label,error})
    }

    /**
     * Check if required parameters are in proper form and
     * append the parameters into an array (if a string passed)
     * 
     * @param {*} style
     * @returns {*}
     * @throws {Error}
     */
    _checkParamTypesAndPrepare (style)
    {    
        if (Array.isArray(style)) {
            return style
        }
        if (typeof style == "string") {
            return [style]
        }
        else {
            throw new Error('Type of input style is not supported')
        }
    }

    /**
     * initialize styles
     * 
     * @param {string} input 
     * @param {string} label 
     * @param {string} error 
     */
    _init ({input,label,error})
    {
        if (Object.keys(input).length > 0) {
            for (let prop in input) {
                if (!input[prop]) {
                    continue
                }
                this.input[prop] = this._checkParamTypesAndPrepare(input[prop])
            }
        }
        
        this.label = this._checkParamTypesAndPrepare(label)
        this.error = this._checkParamTypesAndPrepare(error)        
    }
}

export default CustomInputStyles;