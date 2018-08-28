import React from 'react'
import FollowMouse from './components/FollowMouse'
import css from './index.module.css'
import 'regenerator-runtime/runtime'
import tyler from './tyler-BW.png'
import Section from './components/Section'

export default class Home extends React.Component {
  state = {
    bubbles: {
      experiance: 'hidden',
      twitter: 'hidden',
      linkedIn: 'hidden',
      resume: 'hidden',
      talks: 'hidden',
      youtube: 'hidden'
    }
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

  render() {
    return (
      <Section>
        <div className={css.imgContainer} />
        <FollowMouse>
          <img className={css.profileImg} src={tyler} />
        </FollowMouse>
        <div
          className={css.contentContainer}
          ref={el => (this.containerRef = el)}>
          <div className={css.profile}>
            <FollowMouse>
              <h1>Tyler Clark</h1>
            </FollowMouse>
            <FollowMouse>
              <h3>Fullstack Developer</h3>
            </FollowMouse>
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
      </Section>
    )
  }
}
