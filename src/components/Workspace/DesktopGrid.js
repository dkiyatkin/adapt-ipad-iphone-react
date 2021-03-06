import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import DraggableItem from 'components/Workspace/DraggableItem'
import debounce from 'lodash.debounce'

import styles from './DesktopGrid.module.scss'

export default class DesktopGrid extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    desktopGridRef: PropTypes.object,
    desktopsCount: PropTypes.number,
    desktopItemsCount: PropTypes.number,
    items: PropTypes.array,
    colMax: PropTypes.number,
    rowMax: PropTypes.number,
    setDesktop: PropTypes.func,
    setDesktopGridItems: PropTypes.func,
    onStartApp: PropTypes.func,
  }

  constructor (props) {
    super(props)
    this.state = {
      isDrag: false,
      width: 0,
      height: 0,
    }
  }

  componentDidMount () {
    const { desktopGridRef } = this.props
    const desktopGridElement = desktopGridRef.current
    if (!desktopGridElement) return
    const width = desktopGridElement.clientWidth
    const height = desktopGridElement.clientHeight
    this.setState({ width, height })
  }

  getItemIndex = (desktopIndex, col, row) => {
    const { desktopItemsCount, colMax } = this.props
    return (col - 1) + ((row - 1) * colMax) + (desktopIndex * desktopItemsCount)
  }

  setPositions = (itemIndex, selCellIndex, selDesktopIndex) => {
    const { setDesktopGridItems } = this.props
    const items = [...this.props.items]
    items[itemIndex] = items.splice(selCellIndex, 1, items[itemIndex])[0]
    setDesktopGridItems(items, selDesktopIndex)
  }

  getColByItemIndex = (itemIndex) => {
    const { colMax } = this.props
    return ((itemIndex + 1) % colMax) || colMax
  }

  getAbsCol = (desktopIndex, data, col) => {
    const { colMax } = this.props
    const { width } = this.state
    const stepX = width / colMax
    const selRelCol = Math.round((data.x + (col * stepX)) / stepX)
    return (desktopIndex * colMax) + selRelCol
  }

  getDesktopIndexByAbsCol = (absCol) => {
    const { colMax } = this.props
    return Math.ceil(absCol / colMax) - 1
  }

  handleStart = (desktopIndex, itemIndex, event, data) => {
    this.setState({ isDrag: true })
  }

  handleDrag = (desktopIndex, itemIndex, event, data) => {
    const { desktopsCount, setDesktop } = this.props
    const { isDrag } = this.state
    if (!isDrag) return
    const col = this.getColByItemIndex(itemIndex)
    const selAbsCol = this.getAbsCol(desktopIndex, data, col)
    const selDesktopIndex = this.getDesktopIndexByAbsCol(selAbsCol)
    if ((selDesktopIndex >= desktopsCount) || (selDesktopIndex < 0)) return
    setDesktop(selDesktopIndex)
  }

  handleStop = (desktopIndex, itemIndex, event, data) => {
    const { desktopsCount, desktopItemsCount, colMax, rowMax } = this.props
    const { height } = this.state
    this.setState({ isDrag: false })
    const col = this.getColByItemIndex(itemIndex)
    const selAbsCol = this.getAbsCol(desktopIndex, data, col)
    const selDesktopIndex = this.getDesktopIndexByAbsCol(selAbsCol)
    if ((selDesktopIndex >= desktopsCount) || (selDesktopIndex < 0)) return
    const absRow = Math.ceil(((itemIndex + 1) % desktopItemsCount) / colMax) || rowMax
    const stepY = height / rowMax
    const selAbsRow = Math.round((data.y + (absRow * stepY)) / stepY)
    if ((selAbsRow > rowMax) || (selAbsRow < 1)) return
    const selCol = selAbsCol - (selDesktopIndex * colMax)
    if ((desktopIndex === selDesktopIndex) && (col === selCol) && (absRow === selAbsRow)) return
    this.setPositions(itemIndex, this.getItemIndex(selDesktopIndex, selCol, selAbsRow), selDesktopIndex)
  }

  render () {
    const { desktopGridRef, desktopsCount, desktopItemsCount, items, colMax, rowMax, onStartApp } = this.props
    const { width, height } = this.state
    const cellStyle = {
      width: (100 / colMax) + '%',
      height: (100 / rowMax) + '%',
    }

    return (
      <div
        className={cn(styles.desktopGrid, { [styles.desktopGridVisible]: (width && height) }, this.props.className)}
        ref={desktopGridRef}
      >
        {
          [...Array(desktopsCount)].map((desktopItem, desktopIndex) => {
            const startCount = desktopItemsCount * desktopIndex
            const desktopsItems = items.slice(startCount, startCount + desktopItemsCount)

            return (
              <div key={desktopIndex} className={styles.oneDesktop}>
                {
                  desktopsItems.map((item, i) => {
                    const itemIndex = startCount + i
                    if (!item) return <div key={itemIndex} className={styles.cell} style={cellStyle} />

                    return (
                      <div key={item} className={styles.cell} style={cellStyle}>
                        <DraggableItem
                          item={item}
                          onStart={this.handleStart}
                          onDrag={debounce(this.handleDrag.bind(this, desktopIndex, itemIndex), 50)}
                          onStop={this.handleStop.bind(this, desktopIndex, itemIndex)}
                          onClick={() => onStartApp(item)}
                        />
                      </div>
                    )
                  })
                }
              </div>
            )
          })
        }
      </div>
    )
  }
}
