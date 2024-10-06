//in use
import React from "react";
import * as styles from "./updatedRadio.module.css";
const { radio, input, label, fakeInput, mark } = styles;

//<Radio value={value} name="" id=""> تهران،میرداماد،خ شمس تبریزی  </Radio>

const UpdatedRadio = (props) => {
  return (
    <div className={radio}>
      <input
        className={input}
        type="radio"
        checked={props.checked}
        value={props.value}
        name={props.name}
        id={props.id}
        onChange={(e) => props.onChange(e)}
      />
      <label className={label} htmlFor={props.id}>
        <span className={fakeInput}></span>
        <div className={mark}>{props.children}</div>
      </label>
    </div>
  );
};

export default UpdatedRadio;

// const [addressesV,setAddressesV] = useState()

// useEffect(() => {
//   setAddressesV(addressDataPopulator(addressesRedux))
// },[addressesRedux])

// const addressChangeHandler = (e) => {
//   const selectedAddressValue = +e.target.value
//   setAddressesV(prev => {
//     const newAddressesArr = prev.addresses.map((c,i) => {
//       if(c.value === selectedAddressValue){
//         c.default = true
//       }
//       else {
//         c.default = false
//       }
//       return c
//     })
//     return {addresses: newAddressesArr}
//   })
// }

// const obj = {
//   addresses: [
//       {label: 'تهران، میرداماد، خیابان شمس تبریزی، کوچه رامین، پلاک 16،طبقه دوم، واحد 7',value: 1,id: 'wesad',name: 'addressOptions',default: false},
//       {label: 'تهران، میرداماد، خیابان شمس تبریزی، کوچه رامین، پلاک 16،طبقه دوم، واحد 7',value: 2,id: 'wesad2',name: 'addressOptions',default: false},
//       {label: 'آدرس جدید را وارد کنید.',value: 3,id: 'wesad3',name: 'addressOptions',default: "checked"}
//   ]
// }

// const options = props.data.addresses.map((c,i) => {
//   return(
//       <div className={addressOption} key={`sdas${i}`}>

//           <Radio  name={c.name} id={c.id} value={c.value} checked={c.default} onChange={props.addressChangeHandler}>{c.label}</Radio>

//       </div>
//   )
// })
