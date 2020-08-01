import React, { useEffect, useContext } from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import RootContext from 'components/RootContext'
import Screen from 'components/Screen'

import deviceImg from 'images/ipad-mini-horizontal.png'
import styles from './IPadLandscape.module.scss'

const deviceImgWidth = 1258
const deviceImgHeight = 969
const marginValue = 30
const paddingTop = 77
const paddingRight = 94
const paddingBottom = 75
const paddingLeft = 84

export default function IPadLandscape (props) {
  const { width } = props
  const deviceWidth = width - (marginValue * 2)
  const deviceHeight = deviceImgHeight / (deviceImgWidth / deviceWidth)
  const screenWidth = deviceWidth - (paddingRight + paddingLeft)
  const screenHeight = deviceHeight - (paddingTop + paddingBottom)
  const rootContext = useContext(RootContext)
  useEffect(() => {
    rootContext.setDevice('IPad')
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
      className={cn(styles.iPadLandscape, props.className)}
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
IPadLandscape.propTypes = {
  className: PropTypes.string,
  width: PropTypes.number,
}
