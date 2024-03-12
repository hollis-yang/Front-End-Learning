import React, { Component } from 'react'
import ThemeContext from './context/theme.context'
import UserContext from './context/user.context'

export class HomeInfo extends Component {
  render() {
    console.log(this.context)
    return (
      <div>
        HomeInfo: {this.context.color}
        <UserContext.Consumer>
          {(value) => {
            return <div>HomeInfo: {value.color}</div>
          }}
        </UserContext.Consumer>
      </div>
    )
  }
}

HomeInfo.contextType = ThemeContext

export default HomeInfo
