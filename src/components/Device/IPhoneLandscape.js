import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import Screen from 'components/Screen'

import deviceImg from 'images/iphone5-horizontal.png'
import styles from './IPhoneLandscape.module.scss'

const deviceImgWidth = 1602
const deviceImgHeight = 764
const marginValue = 30

export default function IPhoneLandscape (props) {
  const { width } = props
  const deviceWidth = width - (marginValue * 2)
  const deviceHeight = deviceImgHeight / (deviceImgWidth / deviceWidth)
  return (
    <div
      className={cn(styles.iPhoneLandscape, props.className)}
      style={{
        backgroundImage: `url(${deviceImg})`,
        width: deviceWidth,
        height: deviceHeight,
        margin: marginValue,
        padding: '20px 72px 18px 74px',
      }}
    >
      <Screen />
    </div>
  )
}
IPhoneLandscape.propTypes = {
  className: PropTypes.string,
  width: PropTypes.number,
}
