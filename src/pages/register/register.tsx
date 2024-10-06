import { useEffect, useState } from 'react';
import ButtonA from '../../components/buttons/buttonA';
import { useNavigate } from 'react-router-dom'
import styles from './register.module.scss';
import { useDispatch, UserReduxActionTypesT } from '../../redux/index'
import { toast } from 'react-toastify'
import FormControl, { SelectContent } from '../../components/formControl/formControl';
import { EmailFC, PasswordFC, ConfirmPasswordFC, FirstNameFC, LastNameFC } from '../../utils/formControl'

import ImageUpload from '../../components/imageUpload/imageUpload';
import { Images } from '../../assets/images';
import { Langs, validator, ValidatorTypes } from '../../utils/validator';
import { PASSWORD_MIN_LENGTH, PATHES } from '../../utils/contants';
import { SendRegisterFormDataFields, sendRegisterRequest } from '../../utils/requests'
const Register = () => {
  const [firstNameV, setFirstNameV] = useState("")
  const [firstNameIsValid, setFirstNameIsValid] = useState(true)
  const [lastNameV, setLastNameV] = useState("")
  const [lastNameIsValid, setLastNameIsValid] = useState(true)
  const [emailV, setEmailV] = useState('')
  const [emailIsValid, setEmailIsValid] = useState(true)
  const [passV, setPassV] = useState('')
  const [passIsValid, setPssIsValid] = useState(true)
  const [confirmedPassV, setConfirmedPassV] = useState('')
  const [loading, setLoading] = useState(false)
  const [filesArr, setFilesArr] = useState([])
  const [fileIsValid, setFileIsValid] = useState(true)
  const [errorsObj, setErrorsObj] = useState({ firstName: null, lastName: null, email: null, password: null, image: null })

  const dispatch = useDispatch()
  const navigate = useNavigate()





  const registerHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    //if we have sent a req already, but we havent recieved its response, we have to wait to get current req response, then send another req
    if (loading) return
    let hasError = false
    const populatedErrors = { firstName: null, lastName: null, email: null, password: null, image: null }

    const firstNameValidationResult = validator({ type: ValidatorTypes.name, value: firstNameV, lang: Langs.en, nChar: 3 })
    const lastNameValidationResult = validator({ type: ValidatorTypes.name, value: lastNameV, lang: Langs.en, nChar: 3 })
    const emailValidationResult = validator({ type: ValidatorTypes.email, value: emailV })
    const passwordsValidationResult = validator({ type: ValidatorTypes.password, value: [passV, confirmedPassV], nChar: PASSWORD_MIN_LENGTH })

    if (!firstNameValidationResult.isValid) {
      hasError = true
      populatedErrors.firstName = firstNameValidationResult.errs[0]
      setFirstNameIsValid(false)
    }
    if (!lastNameValidationResult.isValid) {
      hasError = true
      populatedErrors.lastName = lastNameValidationResult.errs[0]
      setLastNameIsValid(false)
    }

    if (!emailValidationResult.isValid) {
      hasError = true
      populatedErrors.email = emailValidationResult.errs[0]
      setEmailIsValid(false)
    }
    if (!passwordsValidationResult.isValid) {
      hasError = true
      populatedErrors.password = passwordsValidationResult.errs[0]
      setPssIsValid(false)
    }
    if (filesArr.length === 0) {
      hasError = true
      populatedErrors.image = "This file is required"
      setFileIsValid(false)
    }

    if (hasError) {
      return setErrorsObj(populatedErrors)
    }
    //here we know all inputs are valid
    const formData = new FormData();
    formData.append(SendRegisterFormDataFields.first_name, firstNameV);
    formData.append(SendRegisterFormDataFields.last_name, lastNameV)
    formData.append(SendRegisterFormDataFields.email, emailV)
    formData.append(SendRegisterFormDataFields.password, passV)
    formData.append(SendRegisterFormDataFields.image, filesArr[0]);



    try {
      setLoading(true)
      const res = await sendRegisterRequest(formData, { dispatch, navigate, refresh_token: '', toast })
      setLoading(false)
      if(res.status !== 200){
        toast.error('Signing up has been failed')
      }
      else {
        toast.success('You successfully has been signed up, now you can login')
        setFilesArr([]);
        setFirstNameV("");
        setLastNameV("");
        setEmailV("")
        setPassV("")
        setConfirmedPassV("")
        navigate({pathname: PATHES.login}, { replace: false })
      }

    }
    catch (err) {
      setLoading(false)
    }
  }




  // Registration page =>  (image, first name, last name, email, password, password confirmation) with validations.


  return (
    <>
      <section className={styles.register} onSubmit={() => { }} >
        <form className={styles.container}>
          <h2 className={styles.header}>
            Register   / <span onClick={() => navigate({pathname: PATHES.login}, {replace: false})}>Login</span>
          </h2> 
          <div className={styles.logoBox}>
            <img src={Images.Logo} alt="Logo" />
          </div>
          <div className={[styles.inputBox, styles.firstName].join(' ')}>
            <FormControl content={FirstNameFC} value={firstNameV} setParentValue={setFirstNameV} isValid={firstNameIsValid} setIsValid={setFirstNameIsValid} errorMsg={errorsObj.firstName} />
          </div>
          <div className={[styles.inputBox, styles.lastName].join(' ')}>
            <FormControl content={LastNameFC} value={lastNameV} setParentValue={setLastNameV} isValid={lastNameIsValid} setIsValid={setLastNameIsValid} errorMsg={errorsObj.lastName} />
          </div>
          <div className={[styles.inputBox, styles.email].join(' ')}>
            <FormControl content={EmailFC} value={emailV} setParentValue={setEmailV} isValid={emailIsValid} setIsValid={setEmailIsValid} errorMsg={errorsObj.email} />
          </div>

          <div className={[styles.inputBox, styles.password].join(' ')}>
            <FormControl content={PasswordFC} value={passV} setParentValue={setPassV} isValid={passIsValid} setIsValid={setPssIsValid} errorMsg={errorsObj.password} />
          </div>
          <div className={[styles.inputBox, styles.confirmPassword].join(' ')}>
            <FormControl content={ConfirmPasswordFC} value={confirmedPassV} setParentValue={setConfirmedPassV} isValid={passIsValid} setIsValid={setPssIsValid} errorMsg={errorsObj.password} />
          </div>
          <div className={[styles.inputBox, styles.imageUpload].join(' ')}>
            <ImageUpload
              buttonText='choose a file'
              chooseMulti={false}
              error={errorsObj.image}
              filesArr={filesArr}
              id={`1::32`}
              setFilesArr={setFilesArr}
              isValid={fileIsValid}
              title={"Upload your image"}
            />
          </div>

          <div className={styles.confirmBtnBox}>
            <ButtonA children='Register' onClick={registerHandler} type="regular" loading={loading} />
          </div>

        </form>


      </section>



    </>
  )
}

export default Register



// const [uploadedImage, setUploadedImage] = useState<File | null>(null);
// const [filesArr, setFilesArr] = useState([])
// const [currentPage, setCurrentPage] = useState(8);
// const totalPages = 21;

// const handlePageChange = (page: number) => {
//   setCurrentPage(page);
// };


// const handleImageUpload = (image: File | null) => {
//   setUploadedImage(image);
//   console.log('Image uploaded: ', image);
// };

{/* <ImageUpload 
buttonText='choose a file'
chooseMulti={false}
error={'This filed is required'}
filesArr={filesArr}
id={1}
setFilesArr={setFilesArr}
isValid={false}
title={""}
/> */}

{/* <NewPagination 
           totalPages={21}
           currentPage={currentPage}
           onPageChange={handlePageChange}
    /> */}


{/* <CardA 
    category=''
    desc=''
    id={1}
    image={Images.Mountain}
    name=''
    onEdit={() => {console.log('edit clicked')}}
    onRemove={() => {console.log('remove clicked')}}

    /> */}
