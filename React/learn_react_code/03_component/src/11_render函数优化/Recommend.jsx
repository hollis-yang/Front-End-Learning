import React, { PureComponent } from 'react'

export class Recommend extends PureComponent {
  // shouldComponentUpdate(nextProps, nextState) {
  //   if (this.props.counter !== nextProps.counter) {
  //     return true
  //   }
  //   return false
  // }

  render() {
    console.log('Recommend render')
    const { counter } = this.props
    return (
      <div>Recommend Page: {counter}</div>
    )
  }
}

export default Recommend