import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import compact from 'lodash.compact'
import isEqual from 'lodash.isequal'
import uniq from 'lodash.uniq'
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
    desktopGridItems = this.setEmptyDesktops(desktopGridItems, selDesktopIndex)
    localStorage.setItem(`${this.context.device}_${this.context.orientation}_desktopGridItems`, JSON.stringify(desktopGridItems))
    this.setState({
      desktopGridItems
    })
  }

  getDesktopGridItems = () => {
    const { colMax, rowMax } = this.context.workspace
    const deviceDesktopGridItems = JSON.parse(localStorage.getItem(`${this.context.device}_${this.context.orientation}_desktopGridItems`)) || []
    const configDesktopGridItems = uniq(config.desktopGridIcons)
    if (isEqual(compact(deviceDesktopGridItems).sort(), compact(configDesktopGridItems).sort())) return deviceDesktopGridItems
    const desktopItemsCount = colMax * rowMax
    const emptyCellsNum = desktopItemsCount - (configDesktopGridItems.length % desktopItemsCount)
    return this.setEmptyDesktops([...configDesktopGridItems, ...Array(emptyCellsNum)])
  }

  setDockBarItems = (dockBarItems) => {
    localStorage.setItem(`${this.context.device}_${this.context.orientation}_dockBarItems`, JSON.stringify(dockBarItems))
    this.setState({
      dockBarItems
    })
  }

  getDockBarItems = () => {
    const { colMax } = this.context.workspace
    const deviceDockBarItems = JSON.parse(localStorage.getItem(`${this.context.device}_${this.context.orientation}_dockBarItems`)) || []
    const configDockBarItems = uniq(config.dockBarIcons).slice(0, colMax)
    if (isEqual(compact(deviceDockBarItems).sort(), compact(configDockBarItems).sort())) return deviceDockBarItems
    return configDockBarItems
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
