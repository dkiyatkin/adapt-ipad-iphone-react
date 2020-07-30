import React from 'react'
// import PropTypes from 'prop-types'
import { RootContextProvider } from 'components/RootContext'
import Device from './Device'

export default function Root (props) {
  return (
    <RootContextProvider>
      <Device />
    </RootContextProvider>
  )
}
