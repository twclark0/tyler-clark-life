import React from 'react'
import { MouseContext } from '../Section'

export default class FollowMouse extends React.Component {
  translateMouse = ({ x, y }) => {
    if (this.dom) {
      const { left, top, width, height } = this.dom.getBoundingClientRect()
      const mouseX =
        this.props.transX + (x - (left + width / 2)) * this.props.sensitivity
      const mouseY =
        this.props.transY + (y - (top + height / 2)) * this.props.sensitivity
      return { transform: `translate(${mouseX}px, ${mouseY}px)` }
    }
    return {
      transform: `translate(${this.props.defaults.x}px, ${
        this.props.defaults.y
      }px)`
    }
  }
  render() {
    const otherInlineStyles = this.props.inline ? { ...this.props.inline } : {}
    return (
      <MouseContext.Consumer>
        {context =>
          React.cloneElement(React.Children.only(this.props.children), {
            ref: dom => {
              this.dom = dom
            },
            style: { ...this.translateMouse(context), ...otherInlineStyles }
          })
        }
      </MouseContext.Consumer>
    )
  }
}
FollowMouse.defaultProps = {
  transX: 0,
  transY: 0,
  sensitivity: 0.009,
  defaults: { x: 0, y: 0 }
}
