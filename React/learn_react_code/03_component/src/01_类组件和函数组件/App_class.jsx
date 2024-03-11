// 类组件

import React from 'react'

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      message: 'Hello React!',
    }
  }

  render() {
    // const { message } = this.state

    // 1. 返回一个 React 元素
    // return <h1>{message}</h1>
    
    // 2. 返回一个数组/fragments
    // return ['abc', '123', 'def']
    // return [
    //   <h1>hello</h1>,
    //   <h2>react</h2>,
    //   <h3>world</h3>
    // ]

    // 3. 返回number/string
    // return 123
    return 'hello'
  }
}

export default App
