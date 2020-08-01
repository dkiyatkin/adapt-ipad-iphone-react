import React, { useEffect, useContext } from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import RootContext from 'components/RootContext'
import Screen from 'components/Screen'

import deviceImg from 'images/iphone5-horizontal.png'
import styles from './IPhoneLandscape.module.scss'

const deviceImgWidth = 1602
const deviceImgHeight = 764
const marginValue = 30
const paddingTop = 20
const paddingRight = 72
const paddingBottom = 18
const paddingLeft = 74

export default function IPhoneLandscape (props) {
  const { width } = props
  const deviceWidth = width - (marginValue * 2)
  const deviceHeight = deviceImgHeight / (deviceImgWidth / deviceWidth)
  const screenWidth = deviceWidth - (paddingRight + paddingLeft)
  const screenHeight = deviceHeight - (paddingTop + paddingBottom)
  const rootContext = useContext(RootContext)
  useEffect(() => {
    rootContext.setDevice('IPhone')
    rootContext.setOrientation('landscape')
    rootContext.setWorkspace({
      ...rootContext.workspace,
      screenWidth,
      screenHeight,
      colMax: 5,
      rowMax: 4,
    })
  }, []) // eslint-disable-line

  return (
    <div
      className={cn(styles.iPhoneLandscape, props.className)}
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
      {rootContext.device && <Screen />}
    </div>
  )
}
IPhoneLandscape.propTypes = {
  className: PropTypes.string,
  width: PropTypes.number,
}
