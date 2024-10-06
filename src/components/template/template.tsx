import React from 'react'
import Nav from '../nav/nav'
import SideBar from '../sideBar/sideBar'
import styles from './template.module.scss'
import Nav2 from '../nav/nav2'
const {template,headerBox,content,main,sideBarBox} = styles


type TemplatePropsT = {
    children?: React.ReactNode
}


const Template:React.FC<TemplatePropsT> = (props) => {
    return(
        <div className={template}>
            <div className={headerBox}>
                <Nav2 />
            </div>
            <div className={content}>
                <aside className={sideBarBox}>
                    <SideBar />
                </aside>
                <main className={main}>
                    {props.children}
                </main>
            </div>
        </div>
    )
}


export default Template
