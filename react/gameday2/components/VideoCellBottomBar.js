import React, { PropTypes } from 'react'
import ReactTransitionGroup from 'react-addons-transition-group'
import AnimatableContainer from './AnimatableContainer'
import VideoCellToolbarContainer from '../containers/VideoCellToolbarContainer'
import VideoCellScoreTickerContainer from '../containers/VideoCellScoreTickerContainer'
import { white, grey900 } from 'material-ui/styles/colors'

/**
 * Responsible for displaying the bottom bar of each video cell. If the user
 * is hovering their mouse over the video cell, this bar will show the webcast
 * title and controls. Otherwise, the live ticker will show.
 */
export default class VideoCellBottomBar extends React.Component {

  static propTypes = {
    mouseOver: PropTypes.bool.isRequired,
    webcast: PropTypes.object.isRequired,
    height: PropTypes.number.isRequired,
    onRequestOpenSwapPositionDialog: PropTypes.func.isRequired,
    onRequestOpenWebcastSelectionDialog: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)
  }

  render() {
    const containerStyle = {
      position: 'absolute',
      bottom: 0,
      width: '100%',
      height: this.props.height,
      backgroundColor: grey900,
    }

    const toolbarStyle = {
      width: '100%',
      height: '100%',
      position: 'absolute',
      bottom: '0px',
      transition: 'all 150ms ease-in',
      willChange: 'opacity',
    }

    const scoreTickerStyle = {
      width: '100%',
      height: '100%',
      position: 'absolute',
      bottom: '0px',
      transition: 'all 150ms ease-in',
      willChange: 'opacity',
    }

    console.log('mouse over? ' + this.props.mouseOver)

    return (
      <ReactTransitionGroup component='div' style={containerStyle}>
        {this.props.mouseOver &&
          <AnimatableContainer
            key='toolbar'
            style={toolbarStyle}
            beginStyle={{
              opacity: 0,
            }}
            endStyle={{
              opacity: 1,
            }}
          >
            <VideoCellToolbarContainer
              height={this.props.height}
              webcast={this.props.webcast}
              onRequestOpenWebcastSelectionDialog={() => this.props.onRequestOpenWebcastSelectionDialog()}
              onRequestOpenSwapPositionDialog={() => this.props.onRequestOpenSwapPositionDialog()}
            />
          </AnimatableContainer>
        }
        {!this.props.mouseOver &&
          <AnimatableContainer
            key='ticker'
            style={scoreTickerStyle}
            beginStyle={{
              opacity: 0,
            }}
            endStyle={{
              opacity: 1,
            }}
          >
            <VideoCellScoreTickerContainer />
          </AnimatableContainer>
        }
      </ReactTransitionGroup>
    )
  }
}
