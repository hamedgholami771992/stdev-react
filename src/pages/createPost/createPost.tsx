import React, { useEffect, useState } from 'react'
import Template from '../../components/template/template'
import styles from './createPost.module.scss'
import MainPanel from '../../components/panels/mainPanel/mainPanel'
import SpinnerB from '../../components/spinner/spinnerB'
import { PostT } from '../../utils/models'
import { postsData } from '../../utils/data'
import CardA from '../../components/cards/cardA'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { LinksArray, PATHES } from '../../utils/constants'
import formControl from '../../components/formControl/formControl'
import { convertDataURLtoFile, convertImageUrlToFileObj, convertUrlToDataURL, historyPropertiesExistanceCheck } from '../../utils/utility'
import FormControl from '../../components/formControl/formControl'
import { PostNameFC, PostDescFC } from '../../utils/formControl'
import ImageUpload from '../../components/imageUpload/imageUpload'
import { ButtonAProps } from '../../components/buttons/buttonA'
import { Langs, validator, ValidatorTypes } from '../../utils/validator'
import { sendCreateUserPostRequest, SendUpdateUserPostDataFields, sendUpdateUserPostRequest } from '../../utils/requests'
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'
import { useDispatch, useTypedSelector } from '../../redux'


const CreatePost: React.FC = () => {
    const location = useLocation()
    const from = historyPropertiesExistanceCheck(location, 'from', null)
    const { accessToken, refreshToken } = useTypedSelector(state => state.user)

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [nameV, setNameV] = useState("")
    const [nameIsValid, setNameIsValid] = useState(true)
    const [descV, setDescV] = useState("")
    const [descIsValid, setDescIsValid] = useState(true)
    const [categoryV, setCategoryV] = useState("")
    const [categoryIsValid, setCategoryIsValid] = useState(true)
    const [filesArr, setFilesArr] = useState([])
    const [fileIsValid, setFileIsValid] = useState(true)
    const [loading, setLoading] = useState(false)
    const [errorsObj, setErrorsObj] = useState({ name: null, desc: null, category: null, image: null })


    let isNotLegal = false
    if (from !== PATHES.home) {
        isNotLegal = true
    }




    const onCreateHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        //if we have sent a req already, but we havent recieved its response, we have to wait to get current req response, then send another req
        if (loading) return
        let hasError = false
        const populatedErrors = { name: null, desc: null, category: null, image: null }

        const nameValidationResult = validator({ type: ValidatorTypes.minimumLengthString, value: nameV, nChar: 3 })
        const descValidationResult = validator({ type: ValidatorTypes.minimumLengthString, value: descV, nChar: 10 })
        const categoryValidationResult = {}

        if (!nameValidationResult.isValid) {
            hasError = true
            populatedErrors.name = nameValidationResult.errs[0]
            setNameIsValid(false)
        }
        if (!descValidationResult.isValid) {
            hasError = true
            populatedErrors.desc = descValidationResult.errs[0]
            setDescIsValid(false)
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
        formData.append(SendUpdateUserPostDataFields.title, nameV);
        formData.append(SendUpdateUserPostDataFields.description, descV)
        formData.append(SendUpdateUserPostDataFields.image, filesArr[0]);



        try {
            setLoading(true)
            const res = await sendCreateUserPostRequest(accessToken, formData, { dispatch, navigate, refresh_token: refreshToken, toast })
            setLoading(false)
            if (res.status !== 200) {
                toast.error('Creating the post has been failed')
            }
            else {
                toast.success('Post has been created successfully')
                setFilesArr([]);
                setNameV("");
                setDescV("");

                navigate({ pathname: PATHES.home }, { replace: true })
            }

        }
        catch (err) {
            setLoading(false)
        }

    }
    const onCancelHandler = () => {
        navigate({ pathname: PATHES.home }, { replace: true })
    }

    const headButtonsArr: ButtonAProps[] = [
        {
            children: "",
            onClick: onCreateHandler,
            type: "add",
            loading: loading
        },
        {
            children: "",
            onClick: onCancelHandler,
            type: "cancel",
            loading: false
        }
    ]


    return (
        <Template>
            <div className={styles.createPost}>
                {
                    isNotLegal &&
                    <Navigate to={PATHES.home} replace={true} />
                }
                {

                    <MainPanel title="Create Post" headButtons={headButtonsArr}>
                        <form className={styles.container}>


                            <div className={styles.titleBox}>
                                <FormControl content={PostNameFC} value={nameV} setParentValue={setNameV} isValid={nameIsValid} setIsValid={setNameIsValid} errorMsg={errorsObj.name} />
                            </div>
                            <div className={styles.descBox}>
                                <FormControl content={PostDescFC} value={descV} setParentValue={setDescV} isValid={descIsValid} setIsValid={setDescIsValid} errorMsg={errorsObj.desc} />
                            </div>
                            <div className={styles.imgUploadBox}>
                                <ImageUpload
                                    buttonText='choose a file'
                                    chooseMulti={false}
                                    error={errorsObj.image}
                                    filesArr={filesArr}
                                    id={`1::34`}
                                    setFilesArr={setFilesArr}
                                    isValid={fileIsValid}
                                    title={"Upload your image"}
                                />
                            </div>
                            <div className={styles.categoryBox}>

                            </div>


                        </form>
                    </MainPanel>

                }
            </div>
        </Template>
    )
}

export default CreatePost
