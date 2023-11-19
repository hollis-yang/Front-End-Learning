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

==then的返回值是一个Promise==



## catch 方法

catch方法也是会返回一个Promise对象，所以catch方法后面我们可以继续调用then方法或者catch方法

注意：一般情况下 then & catch 都要写