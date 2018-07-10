import React from 'react'
import { shallow, mount, render } from 'enzyme'

import {Provider} from 'react-redux'

import store from '../../client/store'

import App from '../../client/components/App'
import './setup-dom'

describe('App', () => {
  const wrapper = shallow(
    <Provider store={store}>
      <App />
    </Provider>
  );
  it('should be defined', () => {
    expect(wrapper).toBeDefined()
  });
  it('should have a GlobeSelector child', () => {
    expect(wrapper.find('GlobeSelector')).toBeTruthy()
  })
})
