import React from 'react'
import renderer from 'react-test-renderer'
import HashtagSidebar from '../HashtagSidebar'

describe('HashtagSidebar snapshot', () => {
  beforeAll(() => {
    // componentDidMount tries to use functions on the document global,
    // which is unavailable outside the browser. Mock it out for
    // testing purposes.
    HashtagSidebar.prototype.componentDidMount = jest.genMockFunction()
  })

  it('renders correctly', () => {
    const component = renderer.create(
      <HashtagSidebar />
    ).toJSON()
    expect(component).toMatchSnapshot()
  })

  it('renders correctly when hidden', () => {
    const component = renderer.create(
      <HashtagSidebar hidden />
    ).toJSON()
    expect(component).toMatchSnapshot()
  })
})
