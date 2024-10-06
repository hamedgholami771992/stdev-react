import { useState } from 'react'
import styles from './groupLink.module.scss'
import { PATHES } from '../../utils/contants'
import { NavLink } from 'react-router-dom'
import { useNavigate, useLocation} from 'react-router-dom'


const { groupLink, activeGroup, head, icon, title, body, link, activeLink} = styles

type GroupLinkPropsT = {
    data: { name: string; value: number; sublinks?: { name: string; value: string; }[] }
}

const GroupLink: React.FC<GroupLinkPropsT> = (props) => {
  
    const location = useLocation()
    const [showLinks, setShowLinks] = useState(location.pathname.includes(props.data.name))
    const navigate = useNavigate()
    const links = props.data.sublinks?.map((su,index) => {
        return (
            <li key={su.name} className={[link, location.pathname === su.value ? activeLink : ''].join(' ')}><NavLink to={`${su.value}`}>{su.name}</NavLink></li>
        )
    })

    const headClickHandler = (e: React.MouseEvent<HTMLDivElement>) => {
        //if grouplink has sublinks we want just show sublinks 
        if(props.data.sublinks && props.data.sublinks.length > 0) {
            setShowLinks(prev => !prev)
        }
        //otherwise we want to navigate to the path 
        else {
            navigate({pathname: PATHES[props.data.name]})
        }
    }

  
    return (
        <div className={[groupLink, location.pathname.includes(PATHES[props.data.name]) ? activeGroup : ''].join(' ')}>
            <div className={head} onClick={headClickHandler}>
                <div className={title}>{props.data.name}</div>
                {
                //we want to show icon if we have sublinks
                props.data.sublinks &&
                <div className={icon}>
                    {
                    showLinks ? '-' : '+'
                    }
                </div>
                }
            </div>
            {
                //if we do have sublinks we want to show the body
                showLinks && links?.length > 0 &&
                <div className={body}>
                    {links}
                </div>
            }
        </div>
    )
}


export default GroupLink