import React from 'react'
import ReactDOM from 'react-dom'
import { renderToString } from 'react-dom/server'

import Root from 'components/Root'

import 'styles/index.scss'

window.APP = {}
const rootElement = document.getElementById('root')
if (rootElement) {
  ReactDOM.render(
    <Root />,
    rootElement
  )
} else { // jsdom
  window.APP.server = {
    React,
    renderToString,
    Root,
  }
}
