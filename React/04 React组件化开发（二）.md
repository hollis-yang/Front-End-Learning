# 04 React组件化开发（二）

## 一、setState的同步和异步

React中我们并不能直接通过修改state的值来让界面发生更新。如果我们直接修改state，React并不知道数据发生了变化，不会重新调用render函数

> 这是因为React并没有实现类似于**Vue2中的Object.defineProperty**或者**Vue3中的Proxy**的方式来监听数据的变化

==因此，必须通过setState来告知React数据已经发生了变化==

### setState的异步更新

```jsx
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
  // ★如果希望数据更新后(本质是两个state的数据合并), 立即获取最新的state数据执行一些逻辑代码
  // ★那么可以在setState的第二个参数传入callback
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
```

### ★Q：为什么setState需要设置成异步？

[https://github.com/facebook/react/issues/11527#](https://github.com/facebook/react/issues/11527)[issuecomment-360199710](https://github.com/facebook/react/issues/11527)

- **核心：setState设计为异步，可以显著的提升性能**
  - 如果每次调用setState都进行一次更新，那么意味着render函数会被频繁调用，界面重新渲染，效率很低

- 因此，最好的办法应该是**获取到多个更新，之后进行批量更新**

- 如果同步setState是同步的，但是render函数还没有被执行，那么state和props不能保持同步

### 改setTimeout为同步（React18前）

#### 在延迟为0的setTimeout中更新

```jsx
// React18后无效, setTimeout中的setState是批量更新
changeText() {
  setTimeout(() => {
    this.setState({
      message: 'Hello React!',
    })
    console.log('message:', this.state.message)
  }, 0);
}
```

#### 原生DOM

```jsx
// React18后无效
componentDidMount() {
  const btnEl = document.querySelector('button')
  btnEl.addEventListener('click', () => {
    this.setState({
      message: 'Hello React!',
    })
    console.log('message:', this.state.message)
  })
}
```

> 分成两种情况：
>
> - 在组件生命周期或React合成事件中，setState是异步
>
> - 在setTimeout或者原生dom事件中，setState是同步

==React18后，setState默认是异步的（所有操作都被放到了批处理中）==

如果希望代码可以同步拿到使用，需要执行特殊的`flushSync`操作

```jsx
import { flushSync } from 'react-dom'
changeText() {
  setTimeout(() => {
    flushSync(() => {
      this.setState({
        message: 'Hello React!',
      })
    })
    console.log('message:', this.state.message) // Hello React
  }, 0)
}
```

