import React, { useEffect, useState } from 'react'
import Template from '../../components/template/template'
import styles from './showPost.module.scss'
import MainPanel from '../../components/panels/mainPanel/mainPanel'
import SpinnerB from '../../components/spinner/spinnerB'
import { PostT } from '../../utils/models'
import { useLocation, useNavigate, redirect, Navigate } from 'react-router-dom'
import { PATHES } from '../../utils/constants'
import { historyPropertiesExistanceCheck } from '../../utils/utility'
import { ButtonAProps } from '../../components/buttons/buttonA'
import { sendShowUserPostRequest } from '../../utils/requests'
import { toast } from 'react-toastify'
import { useDispatch, useTypedSelector } from '../../redux'


const ShowPost: React.FC = () => {
    const location = useLocation()
    const from = historyPropertiesExistanceCheck(location, 'from', null)
    const postData: PostT | null = historyPropertiesExistanceCheck(location, 'post', null)
    const { accessToken, refreshToken } = useTypedSelector(state => state.user)
    const [post, setPost] = useState<PostT | null>(null)
    const [isFirstRender, setIsFirstRender] = useState(false)
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()
    const dispatch = useDispatch()

    let isNotLegal = false
    if (postData === null || postData === null || !postData.id || from !== PATHES.home) {
        isNotLegal = true
    }

    //we can show the post data from the state passed through navigation 
    //and also we can send a request and get the post info from backend
    useEffect(() => {
        const fetchData = async () => {
            try {
                if (!postData || !postData.id) {
                    return
                }
                // setLoading(true)
                const res = await sendShowUserPostRequest(accessToken, postData.id.toString(), { dispatch, navigate, refresh_token: refreshToken, toast })
                // setLoading(false)
                if (res.status === 200) {

                }

            }
            catch (err) {
                setLoading(false)
            }
        }
    }, [])


    if (from !== PATHES.home) {
        navigate({ pathname: PATHES.home })
    }





    const onGoBackHandler = () => {
        navigate({ pathname: PATHES.home }, { replace: true })
    }

    const headButtonsArr: ButtonAProps[] = [
        {
            children: "Go Back",
            onClick: onGoBackHandler,
            type: "regular",
            loading: false
        }
    ]


    return (
        <Template>
            <div className={styles.showPost}>
                {
                    isNotLegal &&
                    <Navigate to={PATHES.home} replace={true} />
                }
                {
                    !loading ?
                        <MainPanel title="Show Post" headButtons={headButtonsArr}>
                            <div className={styles.container}>
                                <div className={styles.titleBox}>
                                    <div className={styles.label}>
                                        title
                                    </div>
                                    <div className={styles.content}>
                                        {postData?.name}
                                    </div>
                                </div>
                                <div className={styles.categoryBox}>
                                    <div className={styles.label}>
                                        category
                                    </div>
                                    <div className={styles.content}>
                                        {postData?.category}
                                    </div>
                                </div>
                                <div className={styles.imgUploadBox}>
                                    <img className={styles.img} src={postData?.image} />
                                </div>
                                <div className={styles.descBox}>
                                    <div className={styles.label}>
                                        description
                                    </div>
                                    <div className={styles.content}>
                                        {postData?.desc}
                                    </div>
                                </div>
                            </div>
                        </MainPanel>
                        :
                        <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                            <SpinnerB />
                        </div>
                }
            </div>
        </Template>
    )
}

export default ShowPost
