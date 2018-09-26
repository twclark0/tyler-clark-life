import React from 'react'
import FollowMouse from './components/FollowMouse'
import css from './index.module.css'
import 'regenerator-runtime/runtime'
import Section from './components/Section'
import Resume from './resume.pdf'
import egghead from './egghead.png'

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
    timer: true
  }

  composeClasses(name) {
    return `${css.bubble} ${
      this.state.bubbles[name] === 'hidden' ? css.hide : css[`bubble--${name}`]
    }`
  }

  composeFontSize(name) {
    return `${this.state.bubbles[name] ? css['bubble--p'] : ''}`
  }

  composeTransition() {
    return {
      transition: `width 0.6s, height 0.6s, transform ${
        this.state.timer ? '1s' : ' 0.1s'
      }`
    }
  }

  componentDidMount() {
    Particles.init({
      selector: '.background',
      connectParticles: true,
      color: '#ffffff',
      sizeVariations: 5,
      maxParticles: 80
    })

    const self = this
    function* myGen() {
      yield* Object.keys(self.state.bubbles)
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
    setTimeout(() => {
      this.setState({
        timer: false
      })
    }, 2000)
    setInterval(showInterval, 200)
  }

  render() {
    return (
      <Section>
        <canvas className="background" />
        <div
          className={css.contentContainer}
          ref={el => (this.containerRef = el)}>
          <div className={css.profile}>
            <FollowMouse sensitivity={0.009} defaults={{ x: -9.41, y: -3.38 }}>
              <h1>Tyler Clark</h1>
            </FollowMouse>
            <FollowMouse sensitivity={0.007} defaults={{ x: -7.34, y: -2.9 }}>
              <h3>Fullstack Developer</h3>
            </FollowMouse>
          </div>
          <div className={css.bubblesContainer}>
            <FollowMouse
              transX={0}
              transY={this.state.bubbles.experiance === 'hidden' ? 0 : -10}
              inline={this.composeTransition()}
              sensitivity={0.009}>
              <div className={this.composeClasses('experiance')}>
                <p
                  style={{ fontSize: '0px' }}
                  className={this.composeFontSize('experiance')}>
                  Experiance
                </p>
              </div>
            </FollowMouse>
            <FollowMouse
              transX={this.state.bubbles.youtube === 'hidden' ? 0 : -115}
              transY={this.state.bubbles.youtube === 'hidden' ? 0 : 60}
              inline={this.composeTransition()}
              sensitivity={0.008}>
              <a
                href="https://www.youtube.com/playlist?list=PLAdIRk90T3WiSheqcofJYxMM9uJvfDVQ5"
                target="_blank"
                className={this.composeClasses('youtube')}>
                <span style={{ fontSize: '0px' }}>Talks</span>
              </a>
            </FollowMouse>
            <FollowMouse
              transX={this.state.bubbles.talks === 'hidden' ? 0 : -120}
              transY={this.state.bubbles.talks === 'hidden' ? 0 : -35}
              inline={this.composeTransition()}
              sensitivity={0.006}>
              <a
                href="https://egghead.io/instructors/tyler-clark"
                className={this.composeClasses('talks')}
                target="_blank">
                <p
                  style={{ fontSize: '0px' }}
                  className={this.composeFontSize('talks')}>
                  <span style={{ fontSize: '0px' }}>Courses</span>
                </p>
              </a>
            </FollowMouse>
            <FollowMouse
              transX={this.state.bubbles.linkedIn === 'hidden' ? 0 : -50}
              transY={this.state.bubbles.linkedIn === 'hidden' ? 0 : 120}
              inline={this.composeTransition()}
              sensitivity={0.01}>
              <a
                href="https://www.linkedin.com/in/tyler-clark-80003569/"
                target="_blank"
                className={this.composeClasses('linkedIn')}>
                <i style={{ fontSize: '0px' }} className="fab fa-linkedin-in" />
              </a>
            </FollowMouse>
            <FollowMouse
              transX={this.state.bubbles.resume === 'hidden' ? 0 : 70}
              transY={this.state.bubbles.resume === 'hidden' ? 0 : 110}
              inline={this.composeTransition()}
              sensitivity={0.009}>
              <a
                className={this.composeClasses('resume')}
                href={Resume}
                target="_blank">
                <p
                  style={{ fontSize: '0px' }}
                  className={this.composeFontSize('resume')}>
                  Resume
                </p>
              </a>
            </FollowMouse>
            <FollowMouse
              transX={this.state.bubbles.twitter === 'hidden' ? 0 : 110}
              transY={this.state.bubbles.twitter === 'hidden' ? 0 : 13}
              inline={this.composeTransition()}
              sensitivity={0.011}>
              <a
                href="https://twitter.com/iamtylerwclark"
                target="_blank"
                className={this.composeClasses('twitter')}>
                <i style={{ fontSize: '0px' }} className="fab fa-twitter" />
              </a>
            </FollowMouse>
          </div>
        </div>
      </Section>
    )
  }
}
