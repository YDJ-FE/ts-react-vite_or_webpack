import React from 'react'
import { Layout } from 'antd'
import { Routes, Route } from 'react-router-dom'

import styles from './index.module.scss'
import Error from '@components/Error'
import menu, { asynchronousComponents } from './menu'
import Header from './Header'
import Sider from './Sider'

function Home() {
    return (
        <Layout>
            <Sider />
            <Layout>
                <Header />
                <Layout.Content className={styles.content}>
                    <Routes>
                        {menu.map(m => {
                            if (!m.path || !m.component) {
                                return null
                            }
                            const Component = asynchronousComponents[m.component]
                            return <Route key={m.id} path={m.path} element={<Component />} />
                        })}
                        <Route path="*" element={<Error />} />
                    </Routes>
                </Layout.Content>
            </Layout>
        </Layout>
    )
}

export default Home
