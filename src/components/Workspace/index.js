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
      dockBarItems: this.getDockBarItems(),
      curDesktopIndex: 0,
    }
    this.state.desktopGridItems = this.getDesktopGridItems()
  }

  componentDidMount () {
    this.previousContext = this.context
    this.setDesktop(1, true)
  }

  componentDidUpdate (prevProps, prevState) {
    if (this.previousContext.orientation !== this.context.orientation) {
      this.setDesktopGridItems(this.getDesktopGridItems())
      this.setDockBarItems(this.getDockBarItems())
    }
    this.previousContext = this.context
  }

  trimLeftDesktops = (desktopGridItems, desktopOffset = 0) => {
    const { colMax, rowMax } = this.context.workspace
    const desktopItemsCount = colMax * rowMax
    if (!desktopGridItems.slice(0, desktopItemsCount).find(item => !!item)) {
      desktopOffset--
      return this.trimLeftDesktops(desktopGridItems.slice(desktopItemsCount), desktopOffset)
    }
    return [desktopOffset, desktopGridItems]
  }

  trimRightDesktops = (desktopGridItems) => {
    const { colMax, rowMax } = this.context.workspace
    const desktopItemsCount = colMax * rowMax
    if (!desktopGridItems.slice(-desktopItemsCount).find(item => !!item)) {
      return this.trimRightDesktops(desktopGridItems.slice(0, -desktopItemsCount))
    }
    return desktopGridItems
  }

  setEmptyDesktops = (desktopGridItems, selDesktopIndex = 1) => {
    const { colMax, rowMax } = this.context.workspace
    const desktopItemsCount = colMax * rowMax
    let [desktopOffset, _desktopGridItems] = this.trimLeftDesktops(desktopGridItems)
    desktopGridItems = this.trimRightDesktops(_desktopGridItems)
    if (desktopGridItems.slice(0, desktopItemsCount).find(item => !!item)) {
      desktopGridItems = [...Array(desktopItemsCount), ...desktopGridItems]
      desktopOffset++
    }
    if (desktopGridItems.slice(-desktopItemsCount).find(item => !!item)) {
      desktopGridItems = [...desktopGridItems, ...Array(desktopItemsCount)]
    }
    this.setDesktop(selDesktopIndex + desktopOffset, true)
    return desktopGridItems
  }

  setDesktop = (desktopIndex, isFast = false) => {
    const desktopGridElement = this.desktopGridRef.current
    if (!desktopGridElement) return
    const width = desktopGridElement.clientWidth
    const colMax = this.context.workspace.colMax
    const stepX = width / colMax
    desktopGridElement.scrollTo({
      top: 0,
      left: (colMax * stepX) * desktopIndex,
      behavior: isFast ? undefined : 'smooth',
    })
    this.setState({ curDesktopIndex: desktopIndex })
  }

  setDesktopGridItems = (desktopGridItems, selDesktopIndex) => {
    // TODO localStorage
    desktopGridItems = this.setEmptyDesktops(desktopGridItems, selDesktopIndex)
    this.setState({
      desktopGridItems
    })
  }

  getDesktopGridItems = () => {
    // TODO localStorage
    const { colMax, rowMax } = this.context.workspace
    const desktopItemsCount = colMax * rowMax
    const emptyCellsNum = desktopItemsCount - (config.desktopGridIcons.length % desktopItemsCount)
    return this.setEmptyDesktops([...config.desktopGridIcons, ...Array(emptyCellsNum)])
  }

  setDockBarItems = (dockBarItems) => {
    // TODO localStorage
    this.setState({
      dockBarItems
    })
  }

  getDockBarItems = () => {
    // TODO localStorage
    const colMax = this.context.workspace.colMax
    return [...config.dockBarIcons].slice(0, colMax)
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
