import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import RootContext from 'components/RootContext'
import DraggableItem from 'components/Workspace/DraggableItem'

import config from 'config.json'
import styles from './index.module.scss'

export default class DockBar extends React.Component {
  static propTypes = {
    className: PropTypes.string,
  }

  static contextType = RootContext

  setDockBarIcons = (items) => {
    // TODO localStorage
    this.setState({
      items
    })
  }

  getDockBarIcons = () => {
    // TODO localStorage
    const isPortrait = (this.context.orientation === 'portrait')
    let items = []
    if (isPortrait) {
      items = [...config.dockBarIcons].slice(0, 4)
    } else {
      items = [...config.dockBarIcons].slice(0, 5)
    }
    return items
  }

  constructor (props, context) {
    super(props, context)
    this.state = {
      items: this.getDockBarIcons(),
    }
  }

  componentDidMount () {
    this.previousContext = this.context
  }

  componentDidUpdate (prevProps) {
    if (this.previousContext.orientation !== this.context.orientation) {
      this.setDockBarIcons(this.getDockBarIcons())
    }
    this.previousContext = this.context
  }

  setPositions = (col, curCol) => {
    const items = [...this.state.items]
    items[col - 1] = items.splice(curCol - 1, 1, items[col - 1])[0]
    this.setDockBarIcons(items)
  }

  render () {
    const width = this.context.workspace.screenWidth
    const colMax = this.state.items.length
    const stepX = width / colMax

    return (
      <div className={cn(styles.dockBar, this.props.className)}>
        {
          this.state.items.map((item, i) => {
            return (
              <div key={item} className={styles.cell}>
                <DraggableItem
                  item={item}
                  col={i + 1}
                  colMax={colMax}
                  stepX={stepX}
                  setPositions={this.setPositions}
                />
              </div>
            )
          })
        }
      </div>
    )
  }
}
