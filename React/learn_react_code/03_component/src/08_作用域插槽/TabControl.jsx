import React, { Component } from 'react'
import './TabControl.css'

export class TabControl extends Component {
  constructor() {
    super()
    this.state = {
      currentIndex: 0,
    }
  }

  itemClick(index) {
    this.props.getTabIndex(index)
    this.setState({
      currentIndex: index,
    })
  }

  render() {
    const { titles, itemType } = this.props
    const { currentIndex } = this.state

    return (
      <div className='tab-control'>
        {titles.map((item, index) => {
          return (
            <div
              className={`item ${index === currentIndex ? 'active' : ''} `}
              key={item}
              onClick={() => this.itemClick(index)}>
              {/* <span>{item}</span> */}
              {itemType(item)}
            </div>
          )
        })}
      </div>
    )
  }
}

export default TabControl
