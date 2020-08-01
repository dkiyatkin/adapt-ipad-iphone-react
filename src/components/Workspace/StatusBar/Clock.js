import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'

import styles from './Clock.module.scss'

export default class Clock extends React.Component {
  static propTypes = {
    className: PropTypes.string,
  }

  constructor (props) {
    super(props)
    this.runner = null
    this.state = {
      time: this.getCurrentTime()
    }
  }

  getCurrentTime () {
    return new Date().toLocaleTimeString('ru-RU')
  }

  componentDidMount () {
    this.runner = setInterval(() => {
      this.setState({ time: this.getCurrentTime() })
    }, 1000)
  }

  componentWillUnmount () {
    clearInterval(this.runner)
  }

  render () {
    const { time } = this.state

    return (
      <div className={cn(styles.clock, this.props.className)}>
        {time}
      </div>
    )
  }
}
