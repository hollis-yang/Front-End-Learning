# 02 jsx语法

## 一、认识jsx

### 什么是jsx

jsx是一种JavaScript的语法扩展（eXtension），也在很多地方称之为JavaScript XML（因为看起就是一段XML语法）

它用于描述我们的UI界面，并且其完成可以和JavaScript融合在一起使用

它不同于Vue中的模块语法，不需要专门学习模块语法中的一些指令（如v-for、v-if、v-else、v-bind）

### React为什么选择jsx

React认为渲染逻辑本质上与其他UI逻辑存在内在耦合：**html in js**

- 比如UI需要绑定事件（button、a原生等等）
- 比如UI中需要展示数据状态
- 比如在某些状态发生改变时，又需要改变UI

渲染逻辑与UI逻辑之间是密不可分，所以React没有将标记分离到不同的文件中，而是将它们组合到了一起，这就是组件（Component）



## 二、jsx的基本使用

### jsx书写规范

- jsx的顶层**只能有一个根元素**，因此一般在最外层包裹一个div元素（或者使用Fragment）
- 为了方便阅读，我们通常在jsx的外层包裹一个小括号()，这样可以方便阅读，并且jsx可以进行换行书写
- jsx中的标签可以是单标签，也可以是双标签【注意：如果是单标签，必须以/>结尾】

### 注释

```jsx
render() {
  // 1.state的解构, 获取到message
  const { message } = this.state

  return (
    <div>
      { /* JSX的注释写法 */ }
      <h2>{message}</h2>
    </div>
  )
}
```

### jsx嵌入变量

- **情况一**：当变量是Number、String、Array类型时，可以直接显示
- **情况二**：当变量是null、undefined、Boolean类型时，内容为空（界面不会显示）
    - 如果希望可以显示null、undefined、Boolean，那么需要转成字符串
    - 转换的方式有很多，比如toString方法、和空字符串拼接，String(变量)等方式
- **情况三**：Object对象类型不能作为子元素（not valid as a React child）

### jsx嵌入表达式

```jsx
{/* 插入表达式 */}
<h2>{10 + 20}</h2>
<h2>{firstName + " " + lastName}</h2>
{/* 三元运算符 */}
<h2>{age >= 18 ? "成年人": "未成年人"}</h2>
{/* 调用方法获取结果 */}
<ul>{this.state.movies.map(movie => <li>{movie}</li>)}</ul>
<ul>{this.getMovieEls()}</ul>
```

### jsx绑定属性

在开发中，经常需要绑定src（img）、href（a）、class、style等属性

#### 绑定 class

**注意：绑定class属性时最好使用className**

```jsx
// 1.class绑定的写法一: 字符串的拼接
const className = `abc cba ${isActive ? 'active': ''}`
// 2.class绑定的写法二: 将所有的class放到数组中
const classList = ["abc", "cba"]
if (isActive) classList.push("active")
// 3.class绑定的写法三: 第三方库classnames -> npm install classnames

return (
  <div>
    <a href={href}>百度一下</a>
    <h2 className={className}>哈哈哈哈</h2>
    <h2 className={classList.join(" ")}>哈哈哈哈</h2>
  </div>
)
```

#### 绑定 style

**注意：写css时需要写成驼峰的形式**

```jsx
const objStyle = {color: "red", fontSize: "30px"}

return (
  <div>
    <h2 style={{color: "red", fontSize: "30px"}}>呵呵呵呵</h2>
    <h2 style={objStyle}>呵呵呵呵</h2>
  </div>
)
```





## 三、jsx的事件绑定



## 四、 jsx的条件渲染



## 五、jsx的列表渲染



## 六、jsx的原理和本质

