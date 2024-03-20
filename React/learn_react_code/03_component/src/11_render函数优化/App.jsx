import React, { PureComponent } from 'react'
import Home from './home'
import Recommend from './Recommend'
import Profile from './Profile'

export class App extends PureComponent {
  constructor() {
    super()
    this.state = {
      message: 'Hello World',
      counter: 0,
    }
  }

  // shouldComponentUpdate(nextProps, newState) {
  //   if (this.state.message !== newState.message || this.state.counter !== newState.counter) {
  //     return true
  //   }
  //   return false
  // }

  changeText() {
    this.setState({
      message: 'Hello React',
    })
  }

  increment() {
    this.setState({
      counter: this.state.counter + 1,
    })
  }

  render() {
    console.log('App render')
    const { message, counter } = this.state
    return (
      <div>
        App-{message}-{counter}
        <button onClick={() => this.changeText()}>修改文本</button>
        <button onClick={() => this.increment()}>+1</button>
        <Home message={message}/>
        <Recommend counter={counter}/>
        <Profile message={message}/>
      </div>
    )
  }
}

export default App
