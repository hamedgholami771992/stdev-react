import React, { Component } from "react";

type TabsListProps = {
  className: any[]
  children: React.ReactNode
}



class TabsList extends Component<TabsListProps> {
  render() {
    return <ul className={this.props.className.join(' ')}>{this.props.children}</ul>;
  }
}

export default TabsList;