import React from 'react'
import styles from './buttonA.module.scss'
import Spinner from '../spinner/spinner'
const {buttonA} = styles

export type ButtonAProps = {
    children: string | number
    onClick: (event?: any) => void
    type: 'regular' | 'add' | 'delete' | 'cancel'
  
    loading?: boolean
}

const ButtonA: React.FC<ButtonAProps> = (props: ButtonAProps) => {

    return (
        <button className={[buttonA, styles[props.type]].join(' ')} onClick={props.onClick} >
            {!props.loading ? props.children : <Spinner/>}
        </button>
    )
}

export default ButtonA
