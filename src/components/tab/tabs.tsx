//in use

import React, { Component } from "react";
import TabsList from "./tabsList";
import TabsItem from "./tabsItem";
import TabsContent from "./tabsContent";
import styles from './tabs.module.scss'

const {tabActive,contentActive,tabContent,tabList,tabItem,tabsContentWrapper} = styles




type TabProps = {
  data: {id: number, title: string}[]
  components: React.ReactNode[]
  selectedTabId: number  //id of default selected tab
  tabChanger: (id: number) => void
}


class Tabs extends Component<TabProps> {


 

  render() {
    const currentComponentIndex = this.props.data.findIndex(d => d.id === this.props.selectedTabId)
    return (
      <>
        <TabsList className={[tabList]}>
          {this.props.data.map((item, index) => (
            <TabsItem
              handleClick={this.props.tabChanger.bind(this, item.id)}
              className={[tabItem,this.props.selectedTabId === item.id ? tabActive : ""]}
              key={`${item.id}-sg`}
            >
              <>
              {item.title}
              </>
            </TabsItem>
          ))}
        </TabsList>
        <div className={tabsContentWrapper}>
          {/* {
            this.props.components.map((c,i) => {
              return ( 
                <TabsContent key={`${i}-sb`} tabId={i} activeTab={this.state.selectedTab}  className={[tabContent,this.state.selectedTab === i ? contentActive : '']}>
                  {c}
                </TabsContent>)
            })
          } */}
          {
          this.props.components[currentComponentIndex]
          }
        </div>
      </>
    );
  }
}

export default Tabs;

