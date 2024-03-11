import React, { Component } from 'react'
import PropTypes from 'prop-types'

export class MainBanner extends Component {
  constructor(props) {
    super(props)
    // console.log(props)
  }
  render() {
    // console.log(this.props)

    const { title, banners } = this.props
    
    return (
      <div>
        <h2>{title}</h2>
        <ul>
          {
            banners.map((item) => {
              return <li key={item.acm}>{item.title}</li>
            })
          }
        </ul>
      </div>
    )
  }
}

MainBanner.propTypes = {
  banners: PropTypes.array,
  title: PropTypes.string
}
MainBanner.defaultProps = {
  banners: [],
  title: '默认标题'
}

export default MainBanner
