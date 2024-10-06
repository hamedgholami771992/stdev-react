import React, { Component } from "react";

type TabsItemProps = {
  handleClick: () => void
  children: React.ReactNode
  className: any[]

}

class TabsItem extends Component<TabsItemProps> {
  render() {
    const { handleClick, children } = this.props;
    return (
      <li className={this.props.className.join(' ')} onClick={handleClick}>
        {children}
      </li>
    );
  }
}

export default TabsItem;
