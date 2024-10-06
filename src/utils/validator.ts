export enum Langs {
  en = 'EN',
  fa = 'FA',
  fa_en = 'FA_EN'
}

export enum ValidatorTypes {
  name = 'NAME',
  email = 'EMAIL',
  phoneNumber = 'PHONE_NUMBER',
  password = 'PASSWORD',
  creditCardNumber = 'CREDIT_CARD_NUMBER',
  checkBox = 'CHECKBOX',
  address = 'ADDRESS',
  specificLengthNumberString = 'SPECIFIC_LENGTH_NUMBER_STRING',
  specificLengthNumber = 'SPECIFIC_LENGTH_NUMBER',
  freeLengthNumber = 'FREE_LENGTH_NUMBER',
  justNotEmpty = 'JUST_NOT_EMPTY',
  select = 'SELECT',
  minimumLengthString = 'MINIMUM_LENGTH_STRING'
}


//--------validator types----------//
type nameValidator = {
  type: ValidatorTypes.name
  value: string
  fieldName?: string
  showFieldName?: boolean
  lang: string
  nChar: number
}

type emailValidator = {
  type: ValidatorTypes.email
  value: string
  fieldName?: string
  showFieldName?: boolean
}

type phoneNumberValidator = {
  type: ValidatorTypes.phoneNumber
  value: string
  fieldName?: string
  showFieldName?: boolean
  nChar: number
}

type passwordValidator = {
  type: ValidatorTypes.password
  value: [string, string]
  fieldName?: string
  showFieldName?: boolean
  nChar: number
}

type creditCardNumberValidator = {
  type: ValidatorTypes.creditCardNumber
  value: string
  fieldName?: string
  showFieldName?: boolean
  nChar: number
}

type checkBoxValidator = {
  type: ValidatorTypes.checkBox
  value: boolean
  fieldName?: string
  showFieldName?: boolean
}

type addressValidator = {
  type: ValidatorTypes.address
  value: string
  fieldName?: string
  showFieldName?: boolean
  nChar: number
}

type specificLengthNumberStringValidator = {
  type: ValidatorTypes.specificLengthNumberString,
  value: string
  fieldName?: string
  showFieldName?: boolean
  nChar: number
}

type specificLengthNumberValidator = {
  type: ValidatorTypes.specificLengthNumber,
  value: string
  fieldName?: string
  showFieldName?: boolean
  nChar: number
}

type freeLengthNumberValidator = {
  type: ValidatorTypes.freeLengthNumber,
  value: string
  fieldName?: string
  showFieldName?: boolean
}

type justNotEmptyValidator = {
  type: ValidatorTypes.justNotEmpty,
  value: string
  fieldName?: string
  showFieldName?: boolean
}

type selectValidator = {
  type: ValidatorTypes.select,
  value: string
  fieldName?: string
  showFieldName?: boolean
  defaultSelectValue: string
}

type minimumLengthStringValidator = {
  type: ValidatorTypes.minimumLengthString,
  value: string
  fieldName?: string
  showFieldName?: boolean
  nChar: number
}


type validatorTypes = nameValidator | emailValidator | phoneNumberValidator | passwordValidator | creditCardNumberValidator |
  checkBoxValidator | addressValidator | specificLengthNumberStringValidator | specificLengthNumberValidator |
  freeLengthNumberValidator | justNotEmptyValidator | selectValidator | minimumLengthStringValidator

export const validator = (args: validatorTypes) => {
  const { type, value } = args
  const errorMsgs = []
  const inputName = args.showFieldName && args.fieldName ? args.fieldName : ''
  let stringifiedValue, length
  if (!Array.isArray(value)) {
    stringifiedValue = value.toString()
    length = stringifiedValue.length
  }
  switch (type) {
    case ValidatorTypes.name: {
      const { lang, nChar } = args
      const trimedValue = stringifiedValue.trim().replace(/ /g, '')
      if (trimedValue.length < nChar) {
        errorMsgs.push(`${inputName} must be at least ${nChar} character`)
        return { isValid: false, errs: errorMsgs }
      }
      let areAllLetters
      if (lang === Langs.en) {
        areAllLetters = (/^[A-Za-z]+$/).test(trimedValue)
        if (!areAllLetters) {
          errorMsgs.push(`${inputName} just English characters are valid`)
          return { isValid: false, errs: errorMsgs }
        }
      }
      if (lang === Langs.fa) {
        areAllLetters = (/^[\u0600-\u06FF\s]+$/).test(trimedValue)
        if (!areAllLetters) {
          errorMsgs.push(`${inputName} just Persian characters are valid`)
          return { isValid: false, errs: errorMsgs }
        }
      }
      if (lang === Langs.fa_en) {
        areAllLetters = (/^[A-Za-z]+$/).test(trimedValue) || (/^[\u0600-\u06FF\s]+$/).test(trimedValue)
        if (!areAllLetters) {
          errorMsgs.push(`${inputName} just English and Persian characters valid`)
          return { isValid: false, errs: errorMsgs }
        }
      }
      return { isValid: true, errs: [] }
    }
    case ValidatorTypes.email: {
      const trimedValue = stringifiedValue.trim()
      const emailValidationRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      const isValidEmail = (emailValidationRegex).test(trimedValue.toLowerCase())
      if (trimedValue.length === 0) {
        errorMsgs.push(`${inputName} must not be empty`)
        return { isValid: false, errs: errorMsgs }
      }
      if (!isValidEmail) {
        errorMsgs.push(`${inputName} is not a valid email`)
        return { isValid: false, errs: errorMsgs }
      }
      return { isValid: true, errs: [] }
    }

    case ValidatorTypes.phoneNumber: {
      const { nChar } = args
      const normalizedValue = value.replace('+98', '0')
      if (Array.from(normalizedValue).slice(0, 2).join('') !== '09') {
        errorMsgs.push(`${inputName} must be started with 09 or +98`)
        return { isValid: false, errs: errorMsgs }
      }
      const length = normalizedValue.length
      if (length !== nChar) {
        errorMsgs.push(`${inputName} must be ${nChar} characters`)
        return { isValid: false, errs: errorMsgs }
      }
      const areAllNumbers = (/^[0-9]+$/).test(normalizedValue)
      if (!areAllNumbers) {
        errorMsgs.push(`${inputName} must be all numbers`)
        return { isValid: false, errs: errorMsgs }
      }
      return { isValid: true, errs: [] }
    }
    case ValidatorTypes.password: {
      const { nChar } = args
      //in the case of password we get an array of valuse as a second arg [pass,cPass]
      if (value[0] !== value[1]) return { isValid: false, errs: ['passwords dont match'] }
      if (value[0].length < nChar && value[1].length < nChar) return { isValid: false, errs: [`password must be at least ${nChar} characters`] }

      //it determines whether it contains any letters or not
      const containsLetter = (/[a-z]/i).test(value[0])

      //it determins whether it contains any capital letters or not
      const containsCaps = (/[A-Z]/).test(value[0])

      //it determins whether it contains any numbers or not
      const containsNum = (/\d/).test(value[0])

      if (!containsLetter || !containsCaps || !containsNum) { return { isValid: false, errs: [`${inputName} must have at least 1 capital letter and 1 number`] } }
      return { isValid: true, errs: [] }
    }
    case ValidatorTypes.creditCardNumber: {
      const { nChar } = args
      //value without - between each four digit number
      const joinedValue = stringifiedValue.split('-').join('').trim()
      if (joinedValue.length !== nChar) {
        errorMsgs.push(`${inputName} is not a valid credit card number`)
        return { isValid: false, errs: errorMsgs }
      }
      return { isValid: true, errs: [] }
    }

    case ValidatorTypes.checkBox: {
      if (!value) return { isValid: false, errs: [`${inputName} must be accepted`] }
      return { isValid: true, errs: [] }

    }
    case ValidatorTypes.address: {
      const { nChar } = args
      const trimedValue = removeSpacesFromAnyWhere(stringifiedValue).toString()
      if (trimedValue.length <= nChar) {
        errorMsgs.push(`${inputName} is not a valid address`)
        return { isValid: false, errs: errorMsgs }
      }
      return { isValid: true, errs: [] }
    }


    case ValidatorTypes.specificLengthNumberString: {
      //where 0 behind the number is allowed
      //first we have to specify whether the required length is met
      const { nChar } = args
      const trimedValue = removeSpacesFromAnyWhere(stringifiedValue).toString()
      if (trimedValue.length !== nChar) {
        errorMsgs.push(`${inputName} must be exactly ${nChar} characters`)
        return { isValid: false, errs: errorMsgs }
      }
      const areAllNumbers = (/^[0-9]+$/).test(trimedValue)
      if (!areAllNumbers) {
        errorMsgs.push(`${inputName} must be all numbers`)
        return { isValid: false, errs: errorMsgs }
      }
      return { isValid: true, errs: [] }
    }

    case ValidatorTypes.specificLengthNumber: {
      const { nChar } = args
      //where 0 behind the number is not allowed and gets removed
      //first we have to specify whether the required length is met
      const trimedValue = removeSpacesFromAnyWhere(stringifiedValue).toString()
      if (trimedValue.length !== nChar) {
        errorMsgs.push(`${inputName} must be exactly ${nChar} characters`)
        return { isValid: false, errs: errorMsgs }
      }
      const areAllNumbers = (/^[0-9]+$/).test(trimedValue)
      if (!areAllNumbers) {
        errorMsgs.push(`${inputName} must be all numbers`)
        return { isValid: false, errs: errorMsgs }
      }
      return { isValid: true, errs: [] }
    }

    case ValidatorTypes.freeLengthNumber: {
      //where 0 behind the number is not allowed and gets removed
      //first we have to specify whether the required length is met
      const trimedValue = removeSpacesFromAnyWhere(stringifiedValue).toString()

      const areAllNumbers = (/^[0-9]+$/).test(trimedValue)
      if (!areAllNumbers) {
        errorMsgs.push(`${inputName} must be all numbers`)
        return { isValid: false, errs: errorMsgs }
      }
      return { isValid: true, errs: [] }
    }

    case ValidatorTypes.justNotEmpty: {
      const trimedValue = removeSpacesFromAnyWhere(stringifiedValue).toString()
      if (!trimedValue) {
        errorMsgs.push(`${inputName} must not be empty`)
        return { isValid: false, errs: errorMsgs }
      }
      return { isValid: true, errs: [] }
    }

    case ValidatorTypes.select: {
      const { defaultSelectValue } = args
      if (value.toString() === defaultSelectValue.toString()) {
        errorMsgs.push(`${inputName} must not selected`)
        return { isValid: false, errs: errorMsgs }
      }
      return { isValid: true, errs: [] }
    }


    case ValidatorTypes.minimumLengthString: {
      const { nChar } = args
      const trimedValue = stringifiedValue.trim()
      if (trimedValue.length < nChar) {
        errorMsgs.push(`${inputName} must be at least ${nChar} characters`)
        return { isValid: false, errs: errorMsgs }
      }
      return { isValid: true, errs: [] }
    }



    default:
      return { isValid: true, errs: [] }
  }
};





//we need a function that remove space from end and beginning of str and also from its body
const removeSpacesFromAnyWhere = (value: string | number) => {
  let trimedString = []
  Array.from(value.toString().trim()).forEach(c => {
    if (c.trim() !== "") {
      trimedString.push(c)
    }
  })
  return trimedString.join('')

}



export const justStringInputChanger = (setValue: (a: string) => void) => {
  return (val: string) => {
    //first we have to split the value
    const splittedValue = Array.from(val)
    let hasNumber = false
    splittedValue.forEach(v => {
        if(!Number.isNaN(+v)){
            hasNumber = true
        }
    })
    if(hasNumber){
        return
    }
    setValue(val)
  }
}

export const justNumberInputChanger = (setValue: (a: string) => void) => {
  return (val: string) => {
    //first we have to split the value
    const splittedValue = Array.from(val)
    let hasString = false
    splittedValue.forEach(v => {
        if(Number.isNaN(+v)){
            hasString = true
        }
    })
    if(hasString){
        return
    }
    setValue(val)
  }
}


export const justHourInputChanger = (setValue: (a: string) => void) => {
  return (val: string) => {
    //first we have to split the value
    const splittedValue = Array.from(val)
    let hasString = false
    splittedValue.forEach(v => {
        if(Number.isNaN(+v)){
            hasString = true
        }
    })
    //if the value is not a valid string
    if(hasString){
        return
    }
    //if the value is not a valid hour
    if(+val > 23 || +val < 0){
      return
    }
    setValue(val)
  }
}



export const justMinInputChanger = (setValue: (a: string) => void) => {
  return (val: string) => {
    //first we have to split the value
    const splittedValue = Array.from(val)
    let hasString = false
    splittedValue.forEach(v => {
        if(Number.isNaN(+v)){
            hasString = true
        }
    })
    //if the value is not a valid string
    if(hasString){
        return
    }
    //if the value is not a valid min
    if(+val > 59 || +val < 0){
      return
    }
    setValue(val)
  }
}





