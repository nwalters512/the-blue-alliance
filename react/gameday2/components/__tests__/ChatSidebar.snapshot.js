import React from 'react'
import renderer from 'react-test-renderer'
import ChatSidebar from '../ChatSidebar'

describe('ChatSidebar snapshot', () => {
  it('renders correctly', () => {
    const component = renderer.create(
      <ChatSidebar />
    ).toJSON()
    expect(component).toMatchSnapshot()
  })

  it('renders correctly when hidden', () => {
    const component = renderer.create(
      <ChatSidebar hidden />
    ).toJSON()
    expect(component).toMatchSnapshot()
  })
})
