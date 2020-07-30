import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'

import styles from './index.module.scss'

export default function DesktopGrid (props) {
  return (
    <div className={cn(styles.desktopGrid, props.className)}>
      icons
    </div>
  )
}
DesktopGrid.propTypes = {
  className: PropTypes.string,
}
