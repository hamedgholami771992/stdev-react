//in use


import IMGS_URL from '../../config.json'

import * as styles from './counter.module.scss'
import React from 'react'
const { counter, plus, tablet, minus } = styles

{/* <Counter quantity={quantity} setQuantity={setQuantity} max={20} quantityChangeHandler={quantityChangeHandler}/>*/ }
const Counter = (props) => {

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
        <div className={counter}>
            <img className={plus} src={`$IMGS_URL/plus.svg`} onClick={props.quantityChageHandler ? (e) => props.quantityChageHandler('add', props) : () => quantityChageHandler('add')} />
            <div className={tablet}>{props.quantity}</div>
            <img className={minus} src={`$IMGS_URL/minus.svg`} onClick={props.quantityChageHandler ? (e) => props.quantityChageHandler('minus', props) : () => quantityChageHandler('minus')} />
        </div>
    )
}

export default Counter