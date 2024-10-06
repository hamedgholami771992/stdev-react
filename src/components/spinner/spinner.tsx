import React from 'react'
import styles from './spinner.module.scss'
const {circle,tick} = styles

const Spinner:React.FC = () => {

    return(
        <div className={circle}>
        <div className={tick}></div>
        <div className={tick}></div>
        <div className={tick}></div>
        <div className={tick}></div>
        <div className={tick}></div>
        <div className={tick}></div>
        <div className={tick}></div>
        <div className={tick}></div>
      </div>)
}

export default Spinner