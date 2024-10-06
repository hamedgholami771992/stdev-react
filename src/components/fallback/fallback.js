
import React from 'react'
import SpinnerB from '../spinner/spinnerB'

const Fallback = () => {

    return (
        <div style={{position: 'relative',zIndex: '1',top: '0',left: '0',width: '100vw',height: '100vh',display: 'flex',justifyContent: 'center',alignItems: 'center',backgroundColor: 'white'}}>
            <SpinnerB/>
        </div>
    )
}


export default Fallback