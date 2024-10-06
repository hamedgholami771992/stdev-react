import styles from './profile.module.scss'
import React from 'react'
import MainPanel from '../../components/panels/mainPanel/mainPanel'
import { ButtonAProps } from '../../components/buttons/buttonA'
import Template from '../../components/template/template'
import { useTypedSelector } from '../../redux/index'
import { useNavigate } from 'react-router-dom'
import { PATHES } from '../../utils/constants'

const { profile, container, item, itemLabel, itemValue, firstName, lastName, email, phoneNumber, userName, role } = styles

const Profile: React.FC = props => {
    const { user: userRedux, } = useTypedSelector(state => ({ user: state.user, }))
    const navigate = useNavigate()



    let btnPropsArr: ButtonAProps[] = []




    return (
        <Template>
            <div className={profile}>
                <MainPanel title='Your profile' headButtons={[...btnPropsArr]}>
                    <div className={container}>
                        <div className={[item, firstName].join(' ')}>
                            <div className={itemLabel}>first name</div>
                            <div className={itemValue}>{userRedux.firstName ? userRedux.firstName : ''}</div>
                        </div>
                        <div className={[item, lastName].join(' ')}>
                            <div className={itemLabel}>last name</div>
                            <div className={itemValue}>{userRedux.lastName ? userRedux.lastName : ''}</div>
                        </div>

                        <div className={[item, email].join(' ')}>
                            <div className={itemLabel}>email</div>
                            <div className={itemValue}>{userRedux.email ? userRedux.email : ''}</div>
                        </div>
                    </div>
                </MainPanel>
            </div>
        </Template>
    )
}

export default Profile

