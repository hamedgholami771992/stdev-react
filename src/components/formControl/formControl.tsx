//in use

import styles from "./formControl.module.scss";
import React, { useState, useRef, ReactNode, useEffect, memo } from "react";

// import CloseDefaultSVG from '../../assets/images/closeDefault.svg'
// import CloseHoverSVG from '../../assets/images/closeHover.svg'
// import EyeImg from '../../assets/images/eyeHover.svg'
import { Images } from "../../assets/images";


import Select from "./myOwnSelect";


const {
  formControl,
  formInput,
  formLabel,
  formBtn,
  isFilled,
  hasNotValue,
  isNotValid,
  isFocusedd,
  textarea,
  dropDown,
  optionGroup,
  passToggler,
  passVisible,
  passHidden,
} = styles;



export enum InputTypes {
  textArea = "textarea",
  select = "select",
  tel = "tel",
  text = "text",
  email = "email",
  password = "password",

  
}



export type OtherInputsContent = {
  type: InputTypes.email | InputTypes.password | InputTypes.tel | InputTypes.text;
  name: string;
  placeHolder?: string;
  label?: string;
  icon?: string;
  iconHover?: string;
}
export type OtheInputsProps = {
  value: string | number
  setParentValue: (a: any) => void
  isValid: boolean
  setIsValid: (a: boolean) => void 
  errorMsg: string | null
  content: OtherInputsContent
}
//---------------------------
export type TextAreaContent = {
  type: InputTypes.textArea
  name: string
  placeHolder?: string
  label?: string
  rows?: number
}
export type TextAreaProps = {
  value: string | number
  setParentValue: (a: any) => void
  isValid: boolean
  setIsValid: (a: boolean) => void 
  errorMsg: string | null
  content: TextAreaContent
}
//-------------------------
export type SelectContent = {
  type: InputTypes.select
  name: string
  label: string
  options: {label: string | number; value: string | number}[]
}
export type SelectProps = {
  value: string | number | undefined
  isValid: boolean
  setIsValid: (a: boolean) => void 
  errorMsg: string | null
  optionChangeHandler: (event, value, label, object) => void
  content: SelectContent
}



export type WholeInputProps = SelectProps | TextAreaProps | OtheInputsProps 



const FormControl:React.FC<WholeInputProps> = (props: WholeInputProps) => {
  const [hasContent, setHasContent] = useState(props.value?.toString().length > 0); // input has content or not
  const [isFocused, setIsFocused] = useState(false); // input is focused or not
  const [isPassword, setIsPassword] = useState(true); //is used just for show/hidding password field
  const inputEl = useRef(null);


  useEffect(() => {
    props.value?.toString().length > 0 ? setHasContent(true) : setHasContent(false)
  },[props.value])

  //for all type of inputs except select
  const inputChangeHandler = (e: any) => {
    //for removing every error styling => isValid = true
    props.setIsValid(true);
    e.target.value !== "" ? setHasContent(true) : setHasContent(false);
    //transfer the value to parent
    (props as {setParentValue}).setParentValue(e.target.value);
  };

  //for all kind of inputs
  const inputFocusHandler = (e) => {
    console.log('hi')
    //for removing every error styling => isValid = true
    props.setIsValid(true)
    //to be sure we are seting focus style when input is focused
    if (document.activeElement === inputEl.current) setIsFocused(true); // for making focus styling
  };

  //for all kind of inputs
  const inputBlurHandler = (e: React.FocusEvent<HTMLElement>) => {
    //to be sure we are removing focus style when input has lost its focus
    if (document.activeElement !== inputEl.current) {
      setIsFocused(false);
    }
  };

  //for all inputs except select
  //it removes the text inside the input
  const removeHandler = (e) => {
    //value = ''
    (props as {setParentValue}).setParentValue("");
    //every validation and error styling must be removed
    props.setIsValid(true);
    setHasContent(false);
  };

  //it shows and hidden the text inside password field
  const togglePassHandler = (e) => {
    if (inputEl.current.type === "password") {
      setIsPassword(false);
    } else {
      setIsPassword(true);
    }
  };

  let element: ReactNode = "";
  switch (props.content.type) {
    case "select":
      element = (
        <Select label={props.content.label} options={props.content.options} value={props.value} ref={inputEl} onChange={(e, value, label, obj) => (props as {optionChangeHandler}).optionChangeHandler(e, value, label, obj)}/>
      );
      break;
    case "password":
      element = (<input className={formInput} type={isPassword ? "password" : "text"} name={props.content.name} id={props.content.name} ref={inputEl} onChange={inputChangeHandler} onFocus={inputFocusHandler} onBlur={inputBlurHandler} value={props.value}></input>
      );
      break;
    case "textarea":
      element = (
        <textarea className={formInput} name={props.content.name} id={props.content.name} ref={inputEl} onChange={inputChangeHandler} onFocus={inputFocusHandler} onBlur={inputBlurHandler} value={props.value} rows={props.content.rows ? props.content.rows : 5}>
          {props.value}
        </textarea>
      );
      break;
    default:
      element = (
        <input className={formInput} type={props.content.type} name={props.content.name} id={props.content.name} ref={inputEl} onChange={inputChangeHandler} onFocus={inputFocusHandler} onBlur={inputBlurHandler} value={props.value}/>
      );
  }



 
  return (
    <div
      className={[
        formControl,
        !hasContent && isFocused ? hasNotValue : "",
        !props.isValid ? isNotValid : "",
        props.value?.toString().length || isFocused ? isFocusedd : "",
        hasContent ? isFilled : "",
        styles[props.content.type],
      ].join(" ")}
      data-placeholder={(props.content as {placeHolder}).placeHolder ? (props.content as {placeHolder}).placeHolder : ''}
      data-errormsg={props.errorMsg}
    >
      {element}
   
      {/* {props.content.type == "select" ? (
        //dropIcon for select
        <img className={dropDown} src={} />
        
      ) : ''} */}
    </div>
  );
};

export default memo(FormControl);
