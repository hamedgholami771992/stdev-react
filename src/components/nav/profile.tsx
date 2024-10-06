import React,{useState} from 'react'
import styles from './profile.module.scss'
import {useTypedSelector} from '../../redux/index'
import ProfileMenu from './profileMenu'
const { profileMenu, btnBox, menuBox, firstN, lastN } = styles

const Profile:React.FC = props => {
    const {firstName: reduxFirstName,lastName: reduxLastName} = useTypedSelector(state => state.user)
    const [showProfileMenu,setShowProfileMenu] = useState<boolean>(false)

   
    return(
        <div className={profileMenu} onClick={() => setShowProfileMenu(true)}>
            <div className={btnBox}>
                {reduxFirstName || reduxLastName ? `${reduxFirstName} ${reduxLastName}`: '? user'}
            </div>
            {
            showProfileMenu &&
            <div className={menuBox}>
                <ProfileMenu setShowMenu={setShowProfileMenu}/>
            </div>
            }
        </div>
    )
}


export default Profile
