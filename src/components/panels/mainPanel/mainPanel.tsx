import styles from './mainPanel.module.scss'
import React from 'react'
import ButtonA,{ButtonAProps} from '../../buttons/buttonA'

type MainPanelProps = {
    title: string,
    headButtons: ButtonAProps[],
    children: React.ReactNode
}


const {mainPanel,head,heading,btnPanel,body} = styles

const MainPanel:React.FC<MainPanelProps> = (props: MainPanelProps) => {
    const buttons = props.headButtons.map((btn,i) => {
        return (<ButtonA {...btn}  key={`sds-${i}`}/>)
    })

    return (
        <div className={mainPanel}>
            <div className={head}>
                <h3 className={heading}>{props.title}</h3>
                <div className={btnPanel}>
                    {buttons}
                </div>
            </div>
            <div className={body}>
                {props.children}
            </div>
        </div>
    )
}

export default MainPanel

