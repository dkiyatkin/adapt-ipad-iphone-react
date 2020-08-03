import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import Screen from 'components/Screen'

import deviceImg from 'images/ipad-mini-vertical.png'
import styles from './IPadPortrait.module.scss'

const deviceImgWidth = 969
const deviceImgHeight = 1258
const marginValue = 30
const paddingTop = 80
const paddingRight = 72
const paddingBottom = 91
const paddingLeft = 73
const device = 'IPad'
const orientation = 'portrait'

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
        paddingTop,
        paddingRight,
        paddingBottom,
        paddingLeft,
      }}
    >
      <Screen
        device={device}
        orientation={orientation}
      />
    </div>
  )
}
IPadPortrait.propTypes = {
  className: PropTypes.string,
  width: PropTypes.number,
}
