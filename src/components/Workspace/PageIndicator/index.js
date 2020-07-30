import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'

import styles from './index.module.scss'

export default function PageIndicator (props) {
  return (
    <div className={cn(styles.pageIndicator, props.className)}>
      dots
    </div>
  )
}
PageIndicator.propTypes = {
  className: PropTypes.string,
}
