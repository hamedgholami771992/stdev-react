//in use

import React,{useEffect} from 'react'


type OptionsProps = {
  arr: {label: string | number, value: string | number}[]
  optionClickHandler: (event,value,label,obj) => void
  eachOptionClass: string
  setOptionsContainerVisible: (a: boolean) => void
}


const Options = React.forwardRef<HTMLDivElement,OptionsProps>(({setOptionsContainerVisible,arr,eachOptionClass,optionClickHandler},ref: React.MutableRefObject<HTMLDivElement>) => {

    useEffect(() => {
        // console.log('component did mount')
        //setting click event handler on optionsContainer to detect Click outside of itself
        //to hide and show itself
        const checkIfClickedOutside = e => {
            // console.log('clicked checking...')
            if (ref.current && !ref.current.contains(e.target)) {
                setOptionsContainerVisible(false)
            }
            else {
                setOptionsContainerVisible(true)
            }
          }
          document.addEventListener("mousedown", checkIfClickedOutside)
          return () => {
            // Cleanup the event listener
            // console.log('useDetectClickedInside unmounting')
            // console.log('cleaning up detectClicked handler')
            document.removeEventListener("mousedown", checkIfClickedOutside)
          }
      },[])

    const options = arr.map((o, i) => {
      return (
          <div className={eachOptionClass} onClick={(e) => optionClickHandler(e,o.value,o.label,o)} key={`ewbf${i}`}>{o.label}</div>
        );
    });

    return(
    <React.Fragment>
        {options}
    </React.Fragment>
    )
}
)


export default Options