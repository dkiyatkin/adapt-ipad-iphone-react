import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import compact from 'lodash.compact'
import isEqual from 'lodash.isequal'
import uniq from 'lodash.uniq'
import StatusBar from 'components/Workspace/StatusBar'
import DesktopGrid from 'components/Workspace/DesktopGrid'
import PageIndicator from 'components/Workspace/PageIndicator'
import DockBar from 'components/Workspace/DockBar'
import RunApp from 'components/Workspace/RunApp'

import config from 'config.json'
import styles from './index.module.scss'

export default class Workspace extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    device: PropTypes.string,
    orientation: PropTypes.string,
  }

  constructor (props) {
    super(props)
    this.desktopGridRef = React.createRef()
    this.state = {
      curDesktopIndex: 0,
      runAppItem: null,
      ...this.getOrientationValues(),
    }
    this.state.dockBarItems = this.getDockBarItems()
    this.state.desktopGridItems = this.getDesktopGridItems()
  }

  componentDidMount () {
    this.setDesktop(1, true)
  }

  componentDidUpdate (prevProps) {
    const { orientation } = this.props
    if (prevProps.orientation !== orientation) {
      this.setDesktopGridItems(this.getDesktopGridItems())
      this.setDockBarItems(this.getDockBarItems())
      this.setState(this.getOrientationValues()) // eslint-disable-line react/no-did-update-set-state
    }
  }

  getOrientationValues = () => {
    const { orientation } = this.props
    let colMax = 5
    let rowMax = 4
    if (orientation === 'portrait') {
      colMax = 4
      rowMax = 5
    }
    const desktopItemsCount = colMax * rowMax
    return {
      colMax, rowMax, desktopItemsCount
    }
  }

  trimLeftDesktops = (desktopGridItems, desktopOffset = 0) => {
    const { desktopItemsCount } = this.state
    if (!desktopGridItems.slice(0, desktopItemsCount).find(item => !!item)) {
      desktopOffset--
      return this.trimLeftDesktops(desktopGridItems.slice(desktopItemsCount), desktopOffset)
    }
    return [desktopOffset, desktopGridItems]
  }

  trimRightDesktops = (desktopGridItems) => {
    const { desktopItemsCount } = this.state
    if (!desktopGridItems.slice(-desktopItemsCount).find(item => !!item)) {
      return this.trimRightDesktops(desktopGridItems.slice(0, -desktopItemsCount))
    }
    return desktopGridItems
  }

  setEmptyDesktops = (desktopGridItems, selDesktopIndex = 1) => {
    const { desktopItemsCount } = this.state
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
    const { colMax } = this.state
    const desktopGridElement = this.desktopGridRef.current
    if (!desktopGridElement) return
    const width = desktopGridElement.clientWidth
    const stepX = width / colMax
    desktopGridElement.scrollTo({
      top: 0,
      left: (colMax * stepX) * desktopIndex,
      behavior: isFast ? undefined : 'smooth',
    })
    this.setState({ curDesktopIndex: desktopIndex })
  }

  setDesktopGridItems = (desktopGridItems, selDesktopIndex) => {
    const { device, orientation } = this.props
    desktopGridItems = this.setEmptyDesktops(desktopGridItems, selDesktopIndex)
    localStorage.setItem(`${device}_${orientation}_desktopGridItems`, JSON.stringify(desktopGridItems))
    this.setState({
      desktopGridItems
    })
  }

  getDesktopGridItems = () => {
    const { device, orientation } = this.props
    const { desktopItemsCount } = this.state
    const deviceDesktopGridItems = JSON.parse(localStorage.getItem(`${device}_${orientation}_desktopGridItems`)) || []
    const configDesktopGridItems = uniq(config.desktopGridIcons)
    if (isEqual(compact(deviceDesktopGridItems).sort(), compact(configDesktopGridItems).sort())) return deviceDesktopGridItems
    const emptyCellsNum = desktopItemsCount - (configDesktopGridItems.length % desktopItemsCount)
    return this.setEmptyDesktops([...configDesktopGridItems, ...Array(emptyCellsNum)])
  }

  setDockBarItems = (dockBarItems) => {
    const { device, orientation } = this.props
    localStorage.setItem(`${device}_${orientation}_dockBarItems`, JSON.stringify(dockBarItems))
    this.setState({
      dockBarItems
    })
  }

  getDockBarItems = () => {
    const { device, orientation } = this.props
    const { colMax } = this.state
    const deviceDockBarItems = JSON.parse(localStorage.getItem(`${device}_${orientation}_dockBarItems`)) || []
    const configDockBarItems = uniq(config.dockBarIcons).slice(0, colMax)
    if (isEqual(compact(deviceDockBarItems).sort(), compact(configDockBarItems).sort())) return deviceDockBarItems
    return configDockBarItems
  }

  handleStartApp = (item) => {
    this.setState({
      runAppItem: item
    })
  }

  handleStopApp = () => {
    this.setState({
      runAppItem: null
    })
  }

  render () {
    const { curDesktopIndex, runAppItem, colMax, rowMax, desktopItemsCount, dockBarItems, desktopGridItems } = this.state
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
          onStartApp={this.handleStartApp}
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
          onStartApp={this.handleStartApp}
        />
        {
          runAppItem && (
            <RunApp
              item={runAppItem}
              onStopApp={this.handleStopApp}
            />
          )
        }
      </div>
    )
  }
}
