
import React from 'react'
import styles from './cardA.module.scss'
import { Images } from '../../assets/images'
import { PostT } from '../../utils/models'

type CardAPropsT = PostT & {
    onEdit: (id) => void
    onRemove: (id) => void
    onShow: (id) => void
}

const CardA: React.FC<CardAPropsT> = (props) => {
    const editHandler = (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation()
        props.onEdit(props.id)
    }

    const removeHandler = (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation()
        props.onRemove(props.id)
    }
    const showHandler = (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation()
        props.onShow(props.id)
    }
    

    return (
        <div className={styles.cardA} onClick={showHandler}>
            <div className={styles.imgCol}>
                <div className={styles.imgBox}>
                    <img src={props.image} alt="" />
                </div>
            </div>
            <div className={styles.textCol}>

                <div className={styles.nameBox}>
                    <div className={styles.bold}>Name</div>
                    <div className={styles.normal}>{props.name}</div>
                </div>
                <div className={styles.descBox}>
                    <div className={styles.bold}>Description</div>
                    <div className={styles.normal}>{props.desc}</div>
                </div>
                <div className={styles.categoryBox}>
                    <div className={styles.bold}>Category</div>
                    <div className={styles.normal}>{props.category}</div>
                </div>
                <div className={styles.btnRow}>
                    <div className={styles.edit} onClick={editHandler}>
                        <img src={Images.Pen} alt="" />
                    </div>
                    <div className={styles.remove} onClick={removeHandler}>
                        <img src={Images.Trash} alt="" />
                    </div>
                </div>
            </div>
        </div>
    )
}


export default CardA
