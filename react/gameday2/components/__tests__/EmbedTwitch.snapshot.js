import React from 'react'
import renderer from 'react-test-renderer'
import EmbedTwitch from '../EmbedTwitch'

describe('EmbedTwitch snapshot', () => {
  it('renders correctly', () => {
    const webcast = {
      key: '2016test',
      num: 0,
      id: '2016test-0',
      name: 'Test Event',
      type: 'twitch',
      channel: 'test',
    }

    const component = renderer.create(
      <EmbedTwitch webcast={webcast} />
    ).toJSON()
    expect(component).toMatchSnapshot()
  })
})
