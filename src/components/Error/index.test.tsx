import React from 'react'
import enzyme from 'enzyme'

import styles from './index.module.scss'
import Error from './'

it('renders the correct text', () => {
    const component = enzyme.shallow(<Error />)
    const avatars = component.find(`.${styles.title}`)
    expect(avatars.text()).toEqual('Ooooops!')
})
