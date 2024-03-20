import React, { PureComponent } from 'react'

export class home extends PureComponent {
  constructor() {
    super()
    this.state = {
      friends: [],
    }
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   if (this.state.friends !== nextState.friends || this.props.message !== nextProps.message) {
  //     return true
  //   }
  //   return false
  // }

  render() {
    console.log('Home render')
    const { message } = this.props
    return <div>Home: {message}</div>
  }
}

export default home
