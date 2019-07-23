import React from 'react'
import { observer } from 'mobx-react'
import { Form, Icon, Input, Button } from 'antd'
import { FormComponentProps } from 'antd/lib/form'
import intl from 'react-intl-universal'

import styles from './index.scss'
import useRootStore from '@store/useRootStore'

const FormItem = Form.Item

interface IProps extends FormComponentProps {}

function Login({ form }: IProps) {
    const { authStore } = useRootStore()

    const [loading, setLoading] = React.useState(false)

    const submit = (e: React.FormEvent<any>): void => {
        e.preventDefault()
        form.validateFields(
            async (err, values): Promise<any> => {
                if (!err) {
                    setLoading(true)
                    try {
                        await authStore.login(values)
                    } finally {
                        setLoading(false)
                    }
                }
            }
        )
    }

    const { getFieldDecorator } = form
    return (
        <div className={styles.login}>
            <Form onSubmit={submit} className={styles.form}>
                <div className={styles.logoBox}>
                    <Icon type="ant-design" />
                </div>
                <FormItem hasFeedback>
                    {getFieldDecorator('account', {
                        rules: [{ required: true }]
                    })(
                        <Input
                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="account"
                        />
                    )}
                </FormItem>
                <FormItem hasFeedback>
                    {getFieldDecorator('password', {
                        rules: [{ required: true }]
                    })(
                        <Input
                            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            type="password"
                            placeholder="password"
                        />
                    )}
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

export default Form.create<IProps>()(observer(Login))
