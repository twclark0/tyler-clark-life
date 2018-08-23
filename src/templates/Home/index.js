import React from 'react'
import css from './index.module.css'
import 'regenerator-runtime/runtime'

export default class Home extends React.Component {
  state = {
    twitter: 'hidden',
    linkedIn: 'hidden',
    resume: 'hidden',
    experiance: 'hidden',
    talks: 'hidden'
  }

  composeClasses(name) {
    return `${css[`bubble--${name}`]} ${css.bubble} ${
      this.state[name] === 'hidden' ? css.hide : ''
    }`
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
              <p className={css['bubble-p']}>experiance</p>
            </div>
            <div className={this.composeClasses('youTube')}>
              <i style={{ fontSize: '20px' }} className="fab fa-youtube" />
            </div>
            <div className={this.composeClasses('talks')}>
              <p className={css['bubble-p']}>talks</p>
            </div>
            <div className={this.composeClasses('linkedIn')}>
              <i style={{ fontSize: '20px' }} className="fab fa-linkedin-in" />
            </div>
            <div className={this.composeClasses('resume')}>
              <p className={css['bubble-p']}>resume</p>
            </div>
            <div className={this.composeClasses('twitter')}>
              <i style={{ fontSize: '20px' }} className="fab fa-twitter" />
            </div>
          </div>
        </div>
      </section>
    )
  }
}
