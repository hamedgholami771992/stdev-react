import React, { ReactNode } from 'react'
import styles from './sideBar.module.scss'
import {useTypedSelector} from '../../redux/index'

import { NavLink} from 'react-router-dom'
import { useLocation,useNavigate} from 'react-router-dom'
import { PATHES } from '../../utils/contants'
import SectionLink from '../link/sectionLink'
import { LinksArray } from '../../utils/contants'
import GroupLink from '../link/groupLink'



const SideBar: React.FC = props => {
    const navigate = useNavigate()
  
    // const location = useLocation()
  
    
    //first we have to extract the group value
 
   let items = []
   let i = 0
   for(const groupLinkObj of LinksArray){
    items.push(
        <div className={styles.linkItem} key={`yx-${i}`}>
            <GroupLink  data={groupLinkObj} key={`ix-${i}`}/>
        </div>
    )
    i++
   }




    return (
        <div className={styles.sideBar}>
            <ul className={styles.linkPanel}>
                {
                items
                }
            </ul>
            <div className={styles.backToHomeBtn} onClick={() => {navigate(PATHES.home)}}>
                back to home
            </div>
        </div>
    )
}



export default SideBar


























// const SideBar: React.FC = props => {
//     const {resources: reduxPermissions, allResources} = useTypedSelector(state => ({...state.user, ...state.configs}))
//     const location = useLocation()
  
    
//     //to show links in a specific order in sidebar, we have to sort the arr
//     const sortedAllResources = allResources.sort((first: ResourceT, second: ResourceT) => {
//         if(first.value > second.value){return 1}
//         else if(first.value < second.value){return -1}
//         else {return 0} 
//     })

//     let availableLinks: ReactNode[] = []

//     //first we have to filter allResources to just have user related resources
//     sortedAllResources.forEach((resource: ResourceT) => {
//         //**we must not render * as link
//         const isUserAuthorised = reduxPermissions.find((permission: ResourceWithActions) => permission.name === resource.name && permission.value === resource.value && resource.value !== 1) ? true : false
//         if(isUserAuthorised){
//             //if current location-path is equal to the current link, we change its styling to be more distinct
//             availableLinks.push(<li key={resource.name} className={[linkItem, location.pathname.includes(PATHES[resource.name]) ? activeItem : ''].join(' ')}><NavLink to={`${PATHES[resource.name]}`} className={link}>{resource.name}</NavLink></li>)
//         }
//     })

//     return (
//         <div className={sideBar}>
//             <ul className={linkPanel}>
//                 {
//                 availableLinks
//                 }
//             </ul>
//         </div>
//     )
// }
