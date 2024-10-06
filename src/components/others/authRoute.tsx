import React,{useEffect,useState} from 'react'
import {sendGetUserInfoRequset, GetUserInfoResponseT} from '../../utils/requests'
import {useTypedSelector, useDispatch,UserReduxActionTypesT} from '../../redux/index'
import { useNavigate,Navigate } from 'react-router-dom'
import SpinnerB from '../spinner/spinnerB'
import {PATHES} from '../../utils/contants'
import {toast} from 'react-toastify'


enum ValidationStatuses {
    notValidatedYet = 'NOT_VALIDATED_YET',
    isValid = 'IS_VALID',
    isInValid = 'IS_INVALID'
}


type AuthRouteProps = {
    children: React.ReactNode
}



//this component is responsible for checking the user's access_token validity
// and get the another access_token if that's invalid,
//and sign out the user and remove his tokens and data from redux, if refresh_token is also expired
const AuthRoute: React.FC<AuthRouteProps> = (props: AuthRouteProps) => {
    const [validity,setValidity] = useState<ValidationStatuses>(ValidationStatuses.notValidatedYet)
    const [userIsValidatedOnce,setUserIsValidatedOnce] = useState(false)
    const {accessToken: reduxAccessToken, refreshToken: reduxRefreshToken} = useTypedSelector(state => state.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        const fetchData = async (access_token,refresh_token) => {
            try {
                //validating user's access_token
                const res = await sendGetUserInfoRequset(access_token,{dispatch,navigate,refresh_token,toast})
                if(res.status === 200){
                    setValidity(ValidationStatuses.isValid)
                    setUserIsValidatedOnce(true)
                    return
                }
                throw new Error('user is invalid')
            }
            catch(err){
                //if any other error occures
                dispatch({type: UserReduxActionTypesT.removeAuthUser})
                setValidity(ValidationStatuses.isInValid)
                setUserIsValidatedOnce(true)
            }
        }
        //we only want to validate the token if we had token from redux and if we havent validated before
        if(reduxAccessToken && reduxRefreshToken && !userIsValidatedOnce){
            fetchData(reduxAccessToken,reduxRefreshToken)
        }
    },[reduxAccessToken,reduxRefreshToken])

    return(
       <>
        {
        validity === ValidationStatuses.notValidatedYet ?
        <div style={{position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)'}}>
            <SpinnerB/>
        </div>
        : 
        validity === ValidationStatuses.isInValid ?
        <Navigate to={{pathname: PATHES.login}} replace={true}/>
        : 
        props.children
        }
       </>
    )
}


export default AuthRoute
