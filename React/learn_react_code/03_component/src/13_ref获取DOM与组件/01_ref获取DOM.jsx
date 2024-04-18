import React, { PureComponent } from 'react'

export class App extends PureComponent {
  constructor() {
    super()
    this.state = {
      count: 0
    }
    this.titleRef = React.createRef()
    this.titleEl = React.createRef()
  }

  getNativeDOM() {
    // 1.在React元素上绑定ref字符串(不推荐)
    // console.log(this.refs.why)

    // 2.提前创建好ref对象, 将该对象绑定到元素
    // console.log(this.titleRef.current)

    // 3.传入回调函数
    console.log(this.titleEl)
  }

  render() {
    return (
      <div>
        <h2 ref="why">Hello World</h2>
        <h2 ref={this.titleRef}>你好李银河</h2>
        <h2 ref={el => {this.titleEl = el}}>Hello Geo</h2>
        <button onClick={() => this.getNativeDOM()}>获取DOM</button>
      </div>
    )
  }
}

export default App