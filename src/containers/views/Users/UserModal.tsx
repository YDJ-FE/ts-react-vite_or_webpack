import * as React from 'react'
import { inject } from 'mobx-react'
import { observer, useComputed } from 'mobx-react-lite'
import { Modal, Form, Input, Select } from 'antd'
import { FormComponentProps } from 'antd/lib/form'

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

interface IStoreProps {
    createUser?: (user: IUserStore.IUser) => Promise<any>
    modifyUser?: (user: IUserStore.IUser) => Promise<any>
    getUsers?: () => Promise<any>
    changePageIndex?: (pageIndex: number) => void
}

interface IProps extends IStoreProps, FormComponentProps {
    visible: boolean
    onCancel: () => void
    user?: IUserStore.IUser
}

function UserModal({ visible, onCancel, user, form, createUser, modifyUser, getUsers, changePageIndex }: IProps) {
    const [loading, setLoading] = React.useState(false)

    const typeIsAdd = useComputed(() => user === undefined, [user])
    const title = useComputed(() => (typeIsAdd ? 'Add User' : 'Modify User'), [typeIsAdd])

    function toggleLoading() {
        setLoading(l => !l)
    }

    function submit(e?: React.FormEvent<any>) {
        if (e) {
            e.preventDefault()
        }
        form.validateFields(
            async (err, values): Promise<any> => {
                if (!err) {
                    toggleLoading()
                    try {
                        if (typeIsAdd) {
                            await createUser(values)
                            changePageIndex(1)
                        } else {
                            await modifyUser({ ...values, _id: user._id })
                            getUsers()
                        }
                        onCancel()
                    } catch (err) {}
                    toggleLoading()
                }
            }
        )
    }

    const { getFieldDecorator } = form
    return (
        <Modal title={title} visible={visible} onOk={submit} onCancel={onCancel} okButtonProps={{ loading }}>
            <Form onSubmit={submit}>
                <FormItem {...formItemLayout} label="account">
                    {getFieldDecorator('account', {
                        initialValue: user ? user.account : '',
                        rules: [{ required: true }]
                    })(<Input />)}
                </FormItem>
                {typeIsAdd && (
                    <FormItem {...formItemLayout} label="password">
                        {getFieldDecorator('password', {
                            rules: [{ required: true }]
                        })(<Input />)}
                    </FormItem>
                )}
                <FormItem {...formItemLayout} label="category">
                    {getFieldDecorator('category', {
                        initialValue: user ? user.category : userCategory[0],
                        rules: [{ required: true }]
                    })(
                        <Select>
                            {userCategory.map(c => (
                                <Select.Option key={c} value={c}>
                                    {c}
                                </Select.Option>
                            ))}
                        </Select>
                    )}
                </FormItem>
            </Form>
        </Modal>
    )
}

export default Form.create<IProps>()(
    inject(
        (store: IStore): IStoreProps => {
            const { createUser, modifyUser, getUsers, changePageIndex } = store.userStore
            return { createUser, modifyUser, getUsers, changePageIndex }
        }
    )(observer(UserModal))
)
