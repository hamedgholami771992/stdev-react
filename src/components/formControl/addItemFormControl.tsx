import React from 'react'
import styles from './addItemFormControl.module.scss'

const {addItemFormControl,panel,confirmBtn,item,itemTitle,itemRemoveBtn,err} = styles 

type AddItemFormControlPropsT = {
    children: React.ReactNode 
    btnTitle: string
    readOnly?: boolean
    addHandler: () => void
    confirmedArr: string[]
    removeHandler: (a: string) => void
    isValid: boolean
}


const AddItemFormControl: React.FC<AddItemFormControlPropsT> = props => {

    const items = props.confirmedArr.map((c,i) => {
        return (
        <div className={item} key={i}>
            <div className={itemTitle}>{c}</div>
            {
            !props.readOnly &&
            <span className={itemRemoveBtn} onClick={props.removeHandler.bind(null,c)}>&#10060;</span>
            }
        </div>
        )
    })


    return (
        <div className={[addItemFormControl,!props.isValid ? err : ''].join(' ')}>
            {props.children} {/* must be input ,select or simple formControl*/}
            {
            !props.readOnly &&
            <div className={confirmBtn} onClick={props.addHandler}>{props.btnTitle}</div>
            }       
            <div className={panel}>
                {items}     
            </div>
        </div>
    )
}

export default AddItemFormControl






// how to use

// const [userV,setUserV] = useState('')
// const [userIsValid,setUserIsValid] = useState(true)
// const [usersArrV,setUsersArrV] = useState([])
// const [usersArrIsValid,setUsersArrIsValid] = useState(true)

// const userAddHandler = () => {
//     //some validation code
//     setUsersArrV(prev => [...prev,userV])
  
// }


// const usersArrRemoveHandler = (user) => {
//     setUsersArrV(prev => [...prev.filter(c => c !== user)])
// }




{/* <AddItemFormControl btnTitle="تایید" addHandler={userAddHandler} confirmedArr={usersArrV} removeHandler={usersArrRemoveHandler} isValid={usersArrIsValid}>
    <FormControl content={CouponRestrictedUsers} value={userV} setParentValue={setUserV} isValid={userIsValid} setIsValid={setUserIsValid}  errorMsg={null} />
</AddItemFormControl> */}




//when is readOnly
{/* 
<AddItemFormControl btnTitle="تایید" readOnly={true} addHandler={() => {}} confirmedArr={[]} removeHandler={() => {}} isValid={true}>
    <div className={usersFc} style={{border: '1px solid #c9a220',borderRadius: '4px',height: '3em',padding: '0 1em',display: 'flex',justifyContent: 'flex-start',alignItems: 'center'}}>
        <div className={label}>کاربرهای مجاز</div>
    </div>
</AddItemFormControl> */}