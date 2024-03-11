import React from 'react'
import HelloWorld from './HelloWorld'

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      isShow: true,
    }
  }

  switchShow = () => {
    const { isShow } = this.state
    this.setState({
      isShow: !isShow,
    })
  }

  render() {
    const { isShow } = this.state

    return (
      <div>
        <h1>App</h1>
        <button onClick={() => this.switchShow()}>切换</button>
        {isShow && <HelloWorld />}
      </div>
    )
  }
}

export default App
