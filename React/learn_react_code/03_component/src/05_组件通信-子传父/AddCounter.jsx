import React, { Component } from 'react'

export class AddCounter extends Component {
  addCount(count) {
    this.props.addClick(count) // 拿到props
  }

  render() {
    return (
      <div>
        <button onClick={() => this.addCount(1)}>+1</button>
        <button onClick={() => this.addCount(5)}>+5</button>
        <button onClick={() => this.addCount(10)}>+10</button>
      </div>
    )
  }
}
// AddCounter.propTypes = {
//   addClick: propTypes.function
// }

export default AddCounter
