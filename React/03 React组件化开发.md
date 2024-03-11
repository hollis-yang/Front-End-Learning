# 03 React组件化开发

## 一、React的组件化

React组件相对于Vue更加灵活多样：

- **★按组件定义方式**：**函数组件【hooks】（Functional Component）和类组件（Class Component）**
- 根据组件内部是否有状态需要维护：无状态组件（Stateless Component ）和有状态组件（Stateful Component）【flutter】
- 根据组件职责：展示型组件（Presentational Component）和容器型组件（Container Component）

>函数组件、无状态组件、展示型组件主要关注UI的展示
>
>类组件、有状态组件、容器型组件主要关注数据逻辑

- 还有其他组件：如异步组件、高阶组件......

### 类组件

类组件的定义有如下要求：

- 组件的名称是大写字符开头（无论类组件还是函数组件）
- 类组件需要继承自 `React.Component`
- 类组件必须实现render函数

在ES6之后，类组件一般使用`class`定义

> 注意：
>
> - `constructor`是可选的，通常在constructor中初始化一些数据
> - `this.state`中维护的就是组件内部的数据

```jsx
import React from 'react'

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      message: 'Hello React!',
    }
  }
  render() {
    const { message } = this.state
    return <h1>{message}</h1>
  }
}
export default App
```

### render函数返回值

当 `render()` 被调用时，它会检查 `this.props` 和 `this.state` 的变化（通过`setState`进行的修改）并返回以下类型之一：

- **React元素**
    - 通常通过 jsx 创建出来的都是React元素
    - 例如，<div /> 会被 React 渲染为 DOM 节点，<MyComponent /> 会被 React 渲染为自定义组件
- **数组或** **fragments**：使得 render 方法可以返回多个元素
- **Portals**：可以渲染子节点到不同的 DOM 子树中
- **字符串或数值类型**：它们在 DOM 中会被渲染为文本节点
- **布尔类型、null、undefined**：什么都不渲染

### 函数组件

函数组件是使用`function`来进行定义的函数，这个函数会返回和类组件中render函数返回一样的内容

函数组件有以下特点【在无hooks时】：

- 没有生命周期，也会被更新并挂载，但是没有生命周期函数
- `this`不能指向组件实例（因为没有组件实例）
- 没有内部状态（state）

```jsx
function App() {
  return (
    <div>
      <h1>Hello, React!</h1>
    </div>
  )
}
export default App
```



## 二、生命周期



## 三、组件通信



## 四、插槽



## 五、非父子通信



## 六、setState使用详解

