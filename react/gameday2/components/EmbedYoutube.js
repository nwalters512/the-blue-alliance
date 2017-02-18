import React from 'react'
import { webcastPropType } from '../utils/PropTypes'

const EmbedYoutube = (props) => {
  const src = `//www.youtube.com/embed/${props.webcast.channel}`
  return (
    <iframe
      width="100%"
      height="100%"
      src={src}
      frameBorder="0"
      allowFullScreen
    />
  )
}

EmbedYoutube.propTypes = {
  webcast: webcastPropType.isRequired,
}

export default EmbedYoutube
