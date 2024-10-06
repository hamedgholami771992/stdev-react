//in use

import React,{useEffect} from 'react'
import * as styles from './toastify.module.scss'
import {useSelector,useDispatch} from 'react-redux'
const {toastify} = styles


//type === failure    success
//it watches some states in redux store and the if there were some values in them
//then it show itself to the user 
//after some time it hides itself from the user 
//and refresh the redux store

const Toastify = props => {
    const {msg,type,timeOfVisibility} = useSelector(state => state.toastify)
    const dispatch = useDispatch()





    useEffect(() => {
        if(msg && type && timeOfVisibility){
            props.toastifyToggler('show')

            setTimeout(() => {
                props.toastifyToggler('hide')
                dispatch({type: 'SHOW_TOASTIFY',payload: {type: null,msg: null,timeOfVisibility: null}})
            },timeOfVisibility)
        }
    })

    return(
        <div className={[toastify,type ? type : ''].join(' ')}>
            {msg}
        </div>
    )
}


export default Toastify