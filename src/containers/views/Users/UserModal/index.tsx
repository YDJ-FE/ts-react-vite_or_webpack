import * as React from 'react'
import { inject, observer } from 'mobx-react'
import { observable, action, computed } from 'mobx'
import { Modal, Form, Input, Select } from 'antd'
import { FormComponentProps } from 'antd/lib/form'

import { ComponentExt } from '@utils/reactExt'

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
    getUsers?: () => Promise<any>
}

interface IProps extends IStoreProps {
    visible: boolean
    onCancel: () => void
    user?: IUserStore.IUser
}

@inject(
    (store: IStore): IStoreProps => {
        const { createUser, getUsers } = store.userStore
        return { createUser, getUsers }
    }
)
@observer
class UserModal extends ComponentExt<IProps & FormComponentProps> {
    @observable
    private loading: boolean = false

    @computed
    get typeIsAdd() {
        return this.props.user === undefined
    }

    @computed
    get title() {
        return this.typeIsAdd ? 'Add User' : 'Modify User'
    }

    @action
    toggleLoading = () => {
        this.loading = !this.loading
    }

    submit = (e?: React.FormEvent<any>): void => {
        if (e) {
            e.preventDefault()
        }
        const { createUser, getUsers, onCancel, form } = this.props
        form.validateFields(
            async (err, values): Promise<any> => {
                if (!err) {
                    this.toggleLoading()
                    try {
                        await createUser(values)
                        getUsers()
                        onCancel()
                    } catch (err) {}
                    this.toggleLoading()
                }
            }
        )
    }

    render() {
        const { visible, onCancel, user, form } = this.props
        const { getFieldDecorator } = form
        const initialAccount = user ? user.account : ''
        const initialCategory = user ? user.category : userCategory[0]
        return (
            <Modal title={this.title} visible={visible} onOk={this.submit} onCancel={onCancel}>
                <Form onSubmit={this.submit}>
                    <FormItem {...formItemLayout} label="account">
                        {getFieldDecorator('account', {
                            initialValue: initialAccount,
                            rules: [
                                {
                                    required: true
                                }
                            ]
                        })(<Input />)}
                    </FormItem>
                    {this.typeIsAdd && (
                        <FormItem {...formItemLayout} label="password">
                            {getFieldDecorator('password', {
                                rules: [
                                    {
                                        required: true
                                    }
                                ]
                            })(<Input />)}
                        </FormItem>
                    )}
                    <FormItem {...formItemLayout} label="category">
                        {getFieldDecorator('category', {
                            initialValue: initialCategory,
                            rules: [
                                {
                                    required: true
                                }
                            ]
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
}

export default Form.create<IProps>()(UserModal)
