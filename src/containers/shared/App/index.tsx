import React, { Suspense, lazy } from 'react'
import { Routes, Route } from 'react-router-dom'

import styles from './index.module.scss'
import PageLoading from '@components/PageLoading'
import Provider from './Provider'
import IntlWrapper from './IntlWrapper'
import HashRouter from './HashRouter'
import history from './ht'

const Home = lazy(() => import('@views/Home'))
const Login = lazy(() => import('@views/Login'))

const AppWrapper: React.ReactFCWithChildren = ({ children }) => <div className={styles.appWrapper}>{children}</div>

function App() {
    return (
        <Provider>
            <IntlWrapper>
                <AppWrapper>
                    <HashRouter history={history}>
                        <Suspense fallback={<PageLoading />}>
                            <Routes>
                                <Route path="/login" element={<Login />} />
                                <Route path="/*" element={<Home />} />
                            </Routes>
                        </Suspense>
                    </HashRouter>
                </AppWrapper>
            </IntlWrapper>
        </Provider>
    )
}

export default App
