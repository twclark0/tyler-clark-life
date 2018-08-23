import React from 'react'
import css from './index.module.css'
import 'regenerator-runtime/runtime'

export default class Home extends React.Component {
  state = {
    experiance: 'hidden',
    twitter: 'hidden',
    linkedIn: 'hidden',
    resume: 'hidden',
    talks: 'hidden',
    youtube: 'hidden'
  }

  composeClasses(name) {
    return `${css.bubble} ${
      this.state[name] === 'hidden' ? css.hide : css[`bubble--${name}`]
    }`
  }

  composeFontSize(name) {
    return `${this.state[name] ? css['bubble--p'] : ''}`
  }

  componentDidMount() {
    Particles.init({
      selector: '.background',
      connectParticles: false
    })

    const self = this
    function* myGen() {
      yield* [...Object.keys(self.state)]
      yield false
    }

    const gen = myGen()

    const showInterval = () => {
      const { value } = gen.next()
      if (value) {
        this.setState({
          [value]: 'show'
        })
      } else {
        clearInterval(showInterval)
      }
    }
    setInterval(showInterval, 200)
  }
  render() {
    return (
      <section className={css.container}>
        <div className={css.contentContainer}>
          <div className={css.profile}>
            <h1>Tyler Clark</h1>
            <h3>Fullstack Developer</h3>
          </div>
          <div className={css.bubblesContainer}>
            <div className={this.composeClasses('experiance')}>
              <p style={{fontSize: '0px'}} className={this.composeFontSize('experiance')}>experiance</p>
            </div>
            <div className={this.composeClasses('youtube')}>
              <i style={{ fontSize: '0px' }} className='fab fa-youtube' />
            </div>
            <div className={this.composeClasses('talks')}>
              <p style={{fontSize: '0px'}} className={this.composeFontSize('talks')}>talks</p>
            </div>
            <div className={this.composeClasses('linkedIn')}>
              <i style={{ fontSize: '0px' }} className="fab fa-linkedin-in" />
            </div>
            <div className={this.composeClasses('resume')}>
              <p style={{fontSize: '0px'}} className={this.composeFontSize('resume')}>resume</p>
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
