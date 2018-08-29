import React from 'react'
import FollowMouse from './components/FollowMouse'
import css from './index.module.css'
import 'regenerator-runtime/runtime'
import tyler from './tyler-BW.png'
import Section from './components/Section'
import Background from './components/Background'

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
        <div className={css.imgContainer} />
        <Background />
        <FollowMouse
          sensitivity={0.009}
          defaults={{ x: -2.62, y: -4.91 }}
          inline={
            !this.state.timer
              ? { filter: `blur(0px)` }
              : { filter: `blur(5px)` }
          }>
          <img className={css.profileImg} src={tyler} />
        </FollowMouse>
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
              transX={this.state.bubbles.youtube === 'hidden' ? 0 : -85}
              transY={this.state.bubbles.youtube === 'hidden' ? 0 : 60}
              inline={this.composeTransition()}
              sensitivity={0.008}>
              <div className={this.composeClasses('youtube')}>
                <i style={{ fontSize: '0px' }} className="fab fa-youtube" />
              </div>
            </FollowMouse>
            <FollowMouse
              transX={this.state.bubbles.talks === 'hidden' ? 0 : -120}
              transY={this.state.bubbles.talks === 'hidden' ? 0 : -35}
              inline={this.composeTransition()}
              sensitivity={0.006}>
              <div className={this.composeClasses('talks')}>
                <p
                  style={{ fontSize: '0px' }}
                  className={this.composeFontSize('talks')}>
                  Talks
                </p>
              </div>
            </FollowMouse>
            <FollowMouse
              transX={this.state.bubbles.linkedIn === 'hidden' ? 0 : -50}
              transY={this.state.bubbles.linkedIn === 'hidden' ? 0 : 120}
              inline={this.composeTransition()}
              sensitivity={0.01}>
              <div className={this.composeClasses('linkedIn')}>
                <i style={{ fontSize: '0px' }} className="fab fa-linkedin-in" />
              </div>
            </FollowMouse>
            <FollowMouse
              transX={this.state.bubbles.resume === 'hidden' ? 0 : 70}
              transY={this.state.bubbles.resume === 'hidden' ? 0 : 110}
              inline={this.composeTransition()}
              sensitivity={0.009}>
              <div className={this.composeClasses('resume')}>
                <p
                  style={{ fontSize: '0px' }}
                  className={this.composeFontSize('resume')}>
                  Resume
                </p>
              </div>
            </FollowMouse>
            <FollowMouse
              transX={this.state.bubbles.twitter === 'hidden' ? 0 : 100}
              transY={this.state.bubbles.twitter === 'hidden' ? 0 : 0}
              inline={this.composeTransition()}
              sensitivity={0.011}>
              <div className={this.composeClasses('twitter')}>
                <i style={{ fontSize: '0px' }} className="fab fa-twitter" />
              </div>
            </FollowMouse>
          </div>
        </div>
      </Section>
    )
  }
}
