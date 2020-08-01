import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import DraggableItem from 'components/Workspace/DraggableItem'

import styles from './index.module.scss'

export default class DockBar extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    items: PropTypes.array,
    setDockBarItems: PropTypes.func,
  }

  constructor (props) {
    super(props)
    this.mainRef = React.createRef()
    this.state = {
      width: 0,
      height: 0,
    }
  }

  componentDidMount () {
    const mainElement = this.mainRef.current
    if (!mainElement) return
    const width = mainElement.clientWidth
    const height = mainElement.clientHeight
    this.setState({ width, height })
  }

  setPositions = (col, selCol) => {
    const { setDockBarItems } = this.props
    const items = [...this.props.items]
    items[col - 1] = items.splice(selCol - 1, 1, items[col - 1])[0]
    setDockBarItems(items)
  }

  handleStop = (itemIndex, event, data) => {
    const { items } = this.props
    const { width } = this.state
    const col = itemIndex + 1
    const colMax = items.length
    const stepX = width / colMax
    const parentX = data.x + (col * stepX)
    const selCol = Math.round(parentX / stepX)
    if (selCol === col || selCol > colMax || selCol < 1) return
    this.setPositions(col, selCol)
  }

  render () {
    const { items } = this.props

    return (
      <div className={cn(styles.dockBar, this.props.className)} ref={this.mainRef}>
        {
          items.map((item, i) => {
            return (
              <div key={item} className={styles.cell}>
                <DraggableItem
                  item={item}
                  axis='x'
                  onStop={this.handleStop.bind(this, i)}
                />
              </div>
            )
          })
        }
      </div>
    )
  }
}
