import React, { PureComponent, forwardRef } from 'react'

// function Home() {
//   return (
//     <div>
//       <h2>Hello World</h2>
//       <p>12345</p>
//     </div>
//   )
// }

const Home = forwardRef(function (props, ref) {
  return (
    // 绑定ref到h2
    <div>
      <h2 ref={ref}>Hello World</h2>
      <p>12345</p>
    </div>
  )
})

export class App extends PureComponent {
  constructor() {
    super()
    this.hmRef = React.createRef()
  }

  getComponent() {
    console.log(this.hmRef.current)
  }

  render() {
    return (
      <div>
        <Home ref={this.hmRef} />
        <button onClick={() => this.getComponent()}>获取组件实例</button>
      </div>
    )
  }
}

export default App
