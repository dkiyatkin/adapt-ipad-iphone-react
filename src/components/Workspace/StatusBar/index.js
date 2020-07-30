import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'

import styles from './index.module.scss'

export default function StatusBar (props) {
  return (
    <div className={cn(styles.statusBar, props.className)}>
      time
    </div>
  )
}
StatusBar.propTypes = {
  className: PropTypes.string,
}
