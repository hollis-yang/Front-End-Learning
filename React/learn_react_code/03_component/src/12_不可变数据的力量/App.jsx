import React, { PureComponent } from 'react'

export class App extends PureComponent {
  constructor() {
    super()
    this.state = {
      books: [
        { name: '《React.js 小书》', price: 30, count: 1 },
        { name: '《Vue.js 小书》', price: 40, count: 2 },
        { name: '《Angular.js 小书》', price: 50, count: 3 },
      ],
    }
  }

  addNewBook() {
    const newBook = { name: '《JavaScript 小书》', price: 60, count: 4 }
    // this.state.books.push(newBook)
    const newBooks = [...this.state.books, newBook]
    this.setState({
      books: newBooks,
    })
  }

  addBookCount(index) {
    const newbooks = [...this.state.books]
    newbooks[index].count += 1
    this.setState({
      books: newbooks,
    })
  }

  render() {
    const { books } = this.state
    return (
      <div>
        <h2>书籍列表</h2>
        <ul>
          {
            books.map((item, index) => {
              return (
                <li key={item.name}>
                  <span>{item.name}-{item.price}-{item.count}</span>
                  <button onClick={() => this.addBookCount(index)}>+1</button>
                </li>
              )
            })
          }
        </ul>
        <button onClick={() => this.addNewBook()}>+书</button>
      </div>
    )
  }
}

export default App
