import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import Screen from 'components/Screen'

import bgImage from 'images/iphone5-vertical.png'
import styles from './IPhonePortrait.module.scss'

const deviceImgWidth = 764
const deviceImgHeight = 1602
const marginValue = 30

export default function IPhonePortrait (props) {
  const { width } = props
  const deviceWidth = width - (marginValue * 2)
  const deviceHeight = deviceImgHeight / (deviceImgWidth / deviceWidth)
  return (
    <div
      className={cn(styles.iPhonePortrait, props.className)}
      style={{
        backgroundImage: `url(${bgImage})`,
        width: deviceWidth,
        height: deviceHeight,
        margin: marginValue,
        padding: '80px 20px 78px 22px',
      }}
    >
      <Screen />
    </div>
  )
}
IPhonePortrait.propTypes = {
  className: PropTypes.string,
  width: PropTypes.number,
}
