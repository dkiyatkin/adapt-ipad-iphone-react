import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import Screen from 'components/Screen'

import deviceImg from 'images/ipad-mini-vertical.png'
import styles from './IPadPortrait.module.scss'

const deviceImgWidth = 969
const deviceImgHeight = 1258
const marginValue = 30

export default function IPadPortrait (props) {
  const { width } = props
  const deviceWidth = width - (marginValue * 2)
  const deviceHeight = deviceImgHeight / (deviceImgWidth / deviceWidth)
  return (
    <div
      className={cn(styles.iPadPortrait, props.className)}
      style={{
        backgroundImage: `url(${deviceImg})`,
        width: deviceWidth,
        height: deviceHeight,
        margin: marginValue,
        padding: '80px 72px 91px 73px',
      }}
    >
      <Screen />
    </div>
  )
}
IPadPortrait.propTypes = {
  className: PropTypes.string,
  width: PropTypes.number,
}
