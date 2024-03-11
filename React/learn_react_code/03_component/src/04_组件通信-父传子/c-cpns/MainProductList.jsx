import React, { Component } from 'react'

export class MainProductList extends Component {
  render() {
    const { productList } = this.props
    return (
      <div>
        <h2>productList</h2>
        <ul>
          {productList.map((item) => {
            return <li key={item.acm}>{item.title}</li>
          })}
        </ul>
      </div>
    )
  }
}

export default MainProductList
