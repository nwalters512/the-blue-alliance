import React from 'react'
import renderer from 'react-test-renderer'
import EmbedTwitch from '../EmbedTwitch'

describe('EmbedTwitch snapshot', () => {
  it('renders correctly', () => {
    const webcast = {
      channel: 'test',
    }

    const component = renderer.create(
      <EmbedTwitch webcast={webcast} />
    ).toJSON()
    expect(component).toMatchSnapshot()
  })
})
