import React from 'react'
import styles from './link.module.scss'
import { Link } from 'react-router-dom'

export type LinkPropsT = {
    path: string,
    title: string
}

const LinkComponent:React.FC<LinkPropsT> = (props: LinkPropsT) => {
    return(
        <Link to={{pathname: props.path}}>{props.title}</Link>
    )
}


export default LinkComponent