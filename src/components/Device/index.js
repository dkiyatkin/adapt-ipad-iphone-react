import React from 'react'
import { useMediaQuery } from 'react-responsive'
import IPadLandscape from './IPadLandscape'
import IPadPortrait from './IPadPortrait'
import IPhoneLandscape from './IPhoneLandscape'
import IPhonePortrait from './IPhonePortrait'

import styles from './index.module.scss'

const IPadLandscapeWidth = 1024
const IPadPortraitWidth = 768
const IPhoneLandscapeWidth = 568
const IPhonePortraitWidth = 320

export default function Device (props) {
  const isIPadLandscape = useMediaQuery({ query: `(min-width: ${IPadLandscapeWidth + 1}px)` })
  const isIPadPortrait = useMediaQuery({ query: `(min-width: ${IPadPortraitWidth + 1}px) and (max-width: ${IPadLandscapeWidth}px)` })
  const isIPhoneLandscape = useMediaQuery({ query: `(min-width: ${IPhoneLandscapeWidth + 1}px) and (max-width: ${IPadPortraitWidth}px)` })
  const isIPhonePortrait = useMediaQuery({ query: `(max-width: ${IPhoneLandscapeWidth}px)` })
  if (isIPadLandscape) return <IPadLandscape className={styles.device} width={IPadLandscapeWidth} />
  if (isIPadPortrait) return <IPadPortrait className={styles.device} width={IPadPortraitWidth} />
  if (isIPhoneLandscape) return <IPhoneLandscape className={styles.device} width={IPhoneLandscapeWidth} />
  if (isIPhonePortrait) return <IPhonePortrait className={styles.device} width={IPhonePortraitWidth} />
  return null
}
