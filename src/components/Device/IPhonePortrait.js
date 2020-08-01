import React, { useEffect, useContext } from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import RootContext from 'components/RootContext'
import Screen from 'components/Screen'

import bgImage from 'images/iphone5-vertical.png'
import styles from './IPhonePortrait.module.scss'

const deviceImgWidth = 764
const deviceImgHeight = 1602
const marginValue = 30
const paddingTop = 80
const paddingRight = 20
const paddingBottom = 78
const paddingLeft = 22

export default function IPhonePortrait (props) {
  const { width } = props
  const deviceWidth = width - (marginValue * 2)
  const deviceHeight = deviceImgHeight / (deviceImgWidth / deviceWidth)
  const screenWidth = deviceWidth - (paddingRight + paddingLeft)
  const screenHeight = deviceHeight - (paddingTop + paddingBottom)
  const rootContext = useContext(RootContext)
  useEffect(() => {
    rootContext.setDevice('IPhone')
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
      className={cn(styles.iPhonePortrait, props.className)}
      style={{
        backgroundImage: `url(${bgImage})`,
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
IPhonePortrait.propTypes = {
  className: PropTypes.string,
  width: PropTypes.number,
}
