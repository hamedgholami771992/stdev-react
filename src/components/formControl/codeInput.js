
//in use

import React, { useState, useRef ,useEffect} from "react";
import * as styles from './codeInput.module.scss'
const {codeInput,codeLabel,inputPanel,filled,valid,invalid,err} = styles

const CodeInput = ({ length, label, diabled, onComplete ,setParentValue , status ,setStatus, errorMsg ,setErrMsg}) => {
  const [code, setCode] = useState([...Array(length)].map(() => ""));
  const inputs = useRef([]);

  // Typescript
  // useRef<(HTMLInputElement | null)[]>([])

  useEffect(() => {
 
  })

  const processInput = (e, slot) => {
    const num = e.target.value;
    if (/[^0-9]/.test(num)) return;
    const newCode = [...code];
    newCode[slot] = num;
    setCode(newCode);
    setParentValue(newCode)
    setStatus(0)
    setErrMsg({msg: null})
    if (slot !== length - 1) {
      inputs.current[slot + 1].focus();
    }
    if (newCode.every(num => num !== "")) {
      onComplete(newCode.join(""));
    }
  };

  const onKeyUp = (e, slot) => {
    if (e.keyCode === 8 && !code[slot] && slot !== 0) {
      const newCode = [...code];
      newCode[slot - 1] = "";
      setCode(newCode);
      setParentValue(newCode)
      setStatus(0)
      setErrMsg({msg: null})
      inputs.current[slot - 1].focus();
    }
  };

  return (
    <div className={codeInput}>
      <label className={codeLabel}>{label}</label>
      <div className={inputPanel}>
        {code.map((num, idx) => {
          return (
            <input
              key={`${idx}-ks`}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={num}
              className={[num !== '' ? filled : '',
                          status === 1 ? valid : '',
                          status === -1 ? invalid : ''
              ].join(' ')}
              autoFocus={!code[0].length && idx === 0}
              readOnly={diabled}
              onChange={e => processInput(e, idx)}
              onKeyUp={e => onKeyUp(e, idx)}
              ref={ref => inputs.current.push(ref)}
            />
          );
        })}
      </div>
      {errorMsg &&
        <p className={err}>{errorMsg}</p>
      
    }
    </div>
  );
};

export default CodeInput;

//<CodeInput length={5} label="" disabled={inputDisabled || times === 0} setParentValue={(v) => setCode(v)} onComplete={code => { }} status={statuss} setStatus={setStatuss} errorMsg={error.msg ? error.msg : null} setErrMsg={setError}/>




// import React, { useState } from "react";
// import ReactDOM from "react-dom";

// import InputCode from "./InputCode";

// import "./styles.css";

// function App() {
//   const [diabled, setDiabled] = useState(false);
//   return (
//     <div className="App">
//       <h1>Code Input</h1>

//       <InputCode length={6} label="Code Label" diabled={diabled} onComplete={code => {
//                                                                                  setDiabled(true);
//                                                                                  setTimeout(() => setDiabled(false), 10000);
//                                                                  }}
//       />
//     </div>
//   );
// }

// const rootElement = document.getElementById("root");
// ReactDOM.render(<App />, rootElement);