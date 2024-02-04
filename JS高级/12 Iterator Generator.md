# 12 Iterator Generator

## 迭代器与可迭代对象

### 迭代器

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

- **JavaScript中语法：**`for ...of`、展开语法（spread syntax）、`yield`、解构赋值（Destructuring assignment）
- **创建一些对象时：**`new Map([Iterable])`、`new WeakMap([iterable])`、`new Set([iterable])`、`new WeakSet([iterable])`
- **一些方法的调用：**`Promise.all(iterable)`、`Promise.race(iterable)`、`Array.from(iterable)`
