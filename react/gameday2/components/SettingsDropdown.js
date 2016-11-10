import React, { PropTypes } from 'react'
import BootstrapNavDropdownListItem from './BootstrapNavDropdownListItem'

const SettingsDropdown = (props) => (
  <li className="dropdown">
    <a href="#" className="dropdown-toggle navbar-icon" data-toggle="dropdown"><i className="material-icons">settings</i></a>
    <ul className="dropdown-menu">
      <BootstrapNavDropdownListItem handleClick={props.resetWebcasts}>Reset Layout</BootstrapNavDropdownListItem>
    </ul>
  </li>
)

SettingsDropdown.propTypes = {
  resetWebcasts: PropTypes.func,
}

export default SettingsDropdown
