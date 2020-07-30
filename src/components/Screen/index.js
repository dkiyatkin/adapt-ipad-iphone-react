import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import Workspace from 'components/Workspace'

import bgImg from 'images/background.jpg'
import styles from './index.module.scss'

export default function Screen (props) {
  return (
    <div
      className={cn(styles.screen, props.className)}
      style={{
        backgroundImage: `url(${bgImg})`,
      }}
    >
      <Workspace className={styles.workspace} />
    </div>
  )
}
Screen.propTypes = {
  className: PropTypes.string,
}
