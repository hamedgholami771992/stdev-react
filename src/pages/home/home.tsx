import React, { useEffect, useState } from 'react'
import Template from '../../components/template/template'
import styles from './home.module.scss'
import MainPanel from '../../components/panels/mainPanel/mainPanel'
import SpinnerB from '../../components/spinner/spinnerB'
import { PostT } from '../../utils/models'
import { postsData } from '../../utils/data'
import CardA from '../../components/cards/cardA'
import { useNavigate } from 'react-router-dom'
import { LinksArray, PATHES, POST_PER_PAGE } from '../../utils/constants'
import { ButtonAProps } from '../../components/buttons/buttonA'
import NewPagination from '../../components/pagination/newPagination'



const Home: React.FC = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [posts, setPosts] = useState<PostT[]>([])
  const [currentPage, setCurrentPage] = useState<number>(1)

  useEffect(() => {
    const fetchData = async () => {
      setPosts(postsData)
    }
    fetchData()
  }, [])

  const handlePageChange = (page: number) => {
    console.log("currentPage: ", currentPage)
    setCurrentPage(page);
  };

  const onEditHandler = (id) => {
    //it navigates user to /edit page
    const selectedPost = posts.find(el => el.id === id)
    if (selectedPost) {
      navigate({ pathname: PATHES.editPost }, { state: { post: selectedPost, from: PATHES.home } })
    }
  }


  const onRemoveHandler = (id) => {
    //sends a request to backend to remove the post from backend
    //after successfull deletion, it also removes the post from the local state
  }

  const onShowPostHandler = (id: string) => {
    const selectedPost = posts.find(el => el.id === id)
    if (selectedPost) {
      navigate({ pathname: PATHES.showPost }, { state: { post: selectedPost, from: PATHES.home } })
    }
  }

  const startingIndex = (currentPage - 1) * POST_PER_PAGE
  let items = []
  for (let i = startingIndex; i < startingIndex + POST_PER_PAGE; i++) {
    items.push(
      <div className={styles.cardSpot} key={`jc-${i}`}>
        <CardA {...posts[i]} onEdit={() => onEditHandler(posts[i].id)} onRemove={() => onRemoveHandler(posts[i].id)} onShow={onShowPostHandler} />
      </div>
    )
  }


  const onCreateBtnHandler = () => {
    navigate({ pathname: PATHES.createPost }, { state: { from: PATHES.home } })
  }


  const createPostBtnProps: ButtonAProps = {
    children: "",
    onClick: onCreateBtnHandler,
    type: 'add',
    loading: false
  }

  return (
    <Template>
      <div className={styles.home}>
        {
          !loading ?
            <MainPanel title="Dashboard" headButtons={[createPostBtnProps]}>
              <div className={styles.container}>
                <div className={styles.cardPanel}>
                  {items}
                </div>
                <div className={styles.paginationBox}>
                  <NewPagination
                    currentPage={currentPage}
                    totalPages={Math.ceil(posts.length / POST_PER_PAGE)}
                    onPageChange={handlePageChange}
                  />
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

export default Home
