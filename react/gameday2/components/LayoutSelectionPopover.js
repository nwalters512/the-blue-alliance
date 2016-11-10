import React, { PropTypes } from 'react'
import Popover from 'material-ui/Popover'
import Menu from 'material-ui/Menu'
import MenuItem from 'material-ui/MenuItem'
import FlatButton from 'material-ui/FlatButton'

export default class LayoutSelectionPopover extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      open: false,
    };
  }

  handleTouchTap = (event) => {
    // This prevents ghost click.
    event.preventDefault()

    this.setState({
      open: true,
      anchorEl: event.currentTarget,
    })
  }

  handleRequestClose = () => {
    this.setState({
      open: false,
    })
  }

  setLayout = (layoutId, e) => {
    e.preventDefault()
    this.props.setLayout(layoutId)
    this.handleRequestClose()
  }

  render() {
    return (
      <div style={this.props.containerStyle}>
        <FlatButton
          onTouchTap={this.handleTouchTap}
          label='Change Layout'
          style={this.props.buttonStyle} />
        <Popover
          open={this.state.open}
          anchorEl={this.state.anchorEl}
          anchorOrigin={{horizontal: 'right', vertical: 'top'}}
          targetOrigin={{horizontal: 'right', vertical: 'top'}}
          onRequestClose={this.handleRequestClose} >
          <Menu>
            <MenuItem primaryText='Single View' onClick={(e)=>this.setLayout(0, e)} />
            <MenuItem primaryText='Split View' onClick={(e)=>this.setLayout(1, e)} />
            <MenuItem primaryText='"1+2" View' onClick={(e)=>this.setLayout(2, e)} />
            <MenuItem primaryText='Quad View' onClick={(e)=>this.setLayout(3, e)} />
            <MenuItem primaryText='"1+3" View' onClick={(e)=>this.setLayout(4, e)} />
            <MenuItem primaryText='"1+4" View' onClick={(e)=>this.setLayout(5, e)} />
            <MenuItem primaryText='Hex View' onClick={(e)=>this.setLayout(6, e)} />
            <MenuItem primaryText='Octo-View' onClick={(e)=>this.setLayout(7, e)} />
            <MenuItem primaryText='Nona-View' onClick={(e)=>this.setLayout(8, e)} />
          </Menu>
        </Popover>
      </div>
    )
  }
}

LayoutSelectionPopover.propTypes = {
  setLayout: PropTypes.func.isRequired,
}
