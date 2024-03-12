import React, { Component } from 'react'

export class SubCounter extends Component {
  subCount(count) {
    this.props.subClick(count) // 拿到props
  }
  render() {
    return (
      <div>
        <button onClick={() => this.subCount(1)}>-1</button>
        <button onClick={() => this.subCount(5)}>-5</button>
        <button onClick={() => this.subCount(10)}>-10</button>
      </div>
    )
  }
}

export default SubCounter