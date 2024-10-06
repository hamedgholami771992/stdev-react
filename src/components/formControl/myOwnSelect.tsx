//in use

import React, { useState, useRef, useEffect, MutableRefObject } from "react";
import styles from "./myOwnSelect.module.scss";
import Options from "./options";
import { Images } from "../../assets/images";

const {
  select,
  row,
  selected,
  icon,
  absoluteOptionsContainer,
  optionContainerIsVisible,
  option,
} = styles;
//<Select options={productInfoObj.weigthsArr} name={productInfoObj.id} id={productInfoObj.id} value={weight} onChange={(e,value,label) => setWeight(value)}/>



type MyOwnSelectProps = {
  options: {label: string | number, value: string | number }[]
  value: string | number | undefined
  label: string
  onChange: (event,value,label,obj) => void

}




const MyOwnSelect = React.forwardRef<HTMLDivElement,MyOwnSelectProps>((props, ref: MutableRefObject<HTMLDivElement>) => {
  const [selectedItem, setSelectedItem] = useState(
    props.value ? 
    props.options.find((o, i) => o.value === props.value)?.label
    :
    props.label
  );
  const [optionsContainerVisible, setOptionsContainerVisible] = useState(false);
  const optionsContainerEl = useRef<null | HTMLDivElement>(null);

  //upon update we have to update the selectedItem again
  useEffect(() => {
    setSelectedItem(
      props.value ? 
      props.options.find((o, i) => o.value === props.value).label
      :
      props.label
    );
  });

  //handler for clicking on option item
  const optionClickHandler = (e, value, label, obj) => {
    //update the current selectedItem
    setSelectedItem(label);
    //change the state of parent
    props.onChange(e, value, label, obj);
    //hidden the optionsContainer
    setOptionsContainerVisible(false);
  };

  //handler for clicking on select component
  const selectClickedHandler = () => {
    //it must triggers the optionsContainerVisible
    setOptionsContainerVisible((prev) => !prev);
  };

  return (
    <div className={select} >
      <div className={row} onClick={selectClickedHandler}>
        <div className={selected}>{selectedItem}</div>
        <img className={icon} src={Images.DownArrow} />
      </div>

      <div
        className={[
          absoluteOptionsContainer,
          optionsContainerVisible && optionContainerIsVisible,
        ].join(" ")}
        ref={optionsContainerEl}
      >
        {/*we seperate the options component to bring the event listener registeration in that component 
          because we want to mount & unmount options conditionaly based on optionsContainerVisible
          to prevent from registering numerous event listeners
        */}
        {optionsContainerVisible && (
          <Options
            arr={props.options}
            optionClickHandler={optionClickHandler}
            eachOptionClass={option}
            ref={optionsContainerEl}
            setOptionsContainerVisible={setOptionsContainerVisible}
          />
        )}
      </div>
    </div>
  );
});

export default MyOwnSelect;
