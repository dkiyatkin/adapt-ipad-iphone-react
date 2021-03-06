import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import getItemValues from 'helpers/getItemValues'

import styles from './runApp.module.scss'

export default class RunApp extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    item: PropTypes.string,
    onStopApp: PropTypes.func,
  }

  render () {
    const { item, onStopApp } = this.props
    const { itemTitle, iconImg } = getItemValues(item)
    const otherProps = { onClick: onStopApp }

    return (
      <div className={cn(styles.runApp, this.props.className)} {...otherProps}>
        <div className={styles.titleWrap}>
          {itemTitle}
        </div>
        <div className={styles.imgWrap}>
          <img src={iconImg} alt={item} />
        </div>
      </div>
    )
  }
}
