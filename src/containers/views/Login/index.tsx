import React from 'react'
import { observer } from 'mobx-react'
import { Form, Input, Button } from 'antd'
import intl from 'react-intl-universal'
import { UserOutlined, LockOutlined, AntDesignOutlined } from '@ant-design/icons'

import styles from './index.module.scss'
import useRootStore from '@store/useRootStore'

const FormItem = Form.Item

function Login() {
    const { authStore } = useRootStore()

    const [loading, setLoading] = React.useState(false)

    async function submit(values: IAuthStore.LoginParams) {
        setLoading(true)
        try {
            await authStore.login(values)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className={styles.login}>
            <Form onFinish={submit} className={styles.form}>
                <div className={styles.logoBox}>
                    <AntDesignOutlined />
                </div>
                <FormItem name="account" hasFeedback rules={[{ required: true }]}>
                    <Input prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="account" />
                </FormItem>
                <FormItem name="password" hasFeedback rules={[{ required: true }]}>
                    <Input
                        prefix={<LockOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                        type="password"
                        placeholder="password"
                    />
                </FormItem>
                <FormItem>
                    <div className={styles.tips}>
                        <span>{intl.get('USERNAME')}: admin</span>
                        <span>{intl.get('PASSWORD')}: admin</span>
                    </div>
                    <Button type="primary" htmlType="submit" block loading={loading}>
                        {intl.get('LOGIN')}
                    </Button>
                </FormItem>
            </Form>
        </div>
    )
}

export default observer(Login)
