import React from 'react'


const RefForwarder = (Component,props,ref) => {
    const modifiedEl = React.forwardRef((props,ref) => <Component {...props}/>)
    return(
        
    )
}