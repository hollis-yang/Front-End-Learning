import React, { PureComponent } from 'react'

class Home extends PureComponent {
  test() {
    console.log('test---')
  }

  render() {
    return <h2>Home</h2>
  }
}

export class App extends PureComponent {
  constructor() {
    super()
    this.hmRef = React.createRef()
  }

  getComponent() {
    console.log(this.hmRef.current)
    this.hmRef.current.test()  // 调用实例方法
  }

  render() {
    return (
      <div>
        <Home ref={this.hmRef}/>
        <button onClick={() => this.getComponent()}>获取组件实例</button>
      </div>
    )
  }
}

export default App