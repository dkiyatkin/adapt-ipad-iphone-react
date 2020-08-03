import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'

import styles from './PageIndicator.module.scss'

export default class PageIndicator extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    curDesktopIndex: PropTypes.number,
    desktopsCount: PropTypes.number,
    setDesktop: PropTypes.func,
  }

  handleClick = (desktopIndex) => {
    const { setDesktop } = this.props
    setDesktop(desktopIndex)
  }

  render () {
    const { curDesktopIndex, desktopsCount } = this.props

    return (
      <div className={cn(styles.pageIndicator, this.props.className)}>
        {
          [...Array(desktopsCount)].map((desktopItem, desktopIndex) => {
            return (
              <button
                key={desktopIndex}
                className={cn(styles.btn, { [styles.btnSel]: curDesktopIndex === desktopIndex })}
                onClick={this.handleClick.bind(this, desktopIndex)}
              >
                <span className={styles.bull} />
              </button>
            )
          })
        }
      </div>
    )
  }
}
