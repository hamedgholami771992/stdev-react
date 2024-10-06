//in use

import React from "react";
import styles from "./check.module.scss";
const { check, input, label, fakeInput } = styles;



type CheckProps = {
  id: string
  value: boolean
  onChangeHandler: (a: any) => void
  children?: React.ReactNode
}




const Check: React.FC<CheckProps> = (props) => {


  
  return (
    <div className={check}>
      <input className={input} type="checkbox" checked={props.value} id={`${props.id}`} name={`${props.id}`} onChange={(e) => {props.onChangeHandler(e.target.checked)}}/>
      <label className={label} htmlFor={`${props.id}`}>
        <span className={fakeInput}></span>
        {props.children}
      </label>
    </div>
  );
};

export default Check;
