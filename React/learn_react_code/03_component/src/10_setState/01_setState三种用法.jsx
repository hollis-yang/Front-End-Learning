import React, { Component } from 'react'

export class App extends Component {
  constructor() {
    super()
    this.state = {
      message: 'Hello World!',
      counter: 0,
    }
  }

  changeText() {
    // 1.基本使用
    this.setState({
      message: "Hello React!"
    })

    // 2.传入回调函数
    // 好处1: 可以在回调函数内编写新的state逻辑
    // 好处2: 当前回调函数会将之前的state和props作为参数传入
    this.setState((state, props) => {
      return {
        message: "Hello React!"
      }
    })

    // 3. setState的异步调用
    // 如果希望数据更新后(本质是两个state的数据合并), 立即获取最新的state数据执行一些逻辑代码
    // 那么可以在setState的第二个参数传入callback
    this.setState({
      message: 'Hello React!'
    })
    console.log('------', this.state.message) // Hello World!
    
    this.setState({
      message: 'Hello React!'
    }, () => {
      console.log('------', this.state.message) // Hello React!
    })
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
