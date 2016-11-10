import React, {Component, PropTypes} from 'react'
import IconButton from 'material-ui/IconButton'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import FlatButton from 'material-ui/FlatButton'
import OverflowIcon from 'material-ui/svg-icons/navigation/more-vert'
import Paper from 'material-ui/Paper'
import propTypes from 'material-ui/utils/propTypes'
import warning from 'warning'
import LayoutSelectionPopover from './LayoutSelectionPopover'
import SidebarSelectionPopover from './SidebarSelectionPopover'

export function getStyles(props, context) {
  const {
    appBar,
    button: {
      iconButtonSize,
    },
    zIndex,
  } = context.muiTheme

  const flatButtonSize = 36;

  const styles = {
    root: {
      position: 'fixed',
      zIndex: zIndex.appBar,
      width: '100%',
      top: '0px',
      display: 'flex',
      backgroundColor: appBar.color,
      paddingLeft: appBar.padding,
      paddingRight: appBar.padding,
    },
    title: {
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      margin: 0,
      paddingTop: 0,
      letterSpacing: 0,
      fontSize: 24,
      fontWeight: appBar.titleFontWeight,
      color: appBar.textColor,
      height: appBar.height,
      lineHeight: `${appBar.height}px`,
    },
    mainElement: {
      boxFlex: 1,
      flex: '1',
    },
    iconButtonStyle: {
      marginTop: (appBar.height - iconButtonSize) / 2,
      marginRight: 8,
      marginLeft: -16,
    },
    iconButtonIconStyle: {
      fill: appBar.textColor,
      color: appBar.textColor,
    },
    flatButton: {
      color: appBar.textColor,
      marginTop: (iconButtonSize - flatButtonSize) / 2 + 1,
    },
  }

  return styles
}

class Navbar extends Component {
  static propTypes = {
    webcasts: PropTypes.array.isRequired,
    webcastsById: PropTypes.object.isRequired,
    hashtagSidebarVisible: PropTypes.bool.isRequired,
    chatSidebarVisible: PropTypes.bool.isRequired,
    addWebcast: PropTypes.func.isRequired,
    resetWebcasts: PropTypes.func.isRequired,
    toggleHashtagSidebarVisibility: PropTypes.func.isRequired,
    toggleChatSidebarVisibility: PropTypes.func.isRequired,
    setLayout: PropTypes.func.isRequired,
  }

  static contextTypes = {
    muiTheme: PropTypes.object.isRequired,
  }

  render() {
    const {
      ...other,
    } = this.props

    const { prepareStyles } = this.context.muiTheme;
    const styles = getStyles(this.props, this.context);

    // Create title element
    const titleElement = React.createElement('h1', {
      onTouchTap: this.handleTitleTouchTap,
      style: prepareStyles(Object.assign(styles.title, styles.mainElement)),
    }, "GameDay")

    const iconRightStyle = Object.assign({}, styles.iconButtonStyle, {
      marginRight: -16,
      marginLeft: 'auto',
    })

    const buttonStyle = Object.assign({}, styles.iconButtonStyle, {
      marginRight: 0,
      marginLeft: 'auto',
    })

    const overflowButton = (
      <IconMenu
        iconButtonElement={
          <IconButton><OverflowIcon /></IconButton>
        }
        targetOrigin={{horizontal: 'right', vertical: 'top'}}
        anchorOrigin={{horizontal: 'right', vertical: 'top'}}
        iconStyle={styles.iconButtonIconStyle}
      >
        <MenuItem primaryText='Reset Layout' onClick={this.props.resetWebcasts} />
      </IconMenu>
    )

    const overflowButtonElement = (
      <div style={prepareStyles(iconRightStyle)}>
        {overflowButton}
      </div>
    )

    const sidebarsButton = (
      <FlatButton label="Sidebars" style={styles.flatButton}/>
    )

    const sidebarsButtonElement = (
      <div style={prepareStyles(buttonStyle)}>
        {sidebarsButton}
      </div>
    )

    return (
      <Paper
        rounded={false}
        style={styles.root}
        zDepth={2}
      >
        {titleElement}
        <LayoutSelectionPopover
          setLayout={this.props.setLayout}
          containerStyle={prepareStyles(buttonStyle)}
          buttonStyle={styles.flatButton} />
        <SidebarSelectionPopover
          toggleChatSidebarVisibility={this.props.toggleChatSidebarVisibility}
          toggleHashtagSidebarVisibility={this.props.toggleHashtagSidebarVisibility}
          chatSidebarVisible={this.props.chatSidebarVisible}
          hashtagSidebarVisible={this.props.hashtagSidebarVisible}
          containerStyle={prepareStyles(buttonStyle)}
          buttonStyle={styles.flatButton} />
        {overflowButtonElement}
      </Paper>
    );
  }
}

export default Navbar;
