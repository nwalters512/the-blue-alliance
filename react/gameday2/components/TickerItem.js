import React, {PropTypes} from 'react'

export default class TickerScore extends React.Component {

  static propTypes = {
    height: PropTypes.number.isRequired,
  }

  render() {
    const containerStyle = {
      height: this.props.height,
      float: 'left',
      display: 'block',
      position: 'relative',
    }

    const matchNumStyle = {
      height: this.props.height,
      float: 'left',
      display: 'block',
    }

    const allianceContainerStyle = {
      height: this.props.height,
      float: 'right',
      display: 'block',
    }

    const allianceStyle = {
      height: this.props.height / 2,
      display: 'block',
    }

    return (
      <div style={containerStyle}>
        <span style={matchNumStyle}>Q1</span>
        <div style={allianceContainerStyle}>
          <span style={allianceStyle}>111 1738 256 - 194</span>
          <span style={allianceStyle}>123 456 789 - 933</span>
        </div>
      </div>
    )
  }
}
