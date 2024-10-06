//in use

import IMGS_URL from '../../config.json'
import * as styles from './counter.module.scss'
import React, { useRef } from 'react'
import useDetectClickedInside from '../useDetectClickedInside'
const { counter, plus, tablet, minus } = styles

{/* <Counter setShowCounter={setShowCounter} quantity={quantity} setQuantity={setQuantity} max={20} quantityChangeHandler={quantityChangeHandler} />*/ }


const Counter = (props) => {
    const counterEl = useRef()
    const isInside = useDetectClickedInside(counterEl)
    if (!isInside) {
        props.setShowCounter(false)
    }

    const quantityChageHandler = (type) => {

        if (type === 'add') {

            props.setQuantity(prev => {
                if (prev + 1 <= props.max) {
                    return prev + 1
                }
                return prev
            })

        }
        else if (type === 'minus') {
            props.setQuantity(prev => {
                if (prev - 1 >= 0) {
                    return prev - 1
                }
                return prev
            })
        }
    }


    return (
        <div className={counter} ref={counterEl}>
            <img className={plus} src={`$IMGS_URL/plus.svg`} onClick={props.quantityChageHandler ? () => props.quantityChageHandler('add') : () => quantityChageHandler('add')} />
            <div className={tablet}>{props.quantity}</div>
            <img className={minus} src={`$IMGS_URL/minus.svg`} onClick={props.quantityChageHandler ? () => props.quantityChageHandler('minus') : () => quantityChageHandler('minus')} />
        </div>
    )
}

export default Counter