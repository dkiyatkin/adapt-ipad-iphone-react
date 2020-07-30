import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import StatusBar from 'components/Workspace/StatusBar'
import DesktopGrid from 'components/Workspace/DesktopGrid'
import PageIndicator from 'components/Workspace/PageIndicator'
import DockBar from 'components/Workspace/DockBar'

import styles from './index.module.scss'

export default function Workspace (props) {
  return (
    <div className={cn(styles.workspace, props.className)}>
      <StatusBar className={styles.statusBar} />
      <DesktopGrid className={styles.desktopGrid} />
      <PageIndicator className={styles.pageIndicator} />
      <DockBar className={styles.dockBar} />
    </div>
  )
}
Workspace.propTypes = {
  className: PropTypes.string,
}
