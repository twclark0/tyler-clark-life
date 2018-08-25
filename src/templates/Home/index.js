import React from 'react'
import css from './index.module.css'
import 'regenerator-runtime/runtime'

export default class Home extends React.Component {
  state = {
    bubbles: {
      experiance: 'hidden',
      twitter: 'hidden',
      linkedIn: 'hidden',
      resume: 'hidden',
      talks: 'hidden',
      youtube: 'hidden'
    },
    mouse: { x: 0, y: 0 },
    mouseMove: false
  }

  composeClasses(name) {
    return `${css.bubble} ${
      this.state.bubbles[name] === 'hidden' ? css.hide : css[`bubble--${name}`]
    }`
  }

  composeFontSize(name) {
    return `${this.state.bubbles[name] ? css['bubble--p'] : ''}`
  }

  componentDidMount() {
    Particles.init({
      selector: '.background',
      connectParticles: false
    })

    const self = this
    function* myGen() {
      yield* [...Object.keys(self.state.bubbles)]
      yield false
    }

    const gen = myGen()

    const showInterval = () => {
      const { value } = gen.next()
      if (value) {
        this.setState({
          bubbles: {
            ...this.state.bubbles,
            [value]: 'show'
          }
        })
      } else {
        clearInterval(showInterval)
      }
    }
    setInterval(showInterval, 200)
  }

  translateMouse = e => {
    const {
      left,
      top,
      width,
      height
    } = this.containerRef.getBoundingClientRect()
    const x = (e.clientX - (left + width / 2)) * 0.007
    const y = (e.clientY - (top + height / 2)) * 0.007
    this.setState({ mouse: { x, y }, mouseMove: true })
  }

  render() {
    const translation = {
      transform: `translate(${this.state.mouse.x}px, ${this.state.mouse.y}px)`
    }
    return (
      <section className={css.container} onMouseMove={this.translateMouse}>
        <div
          className={css.contentContainer}
          ref={el => (this.containerRef = el)}>
          <div className={css.profile}>
            <h1 style={{ ...translation }}>Tyler Clark</h1>
            <h3 style={{ ...translation }}>Fullstack Developer</h3>
          </div>
          <div className={css.bubblesContainer}>
            <div className={this.composeClasses('experiance')}>
              <p
                style={{ fontSize: '0px' }}
                className={this.composeFontSize('experiance')}>
                Experiance
              </p>
            </div>
            <div className={this.composeClasses('youtube')}>
              <i style={{ fontSize: '0px' }} className="fab fa-youtube" />
            </div>
            <div className={this.composeClasses('talks')}>
              <p
                style={{ fontSize: '0px' }}
                className={this.composeFontSize('talks')}>
                Talks
              </p>
            </div>
            <div className={this.composeClasses('linkedIn')}>
              <i style={{ fontSize: '0px' }} className="fab fa-linkedin-in" />
            </div>
            <div className={this.composeClasses('resume')}>
              <p
                style={{ fontSize: '0px' }}
                className={this.composeFontSize('resume')}>
                Resume
              </p>
            </div>
            <div className={this.composeClasses('twitter')}>
              <i style={{ fontSize: '0px' }} className="fab fa-twitter" />
            </div>
          </div>
        </div>
      </section>
    )
  }
}
