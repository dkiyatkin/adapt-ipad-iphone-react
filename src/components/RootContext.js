import React, { Component } from 'react'
import PropTypes from 'prop-types'

const RootContext = React.createContext({})
const { Provider, Consumer } = RootContext

class RootContextProvider extends Component {
  static propTypes = {
    children: PropTypes.any,
  }

  state = {
    device: '',
    orientation: '',
    workspace: {},
  }

  setDevice = (device) => {
    this.setState({ device })
  }

  setOrientation = (orientation) => {
    this.setState({ orientation })
  }

  setWorkspace = (workspace) => {
    this.setState({ workspace })
  }

  render () {
    return (
      <Provider
        value={{
          device: this.state.device,
          orientation: this.state.orientation,
          workspace: this.state.workspace,
          setDevice: this.setDevice,
          setOrientation: this.setOrientation,
          setWorkspace: this.setWorkspace,
        }}
      >
        {this.props.children}
      </Provider>
    )
  }
}

export { RootContextProvider, Consumer as RootContextConsumer }
export default RootContext
