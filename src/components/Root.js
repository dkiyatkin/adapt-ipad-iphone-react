import React from 'react'
import PropTypes from 'prop-types'
import { useMediaQuery } from 'react-responsive'
import compact from 'lodash.compact'
import IPadLandscape from 'components/devices/IPadLandscape'
import IPadPortrait from 'components/devices/IPadPortrait'
import IPhoneLandscape from 'components/devices/IPhoneLandscape'
import IPhonePortrait from 'components/devices/IPhonePortrait'

import styles from './Root.module.scss'

const IPadLandscapeWidth = 1024
const IPadPortraitWidth = 768
const IPhoneLandscapeWidth = 568
const IPhonePortraitWidth = 320

export default function Device (props) {
  const { screenWidth } = props
  const deviceProps = screenWidth ? { width: screenWidth } : undefined
  const isIPadLandscape = useMediaQuery({ query: `(min-width: ${IPadLandscapeWidth + 1}px)` }, deviceProps)
  const isIPadPortrait = useMediaQuery({ query: `(min-width: ${IPadPortraitWidth + 1}px) and (max-width: ${IPadLandscapeWidth}px)` }, deviceProps)
  const isIPhoneLandscape = useMediaQuery({ query: `(min-width: ${IPhoneLandscapeWidth + 1}px) and (max-width: ${IPadPortraitWidth}px)` }, deviceProps)
  const isIPhonePortrait = useMediaQuery({ query: `(max-width: ${IPhoneLandscapeWidth}px)` }, deviceProps)
  if (compact([isIPadLandscape, isIPadPortrait, isIPhoneLandscape, isIPhonePortrait]).length !== 1) return null
  if (isIPadLandscape) return <IPadLandscape className={styles.device} width={IPadLandscapeWidth} />
  if (isIPadPortrait) return <IPadPortrait className={styles.device} width={IPadPortraitWidth} />
  if (isIPhoneLandscape) return <IPhoneLandscape className={styles.device} width={IPhoneLandscapeWidth} />
  if (isIPhonePortrait) return <IPhonePortrait className={styles.device} width={IPhonePortraitWidth} />
}
Device.propTypes = {
  screenWidth: PropTypes.number,
}
