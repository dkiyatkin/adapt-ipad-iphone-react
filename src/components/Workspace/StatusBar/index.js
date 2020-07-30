import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import Clock from './Clock'

import styles from './index.module.scss'

export default function StatusBar (props) {
  return (
    <div className={cn(styles.statusBar, props.className)}>
      <Clock />
    </div>
  )
}
StatusBar.propTypes = {
  className: PropTypes.string,
}
