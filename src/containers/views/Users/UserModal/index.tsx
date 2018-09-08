import * as React from 'react'
import { inject, observer } from 'mobx-react'
import { observable, action } from 'mobx'
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
        const { visible, onCancel, form } = this.props
        const { getFieldDecorator } = form
        return (
            <Modal title="Add User" visible={visible} onOk={this.submit} onCancel={onCancel}>
                <Form onSubmit={this.submit}>
                    <FormItem {...formItemLayout} label="account">
                        {getFieldDecorator('account', {
                            rules: [
                                {
                                    required: true
                                }
                            ]
                        })(<Input />)}
                    </FormItem>
                    <FormItem {...formItemLayout} label="password">
                        {getFieldDecorator('password', {
                            rules: [
                                {
                                    required: true
                                }
                            ]
                        })(<Input />)}
                    </FormItem>
                    <FormItem {...formItemLayout} label="category">
                        {getFieldDecorator('category', {
                            initialValue: userCategory[0],
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
