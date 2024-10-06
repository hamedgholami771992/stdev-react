import React, { Component } from "react";

type TabsContentProps = {
  className: any[]
  children: React.ReactNode
  activeTab: number
  tabId: number
}

class TabsContent extends Component<TabsContentProps> {
  render() {
    return (
      <div className={this.props.className.join(' ')}>
        {this.props.children}
      </div>
    );
  }
}

export default TabsContent;