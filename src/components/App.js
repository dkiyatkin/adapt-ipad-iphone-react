import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'

import logo from 'images/logo.svg'

import styles from './App.module.scss'

export default function App (props) {
  return (
    <div className={cn(styles.app, props.className)}>
      <header className={styles.header}>
        <img src={logo} className={styles.logo} alt='logo' />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className={styles.link}
          href='https://reactjs.org'
          target='_blank'
          rel='noopener noreferrer'
        >
          Learn React
        </a>
      </header>
    </div>
  )
}
App.propTypes = {
  className: PropTypes.string,
}
