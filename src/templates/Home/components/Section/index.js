import React from 'react'
import css from './index.module.css'

export const MouseContext = React.createContext()

export default class Section extends React.Component {
  state = { mouse: { x: 0, y: 0 } }

  translateMouse = e => {
    this.setState({ mouse: { x: e.clientX, y: e.clientY } })
  }

  render() {
    return (
      <MouseContext.Provider value={this.state.mouse}>
        <section className={css.container} onMouseMove={this.translateMouse}>
          {this.props.children}
        </section>
      </MouseContext.Provider>
    )
  }
}
