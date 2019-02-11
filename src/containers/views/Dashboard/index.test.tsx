import * as React from 'react'
import * as enzyme from 'enzyme'

import * as styles from './style.scss'
import Dashboard from './'

it('renders the correct avatars', () => {
    const component = enzyme.shallow(<Dashboard />)
    const avatars = component.find(`.${styles.avatars}`)
    expect(avatars.children().length).toEqual(1)
})
