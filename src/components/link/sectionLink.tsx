import styles from './sectionLink.module.scss'
import { useState, useEffect, useLayoutEffect } from 'react'
import { PATHES } from '../../utils/contants'
import { useLocation } from 'react-router-dom'
import GroupLink from './groupLink'
const {sectionLink, head, icon, title, body, linkItem, activeItem, link} = styles


type SectionLinkProps = {
    resources: { name: string; value: number; sublinks?: { name: string; value: string; }[] }[]
    group: string
}


const SectionLink:React.FC<SectionLinkProps> = (props) => {
    const location = useLocation()
    const [showLinks, setShowLinks] = useState(false)

    //on every first render we have to check if one of the group-related links is active to show the link panel
    useLayoutEffect(() => {
        let mustShowTheLinkPanel = false
        for(const res of props.resources){
            mustShowTheLinkPanel = mustShowTheLinkPanel || location.pathname.includes(PATHES[res.name])
        }
        if(mustShowTheLinkPanel){
            setShowLinks(true)
        }
    },[])

    const sortedResources = props.resources.sort((first, second) => {
        if(first.value > second.value){return 1}
        else if(first.value < second.value){return -1}
        else {return 0} 
    })
    const items = sortedResources.map((resource,index) => {
        let returnedElement = (<GroupLink data={resource} key={`${index}-gas`}/>)
      
        return(
            returnedElement
        )
    })
    return(
        <div className={sectionLink}>
            <div className={head} onClick={() => setShowLinks(prev => !prev)} >
                <div className={icon}>
                {
                showLinks ? '-' : '+'
                }
                </div>
                <div className={title}>{props.group}</div>
            </div>
            {showLinks && 
            <div className={body}>
                {items}
            </div>
            }
        </div>
    )
}


export default SectionLink