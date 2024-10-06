// then make use of it in the component

// const Comp = (props) => {
// 	const childEl = useRef();
//  const dispatch = useDispatch()
//  let isInside = useDetectClickedInside(childEl);
//    if(!isInside){
//        dispatch({type:'HIDE'})
//  }

// 	return (
//         	<div>
//           		<div ref={childEl}>
//           		</div>
//         	</div>
//   	);
// };



import {useState,useEffect} from 'react'

const useDetectClickedInside = (refEl) => {
    const [isInside,setIsInside] = useState(true)

    useEffect(() => {
        console.log('useDetectClickedInside mounting')
        const checkIfClickedOutside = e => {
          console.log('clicked checking...')
          if (refEl.current && !refEl.current.contains(e.target)) {
            setIsInside(false)
          }
          else {
            setIsInside(true)
          }
        }
    
    
        document.addEventListener("mousedown", checkIfClickedOutside)
    
    
        return () => {
          // Cleanup the event listener
          console.log('useDetectClickedInside unmounting')
          // console.log('cleaning up detectClicked handler')
          document.removeEventListener("mousedown", checkIfClickedOutside)
    
        }
    
      },[])

      return isInside

}


export default useDetectClickedInside