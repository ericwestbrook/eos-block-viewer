import React from 'react'
import { mount, shallow } from 'enzyme'
import BlockRow from './BlockRow'

it('renders without crashing', async () => {
  const wrapper = shallow(<BlockRow blockId={1931538} blockIndex={0} />)
  await wrapper.instance().componentDidMount()
  wrapper.update()
})
