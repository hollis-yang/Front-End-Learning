# 11 Promise

## Promise 基本使用

Promise 是一个类

-  在通过 new 创建 Promise 对象时，需要传入一个回调函数，称之 executor ，这个回调函数会被立即执行，并且给传入另外两个回调函数 resolve、reject
- 当我们调用 resolve 回调函数时，会执行 Promise 对象的 then 方法传入的回调函数
- 当我们调用 reject 回调函数时，会执行 Promise 对象的 catch 方法传入的回调函数

```js
function execCode(counter) {
  const promise = new Promise((resolve, reject) => {
    // 异步任务
    setTimeout(() => {
      if (counter > 0) { // counter可以计算的情况 
        let total = 0
        for (let i = 0; i < counter; i++) {
          total += i
        }
        // 成功的回调
        resolve(total)
      } else { // 失败情况, counter有问题
        // 失败的回调
        reject(`${counter}有问题`)
      }
    }, 3000)
  })
  return promise
}
```

```js
execCode(255)
.then(value => {
  console.log("成功:", value)
})
.catch(err => {
  console.log("失败:", err)
})
```

Promise 的三种状态：

- 待定（pending）: 初始状态，既没有被兑现，也没有被拒绝，当执行 executor 中的代码时，处于该状态
- 已兑现（fulfilled）: 意味着操作成功完成，执行了 resolve 时，处于该状态，Promise 已经被兑现
- 已拒绝（rejected）: 意味着操作失败，执行了 reject 时，处于该状态，Promise 已经被拒绝

注意：一旦状态被确定下来，Promise 的状态会被锁死，该 Promise 的状态是不可更改的



## resolve 不同值的区别

情况一：如果resolve传入一个普通的值（number, array, string 等）或者对象，那么这个值会作为then回调的参数【基本上只会是这种情况】

```js
const promise = new Promise((resolve, reject) => {
  resolve('aaa')
})

promise.then(res => console.log(res))  // aaa
```

情况二：如果resolve中传入的是另外一个Promise，那么这个新Promise会决定原Promise的状态

```js
const p = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('p的resolve')
  }, 2000)
})

const promise = new Promise((resolve, reject) => {
  resolve(p)
})

promise.then(res => console.log(res))  // p的resolve
```

情况三：如果resolve中传入的是一个对象（thenable对象），并且这个对象有实现then方法，那么会执行该then方法，并且根据then方法的结果（是resolve还是reject）来决定Promise的状态

```js
const promise = new Promise((resolve, reject) => {
  resolve({
    name: 'abc',
    then: function(resolve, reject) {
      resolve(111)
    }
  })
})

promise.then(res => console.log(res))  // 111
```



## then方法

### 接受两个参数

fulfilled的回调函数：当状态变成fulfilled时会回调的函数； reject的回调函数：当状态变成reject时会回调的函数；

```js
promise.then(res => console.log("成功回调~", res), 
             err => console.log("失败回调~", err))

promise
.then(res => console.log("成功回调~", res))
.catch(err => console.log("失败回调~", err))
```

### 支持多次调用

一个Promise的then方法是可以被多次调用的，当Promise的状态变成fulfilled的时候，这些回调函数会依次被执行

```js
const promise = new Promise((resolve, reject) => {
      resolve("success")
      // reject("failure")
    })
promise.then(res => {
  console.log("成功回调1~", res)
})
promise.then(res => {
  console.log("成功回调2~", res)
})
promise.then(res => {
  console.log("成功回调3~", res)
})
```

### 返回值

- ==then的返回值是一个Promise==，该新Promise的决议是等到then方法传入的回调函数有返回值时，进行决议
- `Promise.then`支持链式调用，链式中的then是在等待**新的Promise**的决议结果后再执行，且新Promise的返回值将作为下一次then的resolve

```js
const fn = (res) => {
  console.log("第一个then方法:", res)
  return 'bbbbbbb'
}
const newPromise = new Promise((resolve) => {
  const newres = fn()
  resolve(newres)
})
```

```js
const promise = new Promise((resolve) => {
  resolve("aaaaaaa")
})

promise.then(res => {
  console.log("第一个then方法:", res)  // aaaaaaa
  return "bbbbbbb"
}).then(res => {
  console.log("第二个then方法:", res)  // bbbbbbb
  return "ccccccc"
}).then(res => {
  console.log("第三个then方法:", res)  // ccccccc
})
```

- then返回的Promise的状态分析：

  - 当then方法中的回调函数本身在执行的时候，那么它处于**pending状态**
    - 当then方法中的回调函数返回一个结果时，那么它处于**fulfilled状态**，并且会将结果作为resolve的参数
      - 情况一：返回一个普通的值
      - 情况二：返回一个Promise
      - 情况三：返回一个thenable值

  -  当then方法抛出一个异常时，那么它处于**reject状态**



## catch 方法

- 当Promise的状态变成reject的时候，会依次调用Promise的catch方法【同样支持多次调用】
- Promise会自动找到距其最近的catch执行

```js
const promise = new Promise((resolve, reject) => {
  reject("error")
})

promise.then(res => {
  console.log("then第一次回调:", res)  // 不执行
}).then(res => {
  console.log("then第二次回调:", res)  // 不执行
}).catch(err => {
  console.log("catch回调被执行:", err)  // error
})
```

- ==catch方法也会返回一个Promise==，所以catch方法后面我们也可以继续调用then方法或者catch方法【调用then还是catch取决于**新的Promise**的状态到底是fulfilled还是reject：在没有return语句（返回undefined）、返回一个普通值的情况下都代表是fulfilled；如果需要继续执行"catch"，需要`throw new Error`抛出异常表示拒绝**新Promise**】

```js
const promise = new Promise((resolve, reject) => {
  resolve('aaa')
})

promise.then(res => {
  console.log("then第一次回调:", res)  // aaa
  throw new Error('error')
}).then(res => {
  console.log("then第二次回调:", res)  // 不执行
}).catch(err => {
  console.log("catch回调被执行:", err)  // error
})
```

- 注意：一般情况下 then & catch 都要写



## then/catch练习

```js
const promise = new Promise((resolve, reject) => {
  resolve("aaaaaa")
  reject("error")  // 没什么用，一定会resolve
  
  /* 交换resolve和reject的顺序 */
  reject("error")
  resolve("aaaaaa")  // 没什么用，一定会reject
})

promise.then(res => {
  console.log("then第一次回调:", res)
  return "bbbbbb"
}).then(res => {
  console.log("then第二次回调:", res)
  throw new Error("第三个Promise的异常error")
}).then(res => {
  console.log("then第三次回调:", res)
}).catch(err => {
  console.log("catch回调被执行:", err)
}).then(res => {
  console.log("then第四次回调:", res)
})

// then第一次回调: aaaaaa
// then第二次回调: bbbbbb
// catch回调被执行: Error: 第三个Promise的异常error
// then第四次回调: undefined

/* 交换resolve和reject的顺序 */
// catch回调被执行: error
// then第四次回调: undefined
```



## finally 方法

finally是在ES9（ES2018）中新增的一个特性：finally不接收参数，表示无论Promise对象无论变成fulfilled还是reject，最终都会被执行

```js
const promise = new Promise((resolve, reject) => {
  resolve("aaaaaa")
  // reject("error")
})

promise.then(res => {
  console.log("then:", res)  // aaaaaa
}).catch(err => {
  console.log("catch:", err)
}).finally(() => {
  console.log("end")  // end
})
```



## Promise的类方法和实例方法

- Promise的then、catch、finally方法都属于Promise的**实例方法**，都是存放在Promise的prototype上的 
- Promise的**类方法：1）resolve；2）reject；3）all；4）allSettled；5）race；6）any**

### Promise.resolve

以下两者是等价的：

```js
Promise.resolve('why')
new Promise(resolve => resolve('why'))
```

用途：已经有一个现成的内容，希望将其转成Promise来使用（比如返回出去）

resolve的参数形态：普通的值或者对象；Promise；thenable

### Promise.reject

reject方法类似于resolve方法，只是会将Promise对象的状态设置为reject

以下两者是等价的：

```js
Promise.reject('why')
new Promise((resolve, reject) => reject('why'))
```

Promise.reject传入的参数无论是什么形态，都会直接作为reject状态的参数传递到catch的

### Promise.all

Promise.all将多个Promise包裹在一起形成一个**新的Promise**

新的Promise状态由包裹的所有Promise共同决定：

- 当所有的Promise状态变成fulfilled状态时，新的Promise状态为fulfilled，并且会将所有Promise的返回值组成一个数组
- 当有一个Promise状态为reject时，新的Promise状态为reject，并且会将第一个reject的返回值作为参数

```js
const p1 = new Promise((resolve, reject) => {})
const p2 = new Promise((resolve, reject) => {})
const p3 = new Promise((resolve, reject) => {})

Promise.all([p1, p2, p3]).then(res => {
  console.log("all promise res:", res)   // 三个resolve存储在res数组中
}).catch(err => {
  console.log("all promise err:", err)  // 只包含唯一一个reject的返回值
})
```

### Promise.allSettled

- all方法的缺陷：当有其中一个Promise变成reject状态时，新Promise就会立即变成对应的reject状态。那么对于resolved的，以及依然处于pending状态的Promise，我们是获取不到对应的结果的。

- 在ES11（ES2020）中，添加了新的API **Promise.allSettled**：

  该方法会在所有的Promise都有结果（settled）【无论是fulfilled，还是rejected时，才会有最终的状态】；**并且这个Promise的结果一定是fulfilled的【then一定会执行】**

```js
const p1 = new Promise((resolve, reject) => {reject("p1 reject error")})
const p2 = new Promise((resolve, reject) => {resolve("p2 resolve")})

Promise.allSettled([p1, p2]).then(res => {
  console.log("all settled:", res)
})
```

- 返回值：数组中是一个个对象，对象中的status代表每一个Promise的决议

```js
/*
[
  {status: 'rejected', reason: 'p1 reject error'},
  {status: 'fulfilled', value: 'p2 resolve'}
]
*/
```

### Promise.race

如果有一个Promise有了结果，我们就希望决定最终新Promise的状态【无论是fulfilled还是reject】

```js
Promise.race([p1, p2, p3]).then(res => {
  console.log("race promise:", res)
}).catch(err => {
  console.log("race promise err:", err)
})
```

### Promise.any

any方法会等到一个fulfilled状态，才会决定新Promise的状态

如果所有的Promise都是reject，那么也会等到所有的Promise都变成rejected状态，**同时报一个`AggregateError: All promises were rejected`的错误**

```js
Promise.any([p1, p2, p3]).then(res => {
  console.log("race promise:", res)
}).catch(err => {
  console.log("race promise err:", err)
})
```

