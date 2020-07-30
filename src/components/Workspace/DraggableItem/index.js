import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import Draggable from 'react-draggable'

import styles from './index.module.scss'

export default class DraggableItem extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    item: PropTypes.string,
    col: PropTypes.number,
    colMax: PropTypes.number,
    stepX: PropTypes.number,
    setPositions: PropTypes.func,
  }

  constructor (props) {
    super(props)
    this.myRef = React.createRef()
    this.state = {
      controlledPosition: {
        x: 0, y: 0
      }
    }
  }

  handleStop = (e, data) => {
    const { col, colMax, stepX, setPositions } = this.props
    // console.log('Event: ', e)
    // console.log('Data: ', data)
    // console.log(stepX, data.x, data.y)
    const parentX = data.x + (col * stepX)
    const curCol = Math.round(parentX / stepX)
    // console.log('col, curCol', col, curCol)
    if (curCol === col || curCol > colMax || curCol < 1) {
      this.setState({ controlledPosition: { x: 0, y: 0 } })
    } else {
      // this.setState({ controlledPosition: { x: data.x, y: 0 } })
      setPositions(col, curCol)
    }
  }

  render () {
    const { item } = this.props
    const iconImg = require(`images/icons/${item}`)

    return (
      <Draggable
        nodeRef={this.myRef}
        onStop={this.handleStop}
        position={this.state.controlledPosition}
        offsetParent={document.body}
      >
        <div className={cn(styles.draggableItem, this.props.className)} ref={this.myRef}>
          <div className={styles.imgWrap}>
            <img src={iconImg} alt={item} />
          </div>
          <div className={styles.textWrap}>
            {item.slice(0, -4)}
          </div>
        </div>
      </Draggable>
    )
  }
}
