import * as React from 'react'
import { shallow, configure } from 'enzyme'
import * as Adapter from 'enzyme-adapter-react-16'

import Login from './../index'

configure({ adapter: new Adapter() })

const setup = () => {
    // 通过 enzyme 提供的 shallow(浅渲染) 创建组件
    const wrapper = shallow(<Login />)
    return {
        wrapper
    }
}

describe('Login', () => {
    const { wrapper } = setup()
    it('Login component should be render', () => {
        expect(wrapper.find('input').exists())
    })
})
