import * as React from 'react'
import * as Adapter from 'enzyme-adapter-react-16'
import { configure, mount } from 'enzyme'
import { MemoryRouter } from 'react-router-dom'

import App from './../index'

configure({ adapter: new Adapter() })

describe('app', () => {
    const wrapper = mount(
        <MemoryRouter initialEntries={['/login']}>
            <App />
        </MemoryRouter>
    )
    it('/login', () => {
        expect(wrapper.find('input').exists())
    })
})
