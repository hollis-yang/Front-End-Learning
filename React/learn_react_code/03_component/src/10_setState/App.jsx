import React, { Component } from 'react'
import { flushSync } from 'react-dom'

export class App extends Component {
  constructor() {
    super()
    this.state = {
      message: 'Hello World!',
      counter: 0,
    }
  }

  changeText() {
    // setTimeout(() => {
    //   this.setState({
    //     message: 'Hello React!',
    //   })
    //   console.log('message:', this.state.message)
    // }, 0)
    setTimeout(() => {
      flushSync(() => {
        this.setState({
          message: 'Hello React!',
        })
      })
      console.log('message:', this.state.message)
    }, 0)
  }

  increment() {
    // this.setState({
    //   counter: this.state.counter + 1
    // })
    // this.setState({
    //   counter: this.state.counter + 1
    // })
    // this.setState({
    //   counter: this.state.counter + 1
    // })
    this.setState((state, props) => {
      return {
        counter: state.counter + 1
      }
    })
    this.setState((state, props) => {
      return {
        counter: state.counter + 1
      }
    })
    this.setState((state, props) => {
      return {
        counter: state.counter + 1
      }
    })
  }

  render() {
    const { message, counter } = this.state

    return (
      <div>
        <h2>{message}</h2>
        <button onClick={() => this.changeText()}>修改message</button>
        <h2>counter:{counter}</h2>
        <button onClick={() => this.increment()}>counter+1</button>
      </div>
    )
  }
}

export default App
