import React from 'react'
import { mount, shallow } from 'enzyme'
import App from './App'

it('renders without crashing', async () => {
  const wrapper = shallow(<App />)
  await wrapper.instance().componentDidMount()
  wrapper.update()
})

// it('renders welcome message', () => {
//   const wrapper = shallow(<App />);
//   const welcome = <h1 className="App-title">Last 10 EOS blocks</h1>;
//   expect(wrapper.contains(welcome)).toEqual(true);
// });
