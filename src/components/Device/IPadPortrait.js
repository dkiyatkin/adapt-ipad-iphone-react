import React, { useEffect, useContext } from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import RootContext from 'components/RootContext'
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

export default function IPadPortrait (props) {
  const { width } = props
  const deviceWidth = width - (marginValue * 2)
  const deviceHeight = deviceImgHeight / (deviceImgWidth / deviceWidth)
  const screenWidth = deviceWidth - (paddingRight + paddingLeft)
  const screenHeight = deviceHeight - (paddingTop + paddingBottom)
  const rootContext = useContext(RootContext)
  useEffect(() => {
    rootContext.setDevice('IPad')
    rootContext.setOrientation('portrait')
    rootContext.setWorkspace({
      ...rootContext.workspace,
      screenWidth,
      screenHeight,
      colMax: 4,
      rowMax: 5,
    })
  }, []) // eslint-disable-line

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
      {rootContext.device && <Screen />}
    </div>
  )
}
IPadPortrait.propTypes = {
  className: PropTypes.string,
  width: PropTypes.number,
}
