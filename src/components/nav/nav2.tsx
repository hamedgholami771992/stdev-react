import styles from './nav2.module.scss'
import React from 'react'
import { useDispatch, UserReduxActionTypesT, useTypedSelector } from '../../redux'
import { useNavigate } from 'react-router-dom'
import { PATHES } from '../../utils/constants'
import { useSelector } from 'react-redux'

const Nav2: React.FC = () => {

    const { image: userImage, firstName: userFirstName, lastName: userLastName, isActive } = useTypedSelector(state => state.user)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const logoutHandler = () => {
        dispatch({ type: UserReduxActionTypesT.removeAuthUser })
        navigate({ pathname: PATHES.login }, { replace: true })
    }
    return (
        <div className={styles.nav}>
            <a href="" className={styles.link}>Posts</a>
            <div className={styles.infoBox}>
                <div className={styles.imgBox}>
                    <img src={userImage} alt="" />
                </div>
                <span className={styles.name}>{userFirstName} {userLastName}</span>
                <span className={styles.logout} onClick={logoutHandler}>Logout</span>
            </div>
        </div>
    )
}

export default Nav2
