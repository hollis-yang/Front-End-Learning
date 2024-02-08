# 13 async await 事件循环

## 异步处理方案

需求：发送三次网络请求，每一次网络请求都依赖上一次返回的结果

### Promise 方案

```js
// 封装请求
function requestData(url) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(url)
    }, 2000)
  })
}
```

方式一：层层嵌套（回调地狱 callback hell）

```js
function getData() {
  // 1.第一次请求
  requestData("why").then(res1 => {
    console.log("第一次结果:", res1)
    // 2.第二次请求
    requestData(res1 + "kobe").then(res2 => {
      console.log("第二次结果:", res2)
      // 3.第三次请求
      requestData(res2 + "james").then(res3 => {
        console.log("第三次结果:", res3)
      })
    })
  })
}
```

方式二：使用Promise进行链式调用重构（解决回调地狱）

```js
function getData() {
  requestData("why").then(res1 => {
    console.log("第一次结果:", res1)
    return requestData(res1 + "kobe")
  }).then(res2 => {
    console.log("第二次结果:", res2)
    return requestData(res2 + "james")
  }).then(res3 => {
    console.log("第三次结果:", res3)
  })
}
```

### Generator方案

```js
function* getData() {
  const res1 = yield requestData("why")
  const res2 = yield requestData(res1 + "kobe")
  const res3 = yield requestData(res2 + "james")
  const res4 = yield requestData(res3 + "curry")
}

const generator = getData()
// .value是一个Pending的Promise
generator.next().value.then(res1 => {
  generator.next(res1).value.then(res2 => {
    generator.next(res2).value.then(res3 => {
      generator.next(res3).value.then(res4 => {
        generator.next(res4)
      })
    })
  })
})
```

问题：我们无法确定调用Promise的层级（还是有回调地狱的代码）；同时可能有多处需要执行这样的函数，因此**封装自动执行generator函数 `execGenFn(genFn)`**

```js
// 【递归实现】
function execGenFn(genFn) {
  // 1.获取对应函数的generator
  const generator = genFn()
  // 2.定义一个递归函数
  function exec(res) {
    // result -> { done: true/false, value: 值(这里是Promise)/undefined }
    const result = generator.next(res)
    if (result.done) return
    result.value.then(res => {
      exec(res)
    })
  }
  // 3.执行递归函数
  exec()
}

execGenFn(getData)
```

### async/await方案

async/await本质是对Generator处理异步问题的语法糖

```js
async function getData() {
  const res1 = await requestData("why")
  const res2 = await requestData(res1 + "kobe")
  const res3 = await requestData(res2 + "james")
}
getData()
```



## async/await

### 异步函数 async function

- async（asynchronous）：异步、非同步

- sync（synchronous）：同步、同时

异步函数的写法：声明时加上 `async`

```js
async function foo1() {}
const foo2 = async function() {}
const foo3 = async () => {}
class Person {
  async foo() {}
}
```

### 异步函数的执行流程

1. 异步函数的内部代码执行过程和普通的函数是一致的，默认情况下也是会被同步执行
2. ==但是，异步函数有返回值时，和普通函数有区别==
    - 情况一：异步函数也可以有返回值，但是异步函数的返回值相当于被包裹到Promise.resolve中【因此，所有异步函数都可以`.then()`】
    - 情况二：异步函数的返回值是Promise，状态由会由Promise决定
        - 1）普通值
        - 2）新Promise
        - 3）thenable
    - 情况三：如果我们的异步函数的返回值是一个对象并且实现了thenable，那么会由对象的then方法来决定

当异步函数中有抛出异常（产生错误）, 这个异常不会立即被浏览器处理，而是进行如下处理：Promise.reject(error)【因此可以在调用时用`.catch`捕获】

```js
async function foo() {
  // "abc".filter()
  throw new Error("async function error")
  // return new Promise((resolve, reject) => {
  //   reject("err rejected")
  // })
  return 123
}

foo().then(res => {
  console.log("res:", res)
}).catch(err => {
  console.log("err:", err)
})
```

### await 关键字

==await必须在异步函数中使用==

- 通常使用await是后面会跟上一个表达式，这个表达式会返回一个Promise【不是说不能是普通值，只不过这样做没有太大的意义】
- await会等到Promise的状态变成fulfilled状态，之后继续执行异步函数剩余的代码
    - 1）await后面是一个普通的值，那么会直接返回这个值
    - 2）await后面是一个thenable的对象，那么会根据对象的then方法调用来决定后续的值
    - 3）await后面的表达式返回的Promise是reject的状态，那么会将这个reject结果直接作为async异步函数的Promise的reject值

```js
function requestData(url) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(url)
    }, 2000);
  })
}

async function getData() {
  const res1 = await requestData("why")
  console.log("res1:", res1)
  const res2 = await requestData(res1 + "kobe")
  console.log("res2:", res2)
}

getData().catch(err => {
  console.log("err:", err)
})
```

以上代码也可以使用`try...catch`来写：

```js
async function getData() {
  try {
    const res1 = await requestData("why")
    console.log("res1:", res1)
    const res2 = await requestData(res1 + "kobe")
    console.log("res2:", res2)
  } catch (error) {
    console.log("error:", error)
  }
}
```

注意：await后接的函数可以是一个返回Promise的非异步函数；也可以是一个异步函数返回的普通值【异步函数的返回值已经包裹在Promise中了】



## 浏览器进程与线程

