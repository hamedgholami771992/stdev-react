import React from 'react'
import styles from './nav.module.scss'
import { Images } from '../../assets/images'
import Profile from './profile'
const {nav,logoBox,menuBox} = styles


const Header:React.FC = props => {

    return(
        <nav className={nav}>
            <img className={logoBox} src={Images.Logo}/>
            <div className={menuBox}>
                <Profile />
            </div>
        </nav>
    )
}


export default Header
