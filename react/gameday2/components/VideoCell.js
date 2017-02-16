import React, { PropTypes } from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import EmbedUstream from './EmbedUstream'
import EmbedYoutube from './EmbedYoutube'
import EmbedTwitch from './EmbedTwitch'
import VideoCellBottomBar from './VideoCellBottomBar'
import WebcastSelectionOverlayDialogContainer from '../containers/WebcastSelectionOverlayDialogContainer'
import SwapPositionOverlayDialogContainer from '../containers/SwapPositionOverlayDialogContainer'
import { webcastPropType } from '../utils/webcastUtils'
import { LAYOUT_STYLES, BOTTOM_BAR_HEIGHT } from '../constants/LayoutConstants'

export default class VideoCell extends React.Component {
  static propTypes = {
    webcast: webcastPropType,
    webcasts: PropTypes.arrayOf(PropTypes.string).isRequired,
    displayedWebcasts: PropTypes.arrayOf(PropTypes.string).isRequired,
    layoutId: PropTypes.number.isRequired,
    position: PropTypes.number.isRequired,
    addWebcastAtPosition: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)

    this.state = {
      webcastSelectionDialogOpen: false,
      swapPositionDialogOpen: false,
      mouseOver: false,
    }
  }

  onRequestOpenWebcastSelectionDialog() {
    this.setState({ webcastSelectionDialogOpen: true })
  }

  onRequestCloseWebcastSelectionDialog() {
    this.setState({ webcastSelectionDialogOpen: false })
  }

  onRequestOpenSwapPositionDialog() {
    this.setState({ swapPositionDialogOpen: true })
  }

  onRequestCloseSwapPositionDialog() {
    this.setState({ swapPositionDialogOpen: false })
  }

  onWebcastSelected(webcastId) {
    this.props.addWebcastAtPosition(webcastId, this.props.position)
    this.onRequestCloseWebcastSelectionDialog()
  }

  onMouseOver() {
    this.setState({ mouseOver: true})
  }

  onMouseOut() {
    this.setState({ mouseOver: false })
  }

  render() {
    const cellStyle = Object.assign({}, LAYOUT_STYLES[this.props.layoutId][this.props.position], {
      outline: '#fff solid 1px',
      paddingBottom: BOTTOM_BAR_HEIGHT,
    })

    if (this.props.webcast) {
      let cellEmbed
      switch (this.props.webcast.type) {
        case 'ustream':
          cellEmbed = (<EmbedUstream webcast={this.props.webcast} />)
          break
        case 'youtube':
          cellEmbed = (<EmbedYoutube webcast={this.props.webcast} />)
          break
        case 'twitch':
          cellEmbed = (<EmbedTwitch webcast={this.props.webcast} />)
          break
        default:
          cellEmbed = ''
          break
      }

      return (
        <div
          style={cellStyle}
          onMouseEnter={() => this.onMouseOver()}
          onMouseLeave={() => this.onMouseOut()}
        >
          {cellEmbed}
          <VideoCellBottomBar
            height={BOTTOM_BAR_HEIGHT}
            webcast={this.props.webcast}
            mouseOver={this.state.mouseOver}
            onRequestOpenWebcastSelectionDialog={() => this.onRequestOpenWebcastSelectionDialog()}
            onRequestOpenSwapPositionDialog={() => this.onRequestOpenSwapPositionDialog()}
          />
          <WebcastSelectionOverlayDialogContainer
            open={this.state.webcastSelectionDialogOpen}
            webcast={this.props.webcast}
            onRequestClose={() => this.onRequestCloseWebcastSelectionDialog()}
            onWebcastSelected={(webcastId) => this.onWebcastSelected(webcastId)}
          />
          <SwapPositionOverlayDialogContainer
            open={this.state.swapPositionDialogOpen}
            position={this.props.position}
            onRequestClose={() => this.onRequestCloseSwapPositionDialog()}
          />
        </div>
      )
    }

    const emptyContainerStyle = {
      width: '100%',
      height: '100%',
    }

    const centerButtonStyle = {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translateX(-50%) translateY(-50%)',
    }

    // All positions in this array which are non-null represent displayed webcasts
    const displayedCount = this.props.displayedWebcasts.reduce((acc, curr) => acc + (curr == null ? 0 : 1), 0)

    const webcastsAreAvailable = (this.props.webcasts.length !== displayedCount)
    const buttonLabel = webcastsAreAvailable ? 'Select a webcast' : 'No more webcasts available'

    return (
      <div style={cellStyle} >
        <div style={emptyContainerStyle}>
          <RaisedButton
            label={buttonLabel}
            style={centerButtonStyle}
            disabled={!webcastsAreAvailable}
            onTouchTap={() => this.onRequestOpenWebcastSelectionDialog()}
          />
        </div>
        <WebcastSelectionOverlayDialogContainer
          open={this.state.webcastSelectionDialogOpen}
          webcast={this.props.webcast}
          onRequestClose={() => this.onRequestCloseWebcastSelectionDialog()}
          onWebcastSelected={(webcastId) => this.onWebcastSelected(webcastId)}
        />
      </div>
    )
  }
}
