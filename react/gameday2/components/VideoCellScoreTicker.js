import React, { PropTypes } from 'react'
import TickerItem from './TickerItem'

export default class VideoCellScoreTicker extends React.Component {

  static propTypes = {
    height: PropTypes.number.isRequired,
  }

  constructor(props) {
    super(props)
  }

  render() {
    const containerStyle = {
      width: '100%',
      height: height,
    }

    return (
      <div style={containerStyle} >
        <TickerItem height={this.props.height}/>
        <TickerItem height={this.props.height}/>
        <TickerItem height={this.props.height}/>
        <TickerItem height={this.props.height}/>
      </div>
    )
  }
}
