import React from 'react'
import { useMediaQuery } from 'react-responsive'

export default function Example (props) {
  const isIPadH = useMediaQuery({ query: '(min-width: 1025px)' })
  const isIPadV = useMediaQuery({ query: '(min-width: 769px) and (max-width: 1024px)' })
  const isIPhoneH = useMediaQuery({ query: '(min-width: 569px) and (max-width: 768px)' })
  const isIPhoneV = useMediaQuery({ query: '(max-width: 568px)' })

  return (
    <div>
      <h1>Device Test!</h1>
      isIPadH: {JSON.stringify(isIPadH)}
      <br />
      isIPadV: {JSON.stringify(isIPadV)}
      <br />
      isIPhoneH: {JSON.stringify(isIPhoneH)}
      <br />
      isIPhoneV: {JSON.stringify(isIPhoneV)}
    </div>
  )
}
