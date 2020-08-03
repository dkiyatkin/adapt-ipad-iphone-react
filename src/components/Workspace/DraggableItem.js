import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import Draggable from 'react-draggable'
import getItemValues from 'helpers/getItemValues'

import styles from './DraggableItem.module.scss'

export default class DraggableItem extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    item: PropTypes.string,
    axis: PropTypes.string,
    onStart: PropTypes.func,
    onDrag: PropTypes.func,
    onStop: PropTypes.func,
    onClick: PropTypes.func,
  }

  constructor (props) {
    super(props)
    this.mainRef = React.createRef()
    this.state = {
      controlledPosition: { x: 0, y: 0 },
      isHide: false,
      isDrag: false,
    }
  }

  componentDidMount () {
    this.isMount = true
  }

  componentWillUnmount () {
    this.isMount = false
  }

  handleDrag = (...args) => {
    const { onDrag } = this.props
    this.setState({ isDrag: true })
    if (onDrag) onDrag(...args)
  }

  handleStop = (...args) => {
    const { onStop, onClick } = this.props
    const { isDrag } = this.state
    this.setState({ isDrag: false })
    if (isDrag) {
      if (onStop) onStop(...args)
    } else {
      if (onClick) onClick(...args)
    }
  }

  render () {
    const { item, axis, onStart: handleStart } = this.props
    const { controlledPosition, isHide } = this.state
    const { itemTitle, iconImg } = getItemValues(item)

    return (
      <Draggable
        nodeRef={this.mainRef}
        position={controlledPosition}
        axis={axis}
        onStart={handleStart}
        onDrag={this.handleDrag}
        onStop={(...args) => {
          this.setState({ isHide: true })
          process.nextTick(() => {
            this.handleStop(...args)
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
