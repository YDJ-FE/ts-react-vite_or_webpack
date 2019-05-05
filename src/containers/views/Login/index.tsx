import * as React from 'react'
import * as styles from './index.scss'
import { inject } from 'mobx-react'
import { observer } from 'mobx-react-lite'
import { Form, Icon, Input, Button } from 'antd'
import { FormComponentProps } from 'antd/lib/form'
import { hot } from 'react-hot-loader'
import { FormattedMessage } from 'react-intl'
const FormItem = Form.Item

interface IStoreProps {
    login?: (data: IAuthStore.LoginParams) => Promise<any>
}

function Login({ login, form }: IStoreProps & FormComponentProps) {
    const [loading, setLoading] = React.useState(false)

    const submit = (e: React.FormEvent<any>): void => {
        e.preventDefault()
        form.validateFields(
            async (err, values): Promise<any> => {
                if (!err) {
                    setLoading(true)
                    try {
                        await login(values)
                    } catch (err) {}
                    setLoading(false)
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
                            placeholder={'username'}
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
                            placeholder={'password'}
                        />
                    )}
                </FormItem>
                <FormItem>
                    <div className={styles.tips}>
                        <span>username: admin</span>
                        <span>password: admin</span>
                    </div>
                    <Button type="primary" htmlType="submit" block loading={loading}>
                        <FormattedMessage id="login_button" defaultMessage="Log In" />
                    </Button>
                </FormItem>
            </Form>
        </div>
    )
}

export default hot(module)(
    Form.create<{}>()(
        inject(
            (store: IStore): IStoreProps => {
                const { authStore } = store
                const { login } = authStore
                return { login }
            }
        )(observer(Login))
    )
)
