import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import Draggable from 'react-draggable'

import styles from './index.module.scss'

export default class DraggableItem extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    item: PropTypes.string,
    axis: PropTypes.string,
    onStart: PropTypes.func,
    onDrag: PropTypes.func,
    onStop: PropTypes.func,
  }

  constructor (props) {
    super(props)
    this.mainRef = React.createRef()
    this.state = {
      controlledPosition: { x: 0, y: 0 },
      isHide: false,
    }
  }

  componentDidMount () {
    this.isMount = true
  }

  componentWillUnmount () {
    this.isMount = false
  }

  render () {
    const { item, axis, onStart: handleStart, onDrag: handleDrag, onStop: handleStop } = this.props
    const { controlledPosition, isHide } = this.state
    const iconImg = require(`images/icons/${item}`)
    const itemTitle = item.slice(0, -4)

    return (
      <Draggable
        nodeRef={this.mainRef}
        position={controlledPosition}
        axis={axis}
        onStart={handleStart}
        onDrag={handleDrag}
        onStop={(...args) => {
          this.setState({ isHide: true })
          process.nextTick(() => {
            handleStop(...args)
            if (this.isMount) this.setState({ isHide: false })
          })
        }}
      >
        <div
          className={cn(styles.draggableItem, { 'd-none': isHide }, this.props.className)}
          ref={this.mainRef}
          title={itemTitle}
        >
          <div className={styles.imgWrap}>
            <img src={iconImg} alt={item} />
          </div>
          <div className={styles.textWrap}>
            {itemTitle}
          </div>
        </div>
      </Draggable>
    )
  }
}
