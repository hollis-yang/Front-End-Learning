# 12 Iterator Generator

## 迭代器与可迭代对象

### 迭代器 Iterator

迭代器是帮助我们对某个数据结构【数组、链表、对象、哈希表、树、图等】进行遍历的对象

在JavaScript中，迭代器是一个具体的对象，这个对象需要符合迭代器协议（iterator protocol）：

- 迭代器协议定义了产生一系列值（无论是有限还是无限个）的标准方式：在JavaScript中这个标准就是一个特定的**next方法**
- next方法有如下的要求：一个**无参数或者一个参数**的函数，返回一个应当拥有以下两个属性的对象
  - **done（boolean） **
    - 如果迭代器可以产生序列中的下一个值，则为 false（这等价于没有指定 done 这个属性）
    - 如果迭代器已将序列迭代完毕，则为 true。这种情况下，value 是可选的，如果它依然存在，即为迭代结束之后的默认返回值
  - **value**
    - 迭代器返回的任何 JavaScript 值。done 为 true 时可省略

```js
const names = ["abc", "cba", "nba"]

let index = 0
const namesIterator = {
  next: function() {
    // done: boolean
    // value: 具体值/undefined
    if (index < names.length) {
      return { done: false, value: names[index++] }
    } else {
      return { done: true }
    }
  }
}

console.log(namesIterator.next())
。。。
```

但这样的迭代器并不是通用的，可以统一为数组封装以下迭代器：

```js
function createArrayIterator(arr) {
  let index = 0
  return {
    next: function() {
      if (index < arr.length) {
        return { done: false, value: arr[index++] }
      } else {
        return { done: true }
      }
    }
  }
}
const namesIterator = createArrayIterator(names)
```

### 可迭代对象

迭代器的问题：我们获取一个数组的时候，需要自己创建一个index变量，再创建一个所谓的迭代器对象。也就是说，迭代器和数组两者是分开的

优化方式：进一步封装，使其变成一个**可迭代对象**

- 当一个对象实现了iterable protocol协议时，它就是一个可迭代对象
- 这个对象的要求是必须实现 **@@iterator 函数**，在代码中我们使用 **[Symbol.iterator]** （不能修改此方法名称！），同时该函数需要返回一个迭代器【这个迭代器用于迭代该对象】

```js
const infos = {
  friends: ["kobe", "james", "curry"],
  [Symbol.iterator]: function() {
    let index = 0
    const infosIterator = {
      next: function() {
        // done: Boolean
        // value: 具体值/undefined
        if (index < infos.friends.length) {
          return { done: false, value: infos.friends[index++] }
        } else {
          return { done: true }
        }
      }
    }
    return infosIterator
  }
}
```

一定可以执行：

```js
const iterator = infos[Symbol.iterator]()  // 拿到迭代器
console.log(iterator.next())  // 调用迭代器的next

// 对于一个数组来说默认实现了迭代器[Symbol.iterator]
const students = ["张三", "李四", "王五"]
console.log(students[Symbol.iterator])  // function
const studentIterator = students[Symbol.iterator]()  // iterator
```

 当一个对象变成一个可迭代对象的时候，就可以`for...of`，得到迭代器返回的value（`infos.friends[index++]`）

```js
for (const item of infos)
// kobe
// james
// curry
```

**数组迭代的进一步优化：每个可迭代对象的名称不同，改用`this`**

- 如果在next中不使用箭头函数，这里的`this`是`[Symbol.iterator]`，是无法拿到`.friends`的。使用箭头函数情况下不绑定`this`，自动到上层作用域中找，也就是绑定到了`infos`

```js
const infos = {
  friends: ["kobe", "james", "curry"],
  [Symbol.iterator]: function() {
    let index = 0
    const infosIterator = {
      next: () => {
        if (index < this.friends.length) {
          return { done: false, value: this.friends[index++] }
        } else {
          return { done: true }
        }
      }
    }
    return infosIterator
  }
}
```

**迭代一个对象（key/value）**

```js
const infos = {
  name: "why",
  age: 18,
  height: 1.88,
    
  [Symbol.iterator]: function() {
    // const keys = Object.keys(this)
    // const values = Object.values(this)
    const entries = Object.entries(this)
    let index = 0
    const iterator = {
      next: function() {
        if (index < entries.length) {
          return { done: false, value: entries[index++] }
        } else {
          return { done: true }
        }
      }
    }
    return iterator
  }
}
```

### 原生可迭代对象

很多原生对象已经实现了可迭代协议，会生成一个可迭代对象：**String、Array、Map、Set、arguments对象、NodeList集合**

### 可迭代对象的应用场景

- **JavaScript中语法：**`for ...of`、展开语法（spread syntax）、`yield`、解构赋值（Destructing assignment）
- **创建一些对象时：**`new Map([Iterable])`、`new WeakMap([iterable])`、`new Set([iterable])`、`new WeakSet([iterable])`
- **一些方法的调用：**`Promise.all(iterable)`、`Promise.race(iterable)`、`Array.from(iterable)`

### 自定义类的迭代器

- 在面向对象开发中，我们可以通过class定义一个自己的类，这个类可以创建很多的对象
- 如果我们也希望自己的类创建出来的对象默认是可迭代的，那么在设计类的时候我们就可以添加上 @@iterator 方法

```js
class Person {
  constructor(name, age, height, friends) {
    this.name = name
    this.age = age
    this.height = height
    this.friends = friends
  }

  [Symbol.iterator]() {
    let index = 0
    const iterator = {
      next: () => {
        if (index < this.friends.length) {
          return { done: false, value: this.friends[index++] }  // 迭代某一个属性friends
        } else {
          return { done: true }
        }
      }
    }
    return iterator
  }
}

const p1 = new Person("why", 18, 1.88, ["curry", "kobe", "james"])
for (const item of p1) {
  console.log(item)
}
```

### 迭代器的中断

迭代器在某些情况下会在没有完全迭代的情况下中断：

- 中断循环：`break`, `return`, `throw`
- 在解构时，没有解构所有的值

迭代器中断的监听：`return`方法

```js
return: () => {
  console.log("监听到迭代器中断了")
  return { done: true }  // 也需要返回一个对象
}
```



## 生成器 Generator

### 生成器与生成器函数

- 生成器是ES6中新增的一种函数控制、使用的方案，它可以让我们更加**灵活的控制函数什么时候继续执行、暂停执行**等。

- 生成器函数也是一个函数，但是和普通的函数有一些区别：
  - 1）生成器函数需要在`function`的后面加一个符号：`*`【`function* foo() {...}`】
  - 2）生成器函数可以通过`yield`关键字来控制函数的执行流程
  - 3）生成器函数的返回值是一个Generator
- ==生成器事实上是一种特殊的迭代器==
- 注意：要想执行生成器函数内部的代码，需要生成器对象，调用它的`next`方法，但在遇到`yield`时会中断，再调`next`时会继续执行，直到遇到`return`为止

```js
function* foo() {
  console.log("1111")
  yield
  console.log("3333")
}

const generator = foo()
generator.next()  // 1111
generator.next()  // 3333
```

### 生成器的参数和返回值

迭代器的`next`一般需要返回一个value，这时可以用`yield`返回结果

```js
function* foo() {
  console.log("1111")
  yield 'aaaa'
  console.log("3333")
  yield 'bbbb' 
  console.log("5555")
  return undefined
}

const generator = foo()
console.log(generator.next())
console.log(generator.next())
console.log(generator.next())

// 1111
// {done: false, value: 'aaaa'}
// 3333
// {done: false, value: 'aaaa'}
// 5555
// {done: true, value: undefined}
```

`yield`同样可以用于传参：调用`next`时传递的参数会作为上一个`yield`语句的返回值

```js
function* foo(name1) {
  console.log("执行内部代码:1111", name1)
  const name2 = yield "aaaa"
  console.log("执行内部代码:3333", name2)
  const name3 = yield "bbbb"
  console.log("执行内部代码:5555", name3)
  yield "cccc"
  return undefined
}

const generator = foo("next1")
console.log(generator.next())  // 第一次调用next一般不传参
console.log(generator.next("next2"))
console.log(generator.next("next3"))
console.log(generator.next())

// 执行内部代码:1111 next1
// {value: 'aaaa', done: false}
// 执行内部代码:3333 next2
// {value: 'bbbb', done: false}
// 执行内部代码:3333 next3
// {value: 'cccc', done: false}
// {value: undefined, done: true}
```

### 生成器提前结束

**generator.return 提前结束函数**

立即结束，返回对象中的value为传入的参数，再调用`next`时value为undefined、done为true

```js
function* foo() {
  const value1 = yield 'why'
  // 以下均未执行
  console.log('value1:', value1) 
  const value2 = yield value1
  const value3 = yield value2
}

const generator = foo()
console.log(generator.next())
console.log(generator.return(123))
console.log(generator.next())
// {value: 'why', done: false}
// {value: 123, done: true}
// {value: undefined, done: true}
```

**generator.throw 抛异常**

- 抛出异常后可以在生成器函数中捕获异常
- 在catch语句中不能继续`yield`，但是可以在catch语句外使用yield继续中断函数的执行

```js
function* foo() {
  console.log('start~')
  try {
    yield 'why'
  } catch (error) {
    console.log('error:', error)
  }
  yield 222
  console.log('end~')
}

const generator = foo()
console.log(generator.next())
generator.throw(new Error('抛出一个异常'))
console.log(generator.next())

/*
start~
{value: 'why', done: false}
error: Error: 抛出一个异常
end~
{value: undefined, done: true} */
```



## 生成器代替迭代器

```js
function* createArrayIterator(arr) {
  for (let i = 0; i < arr.length; i++) {
    yield arr[i]
  }
}

const names = ["abc", "cba", "nba"]
const namesIterator = createArrayIterator(names)
// 调用next方法
```

例子：生成某个范围的值

```js
function* createRangeGenerator(start, end) {
  for (let i = start; i < end; i++) {
    yield i
  }
}

const rangeGen = createRangeGenerator(3, 9)
// 调用next方法
```

### yield* 语法糖

```js
function* createArrayIterator(arr) {
  yield* arr
}
```

`yield*`会依次迭代一个**可迭代对象**，每次迭代其中的一个值

### 自定义类 yield* 迭代器

在类当中不写`function`，将`*`放到最前面

```js
class Person {
  constructor(name, age, height, friends) {
    this.name = name
    this.age = age
    this.height = height
    this.friends = friends
  }

  *[Symbol.iterator]() {
    yield* this.friends
  }
}
```

