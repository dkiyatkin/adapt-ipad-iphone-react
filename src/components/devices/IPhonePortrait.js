import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import Screen from 'components/Screen'

import deviceImg from 'images/iphone5-vertical.png'
import styles from './IPhonePortrait.module.scss'

const deviceImgWidth = 764
const deviceImgHeight = 1602
const marginValue = 30
const paddingTop = 80
const paddingRight = 20
const paddingBottom = 78
const paddingLeft = 22
const device = 'IPhone'
const orientation = 'portrait'

export default function IPhonePortrait (props) {
  const { width } = props
  const deviceWidth = width - (marginValue * 2)
  const deviceHeight = deviceImgHeight / (deviceImgWidth / deviceWidth)

  return (
    <div
      className={cn(styles.iPhonePortrait, props.className)}
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
IPhonePortrait.propTypes = {
  className: PropTypes.string,
  width: PropTypes.number,
}
