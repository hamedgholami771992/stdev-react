//in use

import React from 'react'
import styles from './spinnerB.module.scss'
const {loader,loaderBox} = styles

const SpinnerB: React.FC= (props) => {
    return(
        <div className={loaderBox}>
            <div className={loader}>
                <span style={{"--i": '1'} as React.CSSProperties}></span>
                <span style={{"--i": '2'} as React.CSSProperties}></span>
                <span style={{"--i": '3'} as React.CSSProperties}></span>
                <span style={{"--i": '4'} as React.CSSProperties}></span>
                <span style={{"--i": '5'} as React.CSSProperties}></span>
                <span style={{"--i": '6'} as React.CSSProperties}></span>
                <span style={{"--i": '7'} as React.CSSProperties}></span>
                <span style={{"--i": '8'} as React.CSSProperties}></span>
                <span style={{"--i": '9'} as React.CSSProperties}></span>
                <span style={{"--i": '10'} as React.CSSProperties}></span>
                <span style={{"--i": '11'} as React.CSSProperties}></span>
                <span style={{"--i": '12'} as React.CSSProperties}></span>
                <span style={{"--i": '13'} as React.CSSProperties}></span>
                <span style={{"--i": '14'} as React.CSSProperties}></span>
                <span style={{"--i": '15'} as React.CSSProperties}></span>
                <span style={{"--i": '16'} as React.CSSProperties}></span>
                <span style={{"--i": '17'} as React.CSSProperties}></span>
                <span style={{"--i": '18'} as React.CSSProperties}></span>
                <span style={{"--i": '19'} as React.CSSProperties}></span>
                <span style={{"--i": '20'} as React.CSSProperties}></span>
            </div>
        </div>
    )
}


export default SpinnerB