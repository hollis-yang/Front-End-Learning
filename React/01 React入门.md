# 01 React入门

## 一、React的开发依赖

开发React必须依赖三个库：

- **react：**包含react所必须的核心代码
- **react-dom：**react渲染在不同平台（web、移动端等）所需要的核心代码
- **babel：**将jsx转换成普通js代码的工具

> react包中包含了react web和react-native所共同拥有的核心代码
>
> react-dom针对web和react-native所完成的事情不同：
>
> - web端：react-dom会将jsx最终渲染成真实的DOM，显示在浏览器中
> - native端：react-dom会将jsx最终渲染成原生的控件（比如Android中的Button，iOS中的UIButton）

### Babel和React

Babel是前端最广泛使用的编译器、转移器。主要作用是将**ES6+、jsx等**转换为**ES5 JavaScript**

但React也可以不使用babel（自己使用`React.createElement`编写源代码，但代码十分繁琐且可读性差）

### 引入相关依赖（CDN）

```jsx
<script src="https://unpkg.com/react@18/umd/react.development.js" crossorigin></script>
<script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js" crossorigin></script>
<script src="https://unpkg.com/babel-standalone@6/babel.min.js"></script>
```



## 二、Hello React

- 编写React的script代码中，必须添加 `type="text/babel"`，作用是可以让babel解析jsx的语法
- `ReactDOM.createRoot()`：用于创建一个React根，之后渲染的内容会包含在这个根中，参数为根的位置（挂载到哪个HTML元素上，eg. #app）
- `root.render()`：参数为要渲染的根组件【React需要手动重新渲染模板；区别于Vue是自动渲染】
- React中通过 `{}`来引入外部的变量或者表达式
    - 注意区分Vue中的`{{}}`和绑定事件的`@click="btnClick"`
    - React中绑定点击事件 `onClick={btnClick}`

```jsx
<div id="root"></div>
<script type="text/babel">
  const root = ReactDOM.createRoot(document.querySelector("#root"))

  let message = "Hello World"  // 将数据写成变量

  function btnClick() {
    message = "Hello React"
    rootRender()  // Vue是不需要的
  }
  function rootRender() {
    root.render((
      <div>
        <h2>{message}</h2>
        <button onClick={btnClick}>修改文本</button>
      </div>
    ))
  }
  rootRender()
</script>
```



## 三、组件化开发

`root.render()`参数是一个**HTML元素**或者**一个组件（自己封装）**

```jsx
root.render(<App/>)  // 渲染App组件
```

React当中的组件有两种：**1. 类组件；2. 函数式组件**

### 类组件的定义步骤

1. 定义一个类（类名大写，组件的名称是必须大写的，小写会被认为是HTML元素），继承自React.Component，eg. `class App extends React.Component`

2. 实现当前组件的render函数（render当中返回的jsx，就是React后序渲染的内容）

```jsx
class App extends React.component {
  constructor() {
    super()
    ...
  }
  render() {
    return (
      <h1>hello world</h1>
    )
  }
}
```

### 数据依赖与事件绑定

- 参与界面更新的数据必须定义在组件对象的**state**中 

在构造函数中 `this.state = {定义的数据} `【基本上所有数据都放在 state 中】

```jsx
class App extends React.component {
  constructor() {
    super()
    this.state = {
      message = 'hello world'
    }
  }
  render() {...}
}
```

当数据发生变化时，调用 `this.setState` 来更新数据，并且通知React进行update操作【与Vue一样会自动使用最新数据进行渲染】

```jsx
btnClick() {
  // 两件事->1.将state中message值修改掉 2.自动重新执行render函数函数
  this.setState({
    message: "Hello React"
  })
  console.log(this)
}
```

但以上代码可能会出现`this`绑定问题：

> 在正常的DOM操作中，监听点击，监听函数中的this其实是节点对象（比如说是\<button\>）
>
> 而React并不是直接渲染成真实的DOM，我们所编写的button只是一个语法糖，它的本质是React的Element对象。在这里发生监听的时候，react在执行函数时并没有绑定this，默认情况下就是一个undefined

```jsx
const App = new App()
const foo = App.btnClick
foo()  // undefined(严格模式下 babel默认use strict, 否则应该绑定到window) 
```

因此，当我们在函数中需要使用当前对象（类的实例），比如执行 `this.setState` 函数，就必须拿到当前对象的`this`

- **解决方法1：**在使用时显式绑定`this`

```jsx
render() {
  return (
    <div>
      <h2>{this.state.message}</h2>
      <button onClick={this.btnClick.bind(this)}>修改文本</button>
    </div>
  )
}
```

- 但是如果需要多次使用某方法，解决方法1需要多次绑定，略繁琐。有**解决方法2：**在`constructor`中提前绑定好`this`

```jsx
constructor() {
  super()
  this.state = {...}

  this.btnClick = this.btnClick.bind(this)
}
```



