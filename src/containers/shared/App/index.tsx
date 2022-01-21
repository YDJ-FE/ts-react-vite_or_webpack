import React from 'react'
import loadable from '@loadable/component'
import { Routes, Route } from 'react-router-dom'

import styles from './index.module.scss'
import PageLoading from '@components/PageLoading'
import Provider from './Provider'
import IntlWrapper from './IntlWrapper'
import HashRouter from './HashRouter'
import history from './ht'

const loadableOptions = { fallback: <PageLoading /> }
const Home = loadable(() => import('@views/Home'), loadableOptions)
const Login = loadable(() => import('@views/Login'), loadableOptions)

const AppWrapper: React.FC = ({ children }) => <div className={styles.appWrapper}>{children}</div>

function App() {
    return (
        <Provider>
            <IntlWrapper>
                <AppWrapper>
                    <HashRouter history={history}>
                        <Routes>
                            <Route path="/login" element={<Login />} />
                            <Route path="/*" element={<Home />} />
                        </Routes>
                    </HashRouter>
                </AppWrapper>
            </IntlWrapper>
        </Provider>
    )
}

export default App
