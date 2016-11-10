import React, { PropTypes } from 'react'
import Popover from 'material-ui/Popover'
import Menu from 'material-ui/Menu'
import MenuItem from 'material-ui/MenuItem'
import FlatButton from 'material-ui/FlatButton'
import CheckIcon from 'material-ui/svg-icons/navigation/check'

export default class SidebarSelectionPopover extends React.Component {

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

  toggleSocial = (e) => {
    e.preventDefault()
    this.props.toggleHashtagSidebarVisibility()
  }

  toggleChat = (e) => {
    e.preventDefault()
    this.props.toggleChatSidebarVisibility()
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
          label='Sidebars'
          style={this.props.buttonStyle} />
        <Popover
          open={this.state.open}
          anchorEl={this.state.anchorEl}
          anchorOrigin={{horizontal: 'right', vertical: 'top'}}
          targetOrigin={{horizontal: 'right', vertical: 'top'}}
          onRequestClose={this.handleRequestClose} >
          <Menu
            width='128px'
            autoWidth={false} >
            <MenuItem
              primaryText='Chat'
              onClick={this.toggleChat}
              rightIcon={this.props.chatSidebarVisible ? <CheckIcon /> : null} />
            <MenuItem
              primaryText='Social'
              onClick={this.toggleSocial}
              rightIcon={this.props.hashtagSidebarVisible ? <CheckIcon /> : null} />
          </Menu>
        </Popover>
      </div>
    )
  }
}

SidebarSelectionPopover.propTypes = {
  toggleChatSidebarVisibility: PropTypes.func.isRequired,
  toggleHashtagSidebarVisibility: PropTypes.func.isRequired,
  chatSidebarVisible: PropTypes.bool.isRequired,
  hashtagSidebarVisible: PropTypes.bool.isRequired,
}
