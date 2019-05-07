import * as React from 'react'
import * as enzyme from 'enzyme'

import * as styles from './index.scss'
import Error from './'

it('renders the correct text', () => {
    const component = enzyme.shallow(<Error />)
    const avatars = component.find(`.${styles.title}`)
    expect(avatars.text()).toEqual('Ooooops!')
})
