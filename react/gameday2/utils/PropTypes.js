import { PropTypes } from 'react'

/**
 * Describes the shape of a webcast object.
 *
 * @typedef webcastPropType
 * @type {Object}
 * @property {string} key - the key of the associated event; if this is an
 * official first event, will take the form of <year><event code>
 * @property {number} num - the numberical index of this webcast; useful if
 * one event has multiple streams
 * @property {string} id - a unique id for this webcast; should take the form
 * of <key>-<num>
 * @property {string} name - a human-readable name for this webcast
 * @property {string} type - the service that is hosting this webcast
 * @property {channel} - the unique identifier of this stream on its hosting
 * service
 */
export const webcastPropType = PropTypes.shape({
  key: PropTypes.string.isRequired,
  num: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  channel: PropTypes.string.isRequired,
})

/**
 * Describes the shape of a chat object.
 *
 * @typedef chatPropTypes
 * @type {Object}
 * @property {string} name - A human-readable name for this chat
 * @property {string} channel - The Twitch channel this chat is fo
 */
export const chatPropType = PropTypes.shape({
  name: PropTypes.string.isRequired,
  channel: PropTypes.string.isRequired,
})
