import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import Workspace from 'components/Workspace'

import bgImg from 'images/background.jpg'
import styles from './Screen.module.scss'

export default function Screen (props) {
  const { device, orientation } = props

  return (
    <div
      className={cn(styles.screen, props.className)}
      style={{
        backgroundImage: `url(${bgImg})`,
      }}
    >
      <Workspace
        className={styles.workspace}
        device={device}
        orientation={orientation}
      />
    </div>
  )
}
Screen.propTypes = {
  className: PropTypes.string,
  device: PropTypes.string,
  orientation: PropTypes.string,
}
