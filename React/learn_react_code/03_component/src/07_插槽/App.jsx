import React, { Component } from 'react'
import NavBar from './nav-bar'
import NavBar2 from './nav-bar2'

export class App extends Component {
  render() {
    return (
      <div>
        <NavBar>
          <button>按钮</button>
          <h2>title</h2>
          <i>斜体</i>
        </NavBar>

        <NavBar2
          leftSlot={<button>按钮</button>}
          centerSlot={<h2>title</h2>}
          rightSlot={<i>斜体</i>}
        >
        </NavBar2>
      </div>
    )
  }
}

export default App