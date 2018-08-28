import React from 'react'
import { MouseContext } from '../Section'

export default class FollowMouse extends React.Component {
  translateMouse = ({ x, y }) => {
    if (this.dom) {
      const { left, top, width, height } = this.dom.getBoundingClientRect()
      const mouseX = (x - (left + width / 2)) * 0.009
      const mouseY = (y - (top + height / 2)) * 0.009
      return { transform: `translate(${mouseX}px, ${mouseY}px)` }
    }
    return { transform: `translate(0px, 0px)` }
  }
  render() {
    return (
      <MouseContext.Consumer>
        {context =>
          React.cloneElement(React.Children.only(this.props.children), {
            ref: dom => {
              this.dom = dom
            },
            style: this.translateMouse(context)
          })
        }
      </MouseContext.Consumer>
    )
  }
}
