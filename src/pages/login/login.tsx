
/* eslint-disable */
import React from 'react';
import styles from './login.module.scss'
import { Images } from '../../assets/images';
import { useState, useEffect } from 'react';
import { UserReduxActionTypesT } from '../../redux/index'
import { useDispatch as _useDispatch } from '../../redux/index'
import { useNavigate } from 'react-router-dom'
import { PATHES } from '../../utils/constants'
import { toast } from 'react-toastify'
import { EmailFC, PasswordFC } from '../../utils/formControl'
import FormControl from '../../components/formControl/formControl';
import ButtonA from '../../components/buttons/buttonA';
import { validator, ValidatorTypes } from '../../utils/validator'
import Check from '../../components/formControl/check';
import { sendLoginRequset } from '../../utils/requests'



const Login: React.FC = () => {
  const [emailV, setEmailV] = useState('')
  const [emailIsValid, setEmailIsValid] = useState(true)
  const [passV, setPassV] = useState('')
  const [passIsValid, setPassIsValid] = useState(true)
  const [errorsObj, setErrorsObj] = useState({ email: null, password: null })
  const [rememberMeV, setRememberMeV] = useState(false)
  const [loading, setLoading] = useState(false)
  const dispatch = _useDispatch()
  const navigate = useNavigate()



  const confirmHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    //if we have sent a req already, but we havent recieved its response, we have to wait to get current req response, then send another req
    if (loading) return
    let hasError = false
    const populatedErrors = { email: null, password: null }

    const emailValidationResult = validator({ type: ValidatorTypes.email, value: emailV })
    const passwordValidationResult = validator({ type: ValidatorTypes.minimumLengthString, value: passV, nChar: 8 })
    //we dont want to have validation on password, because validation occures on the backend-side
    if (!emailValidationResult.isValid) {
      hasError = true
      populatedErrors.email = emailValidationResult.errs[0]
      setEmailIsValid(false)
    }
    if (!passwordValidationResult.isValid) {
      hasError = true
      populatedErrors.password = passwordValidationResult.errs[0]
      setPassIsValid(false)
    }
    //if we do have any validation error, we dont want to continue
    if (hasError) {
      return setErrorsObj(populatedErrors)
    }
    try {
      setLoading(true)
      const res = await sendLoginRequset({ email: emailV, password: passV }, { dispatch, navigate, refresh_token: '123123', toast })
      setLoading(false)
      if (res.status === 200) {
        dispatch({ type: UserReduxActionTypesT.saveAuthUser, payload: { ...res.data }, rememberMe: rememberMeV })
        toast.success('you have been logged in successfully')
        setEmailV("");
        setPassV("")
        navigate({ pathname: PATHES.home }, { replace: true })
      }
      else {
        toast.error('something went wrong')
      }
      return
    }

    catch (err) {
      setLoading(false)
    }
  };




  return (
    <div className={styles.login} >
      <form className={styles.container}>
        <h2 className={styles.header}>
          Login  / <span onClick={() => navigate({ pathname: PATHES.register }, { replace: false })}>Register</span>
        </h2>
        <div className={styles.logoBox}>
          <img src={Images.Logo} alt="Logo" />
        </div>
        <div className={[styles.inputBox, styles.email].join(' ')}>
          <FormControl content={EmailFC} value={emailV} setParentValue={setEmailV} isValid={emailIsValid} setIsValid={setEmailIsValid} errorMsg={errorsObj.email} />
        </div>
        <div className={[styles.inputBox, styles.password].join(' ')}>
          <FormControl content={PasswordFC} value={passV} setParentValue={setPassV} isValid={passIsValid} setIsValid={setPassIsValid} errorMsg={errorsObj.password} />
        </div>
        <div className={styles.rememberMe}>
          <Check id='2-t' value={rememberMeV} onChangeHandler={setRememberMeV} children="Remember me" />
        </div>
        <div className={styles.btnBox}>
          <ButtonA children='Login' type='regular' loading={loading} onClick={confirmHandler} />
        </div>
      </form>
    </div>
  )
}

export default Login
