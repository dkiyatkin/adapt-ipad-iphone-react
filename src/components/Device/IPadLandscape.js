import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import Screen from 'components/Screen'

import deviceImg from 'images/ipad-mini-horizontal.png'
import styles from './IPadLandscape.module.scss'

const deviceImgWidth = 1258
const deviceImgHeight = 969
const marginValue = 30

export default function IPadLandscape (props) {
  const { width } = props
  const deviceWidth = width - (marginValue * 2)
  const deviceHeight = deviceImgHeight / (deviceImgWidth / deviceWidth)
  return (
    <div
      className={cn(styles.iPadLandscape, props.className)}
      style={{
        backgroundImage: `url(${deviceImg})`,
        width: deviceWidth,
        height: deviceHeight,
        margin: marginValue,
        padding: '77px 94px 75px 84px',
      }}
    >
      <Screen />
    </div>
  )
}
IPadLandscape.propTypes = {
  className: PropTypes.string,
  width: PropTypes.number,
}
