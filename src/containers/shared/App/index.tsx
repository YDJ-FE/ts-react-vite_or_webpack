import * as React from 'react'
import { hot } from 'react-hot-loader'

import * as styles from './index.scss'
import Error from '@components/Error'

import { AuthorizedRoute } from 'react-authorized'
import { normalRoutes } from './routeConfig'

const AppWrapper = props => <div className={styles.appWrapper}>{props.children}</div>

class AppRouter extends React.Component {
    render() {
        return (
            <AuthorizedRoute
                normalRoutes={normalRoutes}
                normalLayout={AppWrapper}
                notFound={Error}
            />
        )
    }
}

export default hot(module)(AppRouter)
