import React from 'react'

class HelloWorld extends React.Component {
  // step1
  constructor() {
    console.log('HelloWorld constructor')
    super()
    this.state = {
      message: "Hello World"
    }
  }
  
  changeText = () => {
    this.setState({
      message: "Hello React"
    })
  }

  // step2
  render() {
    console.log('HelloWorld render')
    const { message } = this.state
    return (
      <div>
        <h2>{message}</h2>
        <p>Hello React</p>
        <button onClick={() => this.changeText()}>修改文本</button>
      </div>
    )
  }

  // step3
  componentDidMount() {
    console.log('HelloWorld componentDidMount')
  }

  // step4
  componentDidUpdate() {
    console.log('HelloWorld componentDidUpdate')
  }

  // step5
  componentWillUnmount() {
    console.log('HelloWorld componentWillUnmount')
  }

  // 不常用
  shouldComponentUpdate() {
    console.log('HelloWorld shouldComponentUpdate')
    return false
  }
}

export default HelloWorld