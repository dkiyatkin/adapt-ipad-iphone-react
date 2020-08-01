import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import RootContext from 'components/RootContext'
import StatusBar from 'components/Workspace/StatusBar'
import DesktopGrid from 'components/Workspace/DesktopGrid'
import PageIndicator from 'components/Workspace/PageIndicator'
import DockBar from 'components/Workspace/DockBar'

import config from 'config.json'
import styles from './index.module.scss'

export default class Workspace extends React.Component {
  static propTypes = {
    className: PropTypes.string,
  }

  static contextType = RootContext

  constructor (props, context) {
    super(props, context)
    this.desktopGridRef = React.createRef()
    this.state = {
      desktopGridItems: this.getDesktopGridItems(),
      dockBarItems: this.getDockBarItems(),
      curDesktopIndex: 0,
    }
  }

  componentDidMount () {
    this.previousContext = this.context
  }

  componentDidUpdate (prevProps) {
    if (this.previousContext.orientation !== this.context.orientation) {
      this.setDesktopGridItems(this.getDesktopGridItems())
      this.setDockBarItems(this.getDockBarItems())
    }
    this.previousContext = this.context
  }

  setDesktopGridItems = (desktopGridItems) => {
    // TODO localStorage
    this.setState({
      desktopGridItems
    })
  }

  setDockBarItems = (dockBarItems) => {
    // TODO localStorage
    this.setState({
      dockBarItems
    })
  }

  getDesktopGridItems = () => {
    // TODO localStorage
    const { colMax, rowMax } = this.context.workspace
    const desktopItemsCount = colMax * rowMax
    const emptyCellsNum = desktopItemsCount - (config.desktopGridIcons.length % desktopItemsCount)
    return [...config.desktopGridIcons, ...Array(emptyCellsNum)]
  }

  getDockBarItems = () => {
    // TODO localStorage
    const colMax = this.context.workspace.colMax
    return [...config.dockBarIcons].slice(0, colMax)
  }

  setDesktop = (desktopIndex) => {
    const desktopGridElement = this.desktopGridRef.current
    if (!desktopGridElement) return
    const width = desktopGridElement.clientWidth
    const colMax = this.context.workspace.colMax
    const stepX = width / colMax
    desktopGridElement.scrollTo({
      top: 0,
      left: (colMax * stepX) * desktopIndex,
      behavior: 'smooth'
    })
    this.setState({ curDesktopIndex: desktopIndex })
  }

  render () {
    const { colMax, rowMax } = this.context.workspace
    const { desktopGridItems, curDesktopIndex, dockBarItems } = this.state
    const desktopItemsCount = colMax * rowMax
    const desktopsCount = desktopGridItems.length / desktopItemsCount

    return (
      <div className={cn(styles.workspace, this.props.className)}>
        <StatusBar className={styles.statusBar} />
        <DesktopGrid
          className={styles.desktopGrid}
          desktopGridRef={this.desktopGridRef}
          desktopsCount={desktopsCount}
          desktopItemsCount={desktopItemsCount}
          items={desktopGridItems}
          colMax={colMax}
          rowMax={rowMax}
          setDesktop={this.setDesktop}
          setDesktopGridItems={this.setDesktopGridItems}
        />
        <PageIndicator
          className={styles.pageIndicator}
          curDesktopIndex={curDesktopIndex}
          desktopsCount={desktopsCount}
          setDesktop={this.setDesktop}
        />
        <DockBar
          className={styles.dockBar}
          items={dockBarItems}
          setDockBarItems={this.setDockBarItems}
        />
      </div>
    )
  }
}
