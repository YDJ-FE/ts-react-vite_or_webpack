import React, { useEffect } from 'react'
import { observer } from 'mobx-react'
import { Modal, Form, Input, Select } from 'antd'

import useRootStore from '@store/useRootStore'

const FormItem = Form.Item

const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 5 }
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 19 }
    }
}

const userCategory = ['user', 'admin']

interface IProps {
    visible: boolean
    onCancel: () => void
    user?: IUserStore.IUser
}

function UserModal({ visible, onCancel, user }: IProps) {
    const { userStore } = useRootStore()
    const [form] = Form.useForm()

    const [loading, setLoading] = React.useState(false)

    const typeIsAdd = user === undefined

    function toggleLoading() {
        setLoading(l => !l)
    }

    async function submit(values: IUserStore.IUser) {
        toggleLoading()
        try {
            if (typeIsAdd) {
                await userStore.createUser(values)
            } else {
                await userStore.modifyUser({ ...values, id: user.id })
            }
            onCancel()
        } finally {
            toggleLoading()
        }
    }

    useEffect(() => {
        if (visible) {
            form.setFieldsValue({
                account: user ? user.account : '',
                category: user ? user.category : userCategory[0],
                password: null
            })
        }
    }, [visible])

    return (
        <Modal
            title={typeIsAdd ? 'Add User' : 'Modify User'}
            visible={visible}
            onOk={form.submit}
            onCancel={onCancel}
            okButtonProps={{ loading }}
            destroyOnClose
        >
            <Form form={form} onFinish={submit}>
                <FormItem {...formItemLayout} label="account" name="account" rules={[{ required: true }]}>
                    <Input />
                </FormItem>
                {typeIsAdd && (
                    <FormItem {...formItemLayout} label="password" name="password" rules={[{ required: true }]}>
                        <Input />
                    </FormItem>
                )}
                <FormItem {...formItemLayout} label="category" name="category" rules={[{ required: true }]}>
                    <Select>
                        {userCategory.map(c => (
                            <Select.Option key={c} value={c}>
                                {c}
                            </Select.Option>
                        ))}
                    </Select>
                </FormItem>
            </Form>
        </Modal>
    )
}

export default observer(UserModal)
