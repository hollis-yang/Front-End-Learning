import React, { Component } from 'react'
import Home from './Home'
import ThemeContext from './context/theme.context'
import UserContext from './context/user.context'
import Profile from './Profile'

export class App extends Component {
  constructor() {
    super()
    this.state = {
      info: {
        name: 'zce',
        age: 18,
      },
    }
  }
  render() {
    // const { info } = this.state
    return (
      <div>
        <h2>home</h2>
          <UserContext.Provider value={{ color: 'red', size: '20' }}>
            <ThemeContext.Provider value={{ color: 'green', size: '30' }}>
              <Home />
            </ThemeContext.Provider>
          </UserContext.Provider>
          <Profile />
      </div>
    )
  }
}

export default App
