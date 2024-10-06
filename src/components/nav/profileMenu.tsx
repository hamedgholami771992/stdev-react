import React, { useRef, useEffect } from 'react'
import styles from './profileMenu.module.scss'
import { NavLink } from 'react-router-dom'
import { PATHES } from '../../utils/constants'
import useDetectClickedInside from '../customHooks/useDetectClickedInside'
import { useLocation } from 'react-router-dom'
import { useDispatch, UserReduxActionsT, UserReduxActionTypesT, useTypedSelector } from '../../redux/index'
import { useNavigate } from 'react-router-dom'
import { sendLogoutRequset } from '../../utils/requests'
import { toast } from 'react-toastify'

const { menu, menuItem, activeItem } = styles


type ProfileMenuProps = {
    setShowMenu: (b: boolean) => void,
}


const ProfileMenu: React.FC<ProfileMenuProps> = (props: ProfileMenuProps) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { accessToken, refreshToken } = useTypedSelector(state => state.user)
    const menuEl = useRef();

    let isInside = useDetectClickedInside(menuEl);
    useEffect(() => {
        if (!isInside) {
            props.setShowMenu(false)
        }
    })

    const signOutHandler = (e: React.MouseEvent<HTMLLIElement>) => {
        e.preventDefault()
        dispatch({ type: UserReduxActionTypesT.removeAuthUser })
        navigate({ pathname: PATHES.login }, { replace: true })

    }

    return (
        <ul className={menu} ref={menuEl}>
            <li className={menuItem} onClick={signOutHandler}>sign out</li>
        </ul>
    )
}

export default ProfileMenu
